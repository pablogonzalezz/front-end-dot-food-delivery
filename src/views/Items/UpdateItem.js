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
  FormSelect
} from "shards-react";
import { getHost } from "../../serviceWorker";

class UpdateItem extends React.Component {
  _isMounted = false;
  _id = null;

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        title: '',
        description: '',
        image: '',
        group_id: '',
        price: '',
        item_groups: []
    }
  }

  componentDidMount(){
    this._isMounted = true;

    this._id = this.props.match.params.id;
    fetch(`http://${getHost()}:2222/items/get_item/${this._id}`)
    .then(res => res.json())
    .then(data => {if(this._isMounted) {
        console.log(data[0])
        this.setState({
            title: data[0].title,
            description: data[0].description,
            image: data[0].image,
            group_id: data[0].group_id,
            price: data[0].price
        })
    }})
    .catch(error => console.log(error))

    
    fetch(`http://${getHost()}:2222/item_group/get_all`)
    .then(res => res.json())
    .then(data => {if(this._isMounted) this.setState({item_groups: data})})
    .catch(error => console.log(error))
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleSubmit(event) {
    console.log(this.state)
    fetch(`http://${getHost()}:2222/items/update_item/${this._id}`, { 
        method: "POST", 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            group_id: this.state.group_id,
            price: this.state.price
        }) 
    })
    .then(function(response) { 
        if(response.status === 200) {
            alert("Item atualizado com sucesso!");
        } else {
            alert("Houve um erro ao atualiar o item.");
            console.log(response)
        }
    });
    
    event.preventDefault();
  }

  handleChange(event) {
      if(event.target.id === 'group_id') {
        this.setState({[event.target.id]: event.target.children[event.target.selectedIndex].value});
        
        console.log(document.getElementById(event.target.id))
      } else {
        this.setState({[event.target.id]: event.target.value});
      }
  }

  render() {
    const {
        item_groups,
        group_id,
        title,
        price,
        description,
        image
      } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4 d-flex justify-content-between align-items-center">
        <a href={`/view-group-items/${group_id}`}>
          <i className="material-icons">keyboard_arrow_left</i> Voltar para Categoria
        </a>
        </Row>
        <Row>
            <Col lg="12" md="12" sm="12" className="mb-4">
                <Card>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Atualizar item</h6>
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
                                            placeholder="Nome do item"
                                            onChange={this.handleChange}
                                            type="text"
                                            value={`${title}`}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <label htmlFor="image">Url da imagem</label>
                                            <FormInput
                                            id="image"
                                            placeholder="Url para a imagem do item"
                                            onChange={this.handleChange}
                                            type='url'
                                            value={`${image}`}
                                            />
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                    <label htmlFor="description">Descrição</label>
                                    <FormInput 
                                    id="description" 
                                    placeholder="Descrição do item" 
                                    onChange={this.handleChange} 
                                    value={`${description}`}
                                    />
                                    </FormGroup>
                                    <FormGroup>
                                        <Row form>
                                            <Col md="6" className="form-group">
                                                <label htmlFor="group_id">Categoria</label>
                                                <FormSelect
                                                id="group_id"
                                                placeholder="Categoria desse item"
                                                onChange={this.handleChange}
                                                type="text"
                                                value={ `${group_id}` }>
                                                {item_groups.map((post, idx) => (
                                                    <option value={`${post.id}`} key={`${post.id}`}>{post.title}</option>
                                                ))}
                                                    <option disabled>...</option>
                                                </FormSelect>
                                            </Col>
                                            <Col md="6">
                                                <label htmlFor="price">Preço</label>
                                                <FormInput
                                                id="price"
                                                placeholder="Preço do item"
                                                onChange={this.handleChange}
                                                value={`${price}`}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <Button type="submit"><i className="material-icons">update</i> Atualizar item</Button>
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

export default UpdateItem;
