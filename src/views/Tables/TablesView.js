import React from "react";
import { 
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Button,
    ButtonGroup,
} from "shards-react";


class TablesView extends React.Component {
    _isMounted = false;

    constructor(props) {
      super(props);
  
      this.state = {
        items: [],
        item_groups: []
      }
    }

    componentDidMount(){
      this._isMounted = true;
    }
  
    componentWillUnmount(){
      this._isMounted = false;
    }

    render() {
        return(
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-2 d-flex justify-content-end">
                    <a href={`/create-item/${this.props.match.params.id}`} className="btn btn-primary col-sm-4 col-md-2 mt-2 mb-2"><i className="material-icons">add</i>Adicionar mesa</a>
                </Row>

                <Row>
                    <Col lg="4" md="12" sm="12" className="mb-4">
                        <Card small className="blog-comments">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Mesa 5</h6>
                            </CardHeader>

                            <CardBody className="p-0">
                                {/* Pedidos */}
                                <div  className="blog-comments__item p-3">
                                    {/* Pedido */ }
                                    <div className="blog-comments__content">
                                        {/* Descrição do pedido */}
                                        <div className="blog-comments__meta text-mutes">
                                            <p className="m-0 my-1 mb-2 text-muted">
                                                x1 - Coca-cola lata
                                            </p>
                                        </div>
                                        <div className="blog-comments__meta text-mutes">
                                            <p className="m-0 my-1 mb-2 text-muted">
                                                x2 - X-bacon
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right mr-3">
                                    <span style={{fontSize: 20}}>Total: R$ 25</span>
                                </div>
                            </CardBody>

                            <CardFooter className="border-top">
                                {/* Ações */}
                                <div className="blog-comments__actions">
                                        <ButtonGroup size="sm">
                                            <Button theme="white">
                                                <span className="text-success">
                                                <i className="material-icons">add</i>
                                                </span>{" "}
                                                Adicionar item à comanda
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-danger">
                                                <i className="material-icons">print</i>
                                                </span>{" "}
                                                Finalizar comanda
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-light">
                                                <i className="material-icons">more</i>
                                                </span>{" "}
                                                Opções
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col lg="4" md="12" sm="12" className="mb-4">
                        <Card small className="blog-comments">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Mesa 6</h6>
                            </CardHeader>

                            <CardBody className="p-0">
                                {/* Pedidos */}
                                <div  className="blog-comments__item p-3">
                                    {/* Pedido */ }
                                    <div className="blog-comments__content">
                                        {/* Descrição do pedido */}
                                        <div className="d-block text-center">
                                            <i style={{fontSize: 30}} className="material-icons">remove_shopping_cart</i>
                                            <p>A mesa está desocupada</p>
                                        </div>
                                        

                                        {/* Endereço e hora do pedido */}
                                       
                                    </div>

                                    
                                </div>
                                {/* Fim do pedido */}
                            </CardBody>

                            <CardFooter className="border-top">
                                {/* Ações */}
                                <div className="blog-comments__actions">
                                        <ButtonGroup size="sm">
                                            <Button theme="white">
                                                <span className="text-success">
                                                <i className="material-icons">add</i>
                                                </span>{" "}
                                                Adicionar item à comanda
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-danger">
                                                <i className="material-icons">print</i>
                                                </span>{" "}
                                                Finalizar comanda
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-light">
                                                <i className="material-icons">more</i>
                                                </span>{" "}
                                                Opções
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                            </CardFooter>
                        </Card>
                    </Col>

                    <Col lg="4" md="12" sm="12" className="mb-4">
                        <Card small className="blog-comments">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Mesa 8</h6>
                            </CardHeader>

                            <CardBody className="p-0">
                                {/* Pedidos */}
                                <div  className="blog-comments__item p-3">
                                    {/* Pedido */ }
                                    <div className="blog-comments__content">
                                        {/* Descrição do pedido */}
                                        <div className="blog-comments__meta text-mutes">
                                            <p className="m-0 my-1 mb-2 text-muted">
                                                Comanda 51
                                            </p>
                                        </div>
                                        <div className="blog-comments__meta text-mutes">
                                            <p className="m-0 my-1 mb-2 text-muted">
                                                Comanda 52
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right mr-3">
                                    <span style={{fontSize: 20}}>Total: R$ 52</span>
                                </div>
                            </CardBody>

                            <CardFooter className="border-top">
                                {/* Ações */}
                                <div className="blog-comments__actions">
                                        <ButtonGroup size="sm">
                                            <Button theme="white">
                                                <span className="text-info">
                                                <i className="material-icons">note</i>
                                                </span>{" "}
                                                Ver Comandas
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-success">
                                                <i className="material-icons">add</i>
                                                </span>{" "}
                                                Adicionar item à uma comanda
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-danger">
                                                <i className="material-icons">print</i>
                                                </span>{" "}
                                                Finalizar comanda
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-light">
                                                <i className="material-icons">more</i>
                                                </span>{" "}
                                                Opções
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                            </CardFooter>
                        </Card>
                    </Col>


                    
                </Row>
            </Container>
        );
    }
}

export default TablesView;
