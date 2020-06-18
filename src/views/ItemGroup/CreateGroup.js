/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  ListGroup,
  ListGroupItem ,
  Form,
  FormInput,
  FormGroup,
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { getHost } from "../../serviceWorker";

class CreateGroup extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        title: '',
        description: '',
        image: ''
    }
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleSubmit(event) {
    fetch(`http://${getHost()}:2222/item_group/create_item_group`, { 
        method: "POST", 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
            title: this.state.title,
            description: this.state.description,
            image: this.state.image
        }) 
    })
    .then(function(response) { 
        if(response.status == 200) {
            alert("Categoria criada com sucesso!");
        } else {
            alert("Houve um erro ao criar a categoria.");
        }
        
    });
    
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const {
    //   item_groups
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4 d-flex justify-content-between align-items-center">
        <a href='/cardapio'>
          <i className="material-icons">keyboard_arrow_left</i> Voltar para Cardápio
        </a>
        </Row>
        <Row>
            <Col lg="12" md="12" sm="12" className="mb-4">
                <Card>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Criar nova categoria</h6>
                    </CardHeader>

                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                                <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Row form>
                                    <Col md="6" className="form-group">
                                        <label htmlFor="title">Nome</label>
                                        <FormInput
                                        id="title"
                                        placeholder="Nome da categoria"
                                        onChange={this.handleChange}
                                        type="text"
                                        />
                                    </Col>
                                    <Col md="6">
                                        <label htmlFor="image">Url da imagem</label>
                                        <FormInput
                                        id="image"
                                        placeholder="Url para a imagem da categoria"
                                        onChange={this.handleChange}
                                        />
                                    </Col>
                                    </Row>

                                    <FormGroup>
                                    <label htmlFor="description">Descrição</label>
                                    <FormInput 
                                    id="description" 
                                    placeholder="Descrição da categoria" 
                                    onChange={this.handleChange} 
                                    />
                                    </FormGroup>

                                    <Button type="submit"><i className="material-icons">add</i> Criar nova categoria</Button>
                                </Form>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>     
      </Container>
    );
  }
}

export default CreateGroup;
