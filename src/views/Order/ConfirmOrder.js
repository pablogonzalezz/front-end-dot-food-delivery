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
} from "shards-react";
import { getLogin, login } from "../../services/auth";
import * as api from "../../services/api";


class ConfirmOrder extends React.Component {
    _isMounted = false;

    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleOrderMethod = this.handleOrderMethod.bind(this);
      this.order = this.order.bind(this);

      this.state = {
        errors: null,
        items_in_cart: JSON.parse(sessionStorage.getItem('items_in_cart')),
        total_price: null,
        user_address: '',
        user_phone: '',
        method: null
      }
    }

    componentDidMount(){
      this._isMounted = true;
      let items = this.state.items_in_cart
      let total_price = items.reduce((total, item) => total + parseInt(item.price) , 0)

      api.getUserAddress(getLogin())
      .then(res => res.json())
      .then(data => this.setState({user_address: data}))

      api.getUserPhone(getLogin())
      .then(res => res.json())
      .then(data => this.setState({user_phone: data}))
      
      this.setState({total_price: total_price})
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
       this.setState({signup_address: address});
    }

    handleOrderMethod(event) {
        let method = event.target.id;
        this.setState({method: method});
    }    

    order(event) {
        event.preventDefault();

        let order = {};
        order.items = this.state.items_in_cart;
        order.total_price = this.state.total_price;
        order.method = this.state.method;
        order.address = this.state.user_address;
        order.phone = this.state.user_phone;
        order.user = getLogin();
        order.date = new Date();

        console.log(order);
    }

    render() {
        const {
            errors,
            items_in_cart,
            total_price,
            user_address,
            method
          } = this.state;
        return(
            <Container fluid className="main-content-container px-4 align-items-center m-auto">
                {/* Page Header */}
                <Row noGutters className="page-header py-2 d-flex justify-content-between align-items-center">
                    <a href='/fazer-pedido'>
                    <i className="material-icons">keyboard_arrow_left</i> Voltar para Cardápio</a>
                </Row>

                <Row className="justify-content-center">
                        <Card>
                            <CardBody fluid className="align-items-center">
                                <Row>
                                <Col className="m-auto" lg="8" md="8" sm="12">
                                    <CardHeader className="text-center">
                                        <h4>Agora é só confirmar o pedido {'\u{1F60E}'}</h4>
                                    </CardHeader>
                                    <span className="text-danger">{errors}</span>
                                    <ListGroupItem className="justify-content-center">
                                        {items_in_cart.map((item, index) => (
                                        <Row key={index} className="blog-comments__item d-flex p-3 justify-content-between align-items-center">
                                        {/* Pedido */ }
                                            <div className="blog-comments__content w-100">
                                                {/* Id do pedido */}
                                                <div className="d-flex justify-content-between">
                                                    <Col lg="8" md="8" sm="10" >
                                                        <span className="text-mutes">
                                                            x{item.quantity} {item.title} {item.obs && <span className="text-danger">({item.obs})</span>}
                                                        </span>
                                                    </Col>
                                                    
                                                    <Col lg="4" md="4" sm="2"><h5 className="text-center">R$ {parseFloat(item.quantity * item.price)}</h5></Col>
                                                </div>
                                            </div>
                                        </Row>
                                    ))}
                                    </ListGroupItem>
                                    <Row className="w-100 d-flex justify-content-end mt-4 mb-4">   
                                        <span style={{fontSize:20}}>Total: R${total_price}</span>
                                    </Row>

                                    {method === null &&
                                    <Row className="d-flex justify-content-around">
                                        <Button id="not-delivery" onClick={this.handleOrderMethod} role="button" className="btn btn-outline-primary cart-btn" >Quero retirar no balcão</Button>
                                        <Button id="delivery" onClick={this.handleOrderMethod} role="button" className="btn btn-outline-primary cart-btn" >Entregar no meu endereço</Button>
                                    </Row>
                                    }
                          
                                    {method === 'delivery' &&
                                    <Row>
                                        <span>Endereço da entrega: </span>
                                        <span className="m-0 my-1 text-muted">{user_address.rua}, {user_address.numero} - {user_address.bairro} | {user_address.cidade}/{user_address.uf}</span>
                                        <a href="#">Mudar o endereço</a>
                                    </Row>
                                    }

                                    {method === 'not-delivery' &&
                                        <span>O pedido será retirado no balcão!</span>
                                    }
                                    
                                    <Row className="d-flex justify-content-center align-items-center mt-4">
                                        <Button className="btn btn-success" disabled={method == null } type="submit" onClick={this.order}>
                                        Confirmar
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
                
                <p align="center" className="copyright ml-auto my-auto mr-2">©2020 Dot Food Delivery. Todos os direitos reservados</p>
            </Container>
        );
    }
}

export default ConfirmOrder;
