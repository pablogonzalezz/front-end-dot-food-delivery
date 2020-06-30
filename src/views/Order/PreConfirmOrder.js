import React from "react";
import { 
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    ListGroupItem,
    Form,
    FormInput,
    FormSelect
} from "shards-react";
import { getLogin, login } from "../../services/auth";
import * as api from "../../services/api";


class PreConfirmOrder extends React.Component {
    _isMounted = false;

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
  
      this.state = {
        next: false,
        login: "",
        password: "",
        errors: "",
        alreadyRegistered: false,
        signup_login: '',
        signup_name: '',
        signup_cpf: '',
        signup_address: {},
        signup_email: '',
        signup_phone: '',
        signup_password: '',
        signup_password2: '',
        ufs: null
      }
    }

    componentDidMount(){
      this._isMounted = true;

      if(getLogin()) {
          this.setState({
            login: getLogin(),
            loginIsSaved: true
        })
      }

      fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => res.json())
      .then(data => this.setState({ufs: data}))
    }
  
    componentWillUnmount(){
      this._isMounted = false;
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleAddressChange(event) {
       let address = this.state.signup_address;
       address[event.target.id] = event.target.value;
       this.setState({signup_address: address})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({next: true})
    }

    handleSubmit2(event) {
        event.preventDefault();
        const { history } = this.props;

        api.CreateUser(
            this.state.signup_login,
            this.state.signup_name,
            this.state.signup_cpf,
            this.state.signup_email,
            this.state.signup_phone,
            this.state.signup_password,
            this.state.signup_address
        )
        .then(res => {
            if(res.status === 200) {
                api.Authenticate(this.state.signup_login, this.state.signup_password)
                .then(res => {
                    if(res.status === 200) {
                        res.json().then(data => {
                            login(data.token, this.state.signup_login);
                            history.push("/confirmar-pedido")
                        })
                    }
                })
                this.setState({errors: "Houve um erro ao processar seu cadastro. Tente novamente."})
            } else {
                this.setState({errors: "Houve um erro ao processar seu cadastro. Tente novamente."})
            }
        })
    }

    render() {
        const {
            errors,
            next,
            ufs
          } = this.state;
        return(
            <Container fluid className="main-content-container px-4 align-items-center m-auto">
                {/* Page Header */}
                <Row noGutters className="page-header py-2 d-flex justify-content-between align-items-center">
                    <a href='/fazer-pedido'>
                    <i className="material-icons">keyboard_arrow_left</i> Voltar para Cardápio</a>
                </Row>

                {next === false &&
                <Row className="justify-content-center">
                        <Card>
                            <CardBody fluid className="align-items-center">
                                <Row>
                                <Col className="m-auto" lg="8" md="8" sm="12">
                                    <CardHeader role="img" className="text-center">
                                        <h4>Ainda não tem cadastro? faça o seu! vai ser rápido {'\u{26A1}'}</h4>
                                    </CardHeader>
                                    <span className="text-danger">{errors}</span>
                                    <ListGroupItem className="justify-content-center">
                                        <Row>
                                            <Col>
                                                <Form onSubmit={this.handleSubmit}>
                                                    <Row md="6" form>
                                                        <Col md="12" className="form-group">
                                                            <label htmlFor="signup_name">Nome</label>
                                                            <FormInput
                                                            id="signup_name"
                                                            placeholder="Nome"
                                                            onChange={this.handleChange}
                                                            type="text"
                                                            required
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row md="6" form>
                                                        <Col md="6" className="form-group">
                                                            <label htmlFor="signup_login">Login</label>
                                                            <FormInput
                                                            id="signup_login"
                                                            placeholder="Login"
                                                            onChange={this.handleChange}
                                                            type="text"
                                                            required
                                                            />
                                                        </Col>

                                                        <Col md="6" className="form-group">
                                                            <label htmlFor="signup_telefone">Telefone</label>
                                                            <FormInput
                                                            id="signup_phone"
                                                            placeholder="Telefone"
                                                            onChange={this.handleChange}
                                                            type="text"
                                                            required
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row md="6" form>
                                                        <Col md="12" className="form-group">
                                                            <label htmlFor="signup_cpf">CPF</label>
                                                            <FormInput
                                                            id="signup_cpf"
                                                            placeholder="CPF"
                                                            onChange={this.handleChange}
                                                            type="text"
                                                            required
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row md="6" form>
                                                        <Col md="12" className="form-group">
                                                            <label htmlFor="signup_email">Email</label>
                                                            <FormInput
                                                            id="signup_email"
                                                            placeholder="Email"
                                                            onChange={this.handleChange}
                                                            type="email"
                                                            required
                                                            />
                                                        </Col>
                                                    </Row>   

                                                    <Row className="d-flex" form>
                                                        <Col className="form-group">
                                                            <label htmlFor="signup_password">Senha</label>
                                                            <FormInput
                                                            id="signup_password"
                                                            placeholder="Senha"
                                                            onChange={this.handleChange}
                                                            type="password"
                                                            required
                                                            />
                                                        </Col>
                                                        <Col className="form-group">
                                                            <label htmlFor="signup_password2">Repita a senha</label>
                                                            <FormInput
                                                            id="signup_password2"
                                                            placeholder="Repetir a senha"
                                                            onChange={this.handleChange}
                                                            type="password"
                                                            required
                                                            />
                                                        </Col>
                                                    </Row>
                                   

                                                    <Row>
                                                        <Col className="text-center view-report">
                                                            <Button className="btn btn-primary" type="submit">
                                                            Próximo
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form> 
                                            </Col>
                                        </Row>
                                    </ListGroupItem>

                                    <div className="d-flex justify-content-center mb-2 mt-4">
                                        <a href="/login/?next=confirmar-pedido" ><span>Já possuo cadastro</span></a>
                                    </div> 
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
                }
                                
                {next === true &&
                                <Row className="justify-content-center">
                                <Card>
                                    <CardBody fluid className="align-items-center">
                                        <Row>
                                        <Col className="m-auto" lg="8" md="8" sm="12">
                                            <CardHeader role="img" className="text-center">
                                                <h4>Por último, insira o seu o endereço, no qual faremos as entregas {'\u{1F69A}'}</h4>
                                            </CardHeader>
                                            <span className="text-danger">{errors}</span>
                                            <ListGroupItem className="justify-content-center">
                                                <Row>
                                                    <Col>
                                                        <Form onSubmit={this.handleSubmit2}>
                                                            <Row md="6" form>
                                                                <Col lg="8" md="12" className="form-group">
                                                                    <label htmlFor="rua">Rua</label>
                                                                    <FormInput
                                                                    id="rua"
                                                                    placeholder="Nome da rua"
                                                                    onChange={this.handleAddressChange}
                                                                    type="text"
                                                                    required
                                                                    />
                                                                </Col>
                                                                <Col lg="4" md="12" className="form-group">
                                                                    <label htmlFor="numero">Número</label>
                                                                    <FormInput
                                                                    id="numero"
                                                                    placeholder="Número da casa"
                                                                    onChange={this.handleAddressChange}
                                                                    type="text"
                                                                    required
                                                                    />
                                                                </Col>
                                                            </Row>
        
                                                            <Row md="6" form>
                                                                <Col md="12" className="form-group">
                                                                    <label htmlFor="bairro">Bairro</label>
                                                                    <FormInput
                                                                    id="bairro"
                                                                    placeholder="Bairro"
                                                                    onChange={this.handleAddressChange}
                                                                    type="text"
                                                                    required
                                                                    />
                                                                </Col>
                                                            </Row>
        
                                                            <Row className="d-flex" form>
                                                                <Col className="form-group">
                                                                    <label htmlFor="cidade">Cidade</label>
                                                                    <FormInput
                                                                    id="cidade"
                                                                    placeholder="Cidade"
                                                                    onChange={this.handleAddressChange}
                                                                    type="text"
                                                                    required
                                                                    />
                                                                </Col>
                                                                <Col className="form-group">
                                                                    <label htmlFor="group_id">UF</label>
                                                                    <FormSelect
                                                                    id="uf"
                                                                    placeholder="UF"
                                                                    onChange={this.handleAddressChange}
                                                                    type="text"
                                                                    required>
                                                                    {ufs.map((uf, idx) => (
                                                                        <option value={`${uf.sigla}`} key={`${uf.id}`}>{uf.sigla}</option>
                                                                    ))}
                                                                        <option disabled>...</option>
                                                                    </FormSelect>
                                                                </Col>
                                                            </Row>                                   
        
                                                            <Row md="6" form>
                                                                <Col md="12" className="form-group">
                                                                    <label htmlFor="complemento">Complemento</label>
                                                                    <FormInput
                                                                    id="complemento"
                                                                    placeholder="Ex: Ponto de referência, número da sala (caso seja um prédio) e etc..."
                                                                    onChange={this.handleAddressChange}
                                                                    type="text"
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col className="text-center view-report">
                                                                    <Button className="btn btn-primary" type="submit">
                                                                    Cadastrar e continuar
                                                                    </Button>
                                                                </Col>
                                                            </Row>    
                                                        </Form> 
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
        
                                            <div className="d-flex justify-content-center mb-2 mt-4">
                                                <a href="/login/?next=confirmar-pedido" ><span>Já possuo cadastro</span></a>
                                            </div> 
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                }  
                <p align="center" className="copyright ml-auto my-auto mr-2">©2020 Dot Food Delivery. Todos os direitos reservados</p>
            </Container>
        );
    }
}

export default PreConfirmOrder;
