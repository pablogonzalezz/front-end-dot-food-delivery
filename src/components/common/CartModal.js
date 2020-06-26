import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "shards-react";

class CartModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        items_in_cart: this.props.items_in_cart,
        open_modal_cart: false,
    }

    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.toggle_modal_cart = this.toggle_modal_cart.bind(this);
  }

  componentDidMount() {
    
  }

  addToCart(selected_item, quantity, obs) {
    let items_in_cart = this.state.items_in_cart;
    // let selected_item = this.state.selected_item;
    // let quantity = this.state.quantity;
    // let obs = this.state.obs;

    selected_item.quantity = quantity;
    selected_item.obs = obs;

    items_in_cart.push(selected_item);

    this.setState({items_in_cart: items_in_cart})
    sessionStorage.setItem('items_in_cart', JSON.stringify(items_in_cart))
    this.toggle_modal();
    console.log()
  }

  toggle_modal_cart(e){
    console.log('fui clicado: ', e)
    this.setState({open_modal_cart: !this.state.open_modal_cart})
  }

  deleteFromCart(idx) {
    if (window.confirm('Deseja excluir esse item?')) {
        let array = this.state.items_in_cart;
        array.splice(idx, 1);
        this.setState({items_in_cart: array})
        sessionStorage.setItem('items_in_cart', JSON.stringify(array))
      }
  }

  render() {
    const { items_in_cart, open_modal_cart } = this.state;

    return (
        <div>
        <Modal className="cart-modal mt-5" open={open_modal_cart} toggle={this.toggle_modal_cart}e>
        <ModalHeader>Carrinho</ModalHeader>
            <ModalBody>
            {items_in_cart.length === 0 &&
            <div className="text-center">
                <i style={{fontSize: 60}} className="material-icons">shopping_cart</i>
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
                    <Col lg="3" md="3" sm="4" className="form-group d-block">
                        <label htmlFor="obs">Quantidade</label>
                        <p>{item.quantity}</p>
                    </Col>
                    <div lg="1" md="1" sm="1" className="form-group d-block">
                        <a role="button" id="delete-item-cart" onClick={(e) => {this.deleteFromCart(idx)}}>
                            <i id="edit-group-i" style={{fontSize: 24}} className="material-icons text-danger">delete</i>
                        </a>
                    </div>
                </div>
            ))}
            </ModalBody>
            <ModalFooter>
                <div className="d-flex justify-content-between w-100">
                    <Button className="btn btn-primary cart-btn" onClick={this.toggle_modal_cart}>Continuar Comprando</Button>
                    <Button className="btn btn-outline-primary cart-btn" type="submit"><i className="material-icons">check</i> Finalizar Pedido</Button>        
                </div>
            
            </ModalFooter>
        </Modal>
    </div>
    );
  }
}

CartModal.propTypes = {
  items_in_cart: PropTypes.array,
  open_modal_cart: PropTypes.bool ,
};

export default CartModal;
