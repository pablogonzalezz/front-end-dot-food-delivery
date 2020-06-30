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
  CardFooter,
  FormTextarea,
  FormInput,
  Button,
} from "shards-react";

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";

import MainFooter from "../../components/layout/MainFooter";
import * as api from "../../services/api";
import { isAuthenticated } from "../../services/auth";

class MakeOrderViewItems extends React.Component {
  _isMounted = false;
  _id = null;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      items_in_cart: JSON.parse(sessionStorage.getItem('items_in_cart')) || [],
      open_modal: false,
      open_modal_cart: false,
      selected_item: {},
      quantity: 1,
      obs: null,
      next: null
    }

    this.toggle_modal = this.toggle_modal.bind(this);
    this.toggle_modal_cart = this.toggle_modal_cart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.addAndDone = this.addAndDone.bind(this);
  }

  async componentDidMount() {
    this._id = this.props.match.params.id;

    this._isMounted = true;
    api.getItemByGroup(this._id)
      .then(res => res.json())
      .then(data => { if (this._isMounted) this.setState({ items: data }) })
      .catch(error => console.log(error))

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

  toggle_modal(index) {
    if (index != null) {
      this.setState({
        selected_item: this.state.items[index],
        open_modal: !this.state.open_modal
      })
    } else {
      this.setState({
        open_modal: !this.state.open_modal
      });
    }

  }

  toggle_modal_cart(e) {
    this.setState({ open_modal_cart: !this.state.open_modal_cart })
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  addToCart() {
    let items_in_cart = this.state.items_in_cart;
    let selected_item = this.state.selected_item;
    let quantity = this.state.quantity;
    let obs = this.state.obs;

    selected_item.quantity = quantity;
    selected_item.obs = obs;

    items_in_cart.push(selected_item);

    this.setState({ items_in_cart: items_in_cart })
    sessionStorage.setItem('items_in_cart', JSON.stringify(items_in_cart))
    this.toggle_modal();
  }

  deleteFromCart(idx) {
    if (window.confirm('Deseja excluir esse item?')) {
      let array = this.state.items_in_cart;
      array.splice(idx, 1);
      this.setState({ items_in_cart: array })
      sessionStorage.setItem('items_in_cart', JSON.stringify(array))
    }
  }

  addAndDone() {
    let items_in_cart = this.state.items_in_cart;
    let selected_item = this.state.selected_item;
    let quantity = this.state.quantity;
    let obs = this.state.obs;

    selected_item.quantity = quantity;
    selected_item.obs = obs;

    items_in_cart.push(selected_item);

    this.setState({ items_in_cart: items_in_cart })
    sessionStorage.setItem('items_in_cart', JSON.stringify(items_in_cart))
    window.location = this.state.next;
  }

  render() {
    const {
      items,
      items_in_cart,
      open_modal,
      selected_item,
      quantity,
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

        <Row noGutters className="page-header py-4 d-flex justify-content-between align-items-center mt-5">
          <a href='/fazer-pedido'>
            <i className="material-icons">keyboard_arrow_left</i> Voltar para Cardápio</a>
        </Row>

        <div className="d-flex justify-content-center">
          <Row className="justify-content-center w-100">
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
                      <a role="button" onClick={(e) => { this.toggle_modal(idx) }} className="text-fiord-blue">
                        {post.title}
                      </a>
                    </h5>

                    <p className="card-text d-inline-block mb-3">{post.description}</p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span style={{ fontSize: 18 }} className="d-block">R$ {post.price}</span>
                      <a role="button" id="edit-group-a" onClick={(e) => { this.toggle_modal(idx) }}>
                        <i id="edit-group-i" style={{ fontSize: 24 }} className="material-icons">add_shopping_cart</i>
                      </a>
                    </div>
                  </CardBody>
                  <CardFooter>

                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div>
          <Modal className="" show={open_modal}>
            <ModalHeader className="d-flex justify-content-between justify-items-center">
              <h4 className="m-0">Carrinho</h4>
              <i onClick={(e) => { this.toggle_modal(null) }} className="material-icons" style={{ fontSize: 22 }}>close</i>
            </ModalHeader>
            <ModalBody>
              <div className="d-flex justify-content-between">
                <div lg="8" md="8" sm="8">
                  <span>{selected_item.title}</span>
                  <p className="m-0 my-1 mb-2 text-muted">{selected_item.description}</p>
                </div>
                <Col lg="3" md="3" sm="4" className="form-group">
                  <label htmlFor="obs">Quantidade</label>
                  <FormInput
                    id="quantity"
                    type="number"
                    onChange={this.handleChange}
                    value={`${quantity}`}
                  />
                </Col>
              </div>

              <Row className="w-100 mr-4 d-flex justify-content-end">
                <span style={{ fontSize: 18 }}>Valor: R$ {quantity * selected_item.price}</span>
              </Row>

              <Row className="mt-4" form>
                <Col md="12" className="form-group">
                  <label htmlFor="obs">Observações</label>
                  <FormTextarea
                    id="obs"
                    onChange={this.handleChange}
                    placeholder="Ex: sem verdura, colocar extras e etc..."
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <div className="d-flex justify-content-between w-100">
                <Button className="btn btn-primary cart-btn" onClick={this.addToCart}>Adicionar e Continuar Comprando</Button>
                <Button role="button" onClick={this.addAndDone} className="btn btn-outline-primary cart-btn" type="submit"><i className="material-icons">check</i>Adicionar e Finalizar Pedido</Button>
              </div>

            </ModalFooter>
          </Modal>
        </div>

        <div>
          <Modal className="" show={open_modal_cart}>

            <ModalHeader className="d-flex justify-content-between justify-items-center">
              <h4 className="m-0">Adicionar item</h4>
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
                <a role="button" href={next} className="btn btn-outline-primary cart-btn" type="submit" disabled={!items_in_cart.length > 0}><i className="material-icons">check</i> Finalizar Pedido</a>
              </div>

            </ModalFooter>
          </Modal>
        </div>

        <MainFooter />
      </Container>
    );
  }
}

export default MakeOrderViewItems;
