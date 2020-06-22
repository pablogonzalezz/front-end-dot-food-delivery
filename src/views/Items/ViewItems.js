/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
} from "shards-react";
import * as api from "../../services/api";

class ViewGroupItems extends React.Component {
  _isMounted = false;
  _id = null;

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this._id = this.props.match.params.id;
    this._isMounted = true;
    api.getItemByGroup(this._id)
      .then(res => res.json())
      .then(data => {if(this._isMounted) this.setState({items: data}); console.log(this.state)})
      .catch(error => console.log(error))
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  handleClick(event, id, idx) {
    event.preventDefault();
    if(event.target.id === "delete-group-i" || event.target.id === "delete-group-a") {
      if (window.confirm('Tem certeza que deseja deletar esse item?')) {
        api.deleteItem(id)
          .then(res => res.json())
          .catch(error => console.log(error))

        let array = this.state.items;
        array.splice(idx, 1);
        this.setState({items: array})
      }
    }
  }

  render() {
    const {
      items
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4 pb-4 container-fluid">
        {/* Page Header */}
        <Row noGutters className="page-header py-4 d-flex justify-content-between align-items-center">
          <a href='/cardapio'>
          <i className="material-icons">keyboard_arrow_left</i> Voltar para Cardápio</a>
          <a href={`/create-item/${this.props.match.params.id}`} className="btn btn-primary col-sm-4 col-md-2 mt-2 mb-2"><i className="material-icons">add</i>Adicionar item</a>
        </Row>
        {/* First Row of Posts */}
        {this.state.items.length === 0 &&
            <div className="error">
                <div className="error__content">
                    <h2>Ops!</h2>
                    <h3>Não há itens nessa categoria</h3>
                    <p>Adicione itens a essa categoria!</p>
                </div>
            </div>
        }
        <Row>
          {items.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  {post.group_id === 1 &&
                    <Badge
                      pill
                      className={`card-post__category bg-warning`}
                    >
                      Hamburgueres
                    </Badge>
                  }
                  
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href={`/update-item/${post.id}`} className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.description}</p>
                  <span style={{ fontSize: 18 }} className="mt-4 d-block">R$ {post.price}</span>
                </CardBody>
                <CardFooter>
                  <div className="d-flex justify-content-between">
                    <a id="edit-group-a" href={`/update-item/${post.id}`}>
                      <i id="edit-group-i" style={{fontSize: 20}} className="material-icons">edit</i>
                    </a>
                    <a id="delete-group-a" href="#" onClick={(e) => {this.handleClick(e, post.id, idx)}}>
                      <i id="delete-group-i" style={{fontSize: 20}} className="material-icons">delete_outline</i>
                    </a>
                  </div>
                  
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ViewGroupItems;
