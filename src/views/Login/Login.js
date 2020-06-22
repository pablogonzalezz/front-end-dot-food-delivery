import React from "react";
import { 
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    ListGroup,
    ListGroupItem,
    Form,
    FormInput,
} from "shards-react";
import { login } from "../../services/auth";
import * as api from "../../services/api";


class Login extends React.Component {
    _isMounted = false;

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
      this.state = {
        login: "",
        password: "",
      }
    }

    componentDidMount(){
      this._isMounted = true;
    }
  
    componentWillUnmount(){
      this._isMounted = false;
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const { history } = this.props;

        api.Authenticate(this.state.login, this.state.password)
        .then(res => res.json())
        .then(data => {
            login(data.token)
            history.push("/")
        })
    }
  

    render() {
        return(
            <Container fluid className="main-content-container px-4 align-items-center">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                {/* <PageTitle title="Pedidos" subtitle="Seus pedidos recebidos aparecem aqui" className="text-sm-left mb-3" /> */}
                </Row>

                <Row className="justify-content-center">
                    <Col lg="6" md="12" sm="12" className="mb-4">
                        <Card small className="align-items-center">
                            <CardHeader>
                                <img
                                    alt="logo"
                                    style={{maxWidth: 250}}
                                    className="p-02 mt-4"
                                    src="https://drive.google.com/uc?id=1_GQUZo-aKmmk3guhcMu_JLhHN3JR57tm"
                                    >
                                </img>
                            </CardHeader>

                            <CardBody className="">
                                <ListGroup flush>
                                    <ListGroupItem className="justify-content-center">
                                        <Row>
                                            <Col>
                                                <Form onSubmit={this.handleSubmit}>
                                                    <Row md="6" form>
                                                        <Col md="12" className="form-group">
                                                            <label htmlFor="login">Login</label>
                                                            <FormInput
                                                            id="login"
                                                            placeholder="Login"
                                                            onChange={this.handleChange}
                                                            type="text"
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row form>
                                                        <Col md="12" className="form-group">
                                                            <label htmlFor="password">Senha</label>
                                                            <FormInput
                                                            id="password"
                                                            placeholder="Senha"
                                                            onChange={this.handleChange}
                                                            type="password"
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className="text-center view-report">
                                                            <Button className="btn btn-primary" type="submit">
                                                            Entrar
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Os mais pedidos */}

                </Row>
            </Container>
        );
    }
}

export default Login;
