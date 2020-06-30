/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Navbar,
  Badge,
  Button
} from "shards-react";

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";

import MainFooter from "../../components/layout/MainFooter";
import PageTitle from "../../components/common/PageTitle";
import * as api from "../../services/api";
import {isAuthenticated } from "../../services/auth";

class MakeOrder extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      item_groups: [],
      items_in_cart: JSON.parse(sessionStorage.getItem('items_in_cart')) || [],
      open_modal_cart: false,
      next: null
    }

    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.toggle_modal_cart = this.toggle_modal_cart.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

    const result = await api.getAllItemGroups();
    await result.json().then(res => this.setState({ item_groups: res }))

    await isAuthenticated()
    .then(res => {
      if(res === true) {
        this.setState({next: '/confirmar-pedido'})
      } else {
        this.setState({next: '/login-pedido'})
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggle_modal_cart(e) {
    console.log('fui clicado: ', e)
    this.setState({ open_modal_cart: !this.state.open_modal_cart })
  }

  deleteFromCart(idx) {
    if (window.confirm('Deseja excluir esse item?')) {
      let array = this.state.items_in_cart;
      array.splice(idx, 1);
      this.setState({ items_in_cart: array })
      sessionStorage.setItem('items_in_cart', JSON.stringify(array))
    }
  }

  render() {
    const {
      item_groups,
      items_in_cart,
      open_modal_cart,
      next
    } = this.state;

    return (

      <Container fluid className="main-content-container px-4">
        <Navbar type="light" className="order-navbar">

          <div className="d-flex">
            <img
              id="main-logo"
              className="d-inline-block align-top mr-1"
              style={{ maxWidth: "150px" }}
              src="https://drive.google.com/uc?id=1u8Mh02ru-ThLd0Yo0SmFMedgkHard9Et"
              alt="Dot Food Delivery"
            />
          </div>

          <a type="button" onClick={(e) => { this.toggle_modal_cart(e) }} className="cart-btn btn btn-outline-secondary mt-2 mb-2 d-flex justify-content-center align-items-center">
            <i style={{ fontSize: 20, top: 0 }} className="material-icons">shopping_cart</i>
            {items_in_cart.length > 0 &&
              <Badge pill theme="success">{items_in_cart.length}</Badge>
            }
          </a>
        </Navbar>

        {/* Page Header */}
        <Row noGutters className="page-header py-4 d-flex justify-content-between align-items-center mt-5">
          <PageTitle sm="4" title="Cardápio" subtitle="Todos os itens no cardápio" className="text-sm-left" />
        </Row>

        <div className="d-flex justify-content-center">
          <Row className="justify-content-center w-100">
            {item_groups.map((post, idx) => (

              <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${post.image})` }}
                  >
                  </div>
                  <CardBody>
                    <h5 className="card-title">
                      <a href={`/fazer-pedido-items/${post.id}`} className="text-fiord-blue">
                        {post.title}
                      </a>
                    </h5>
                    <p className="card-text d-inline-block mb-3">{post.description}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <Modal className="" show={open_modal_cart}>

            <ModalHeader className="d-flex justify-content-between justify-items-center">
              <h4 className="m-0">Carrinho</h4>
              <i onClick={this.toggle_modal_cart} className="material-icons" style={{ fontSize: 22 }}>close</i>
            </ModalHeader>

            <ModalBody>
              {items_in_cart.length === 0 &&
                <div className="text-center">
                  <i style={{ fontSize: 60 }} className="material-icons">shopping_cart</i>
                  <p className="text-muted">Não há itens no seu carrinho. Adicione algo :)</p>
                </div>
              }
              {items_in_cart.map((item, idx) => (
                <div className="d-flex justify-content-between align-items-center" key={idx}>
                  <div lg="8" md="8" sm="8">
                    <span>{item.title}</span>
                    <p className="m-0 my-1 mb-2 text-muted">{item.description}</p>
                    {item.obs != null &&
                      <p className="m-0 my-1 mb-2 text-danger">obs:{item.obs}</p>
                    }
                  </div>
                  <div className="d-flex justify-content-between">
                    <Col className="form-group d-block m-auto">
                      <label htmlFor="obs">Quantidade</label>
                      <span className="w-100">x{item.quantity} = R$ {item.quantity * item.price}</span>
                    </Col>
                    <div lg="1" md="1" sm="1" className="form-group d-block">
                      <a role="button" id="delete-item-cart" onClick={(e) => { this.deleteFromCart(idx) }}>
                        <i id="edit-group-i" style={{ fontSize: 24 }} className="material-icons text-danger">delete</i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <div className="d-flex justify-content-between w-100">
                <Button className="btn btn-primary cart-btn" onClick={this.toggle_modal_cart}>Continuar Comprando</Button>
                <Button type="button" href={next} className="btn btn-outline-primary cart-btn" disabled={!items_in_cart.length > 0}><i className="material-icons">check</i> Finalizar Pedido</Button>
              </div>

            </ModalFooter>
          </Modal>
        </div>

        <MainFooter />

      </Container>
    );
  }
}

export default MakeOrder;
