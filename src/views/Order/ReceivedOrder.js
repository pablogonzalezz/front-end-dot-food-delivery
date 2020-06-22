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
    ListGroup,
    ListGroupItem,
    FormSelect
} from "shards-react";


class ReceivedOrder extends React.Component {
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
                <Row noGutters className="page-header py-4">
                {/* <PageTitle title="Pedidos" subtitle="Seus pedidos recebidos aparecem aqui" className="text-sm-left mb-3" /> */}
                </Row>

                <Row>
                    <Col lg="9" md="12" sm="12" className="mb-4">
                        <Card small className="blog-comments">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Pedidos</h6>
                            </CardHeader>

                            <CardBody className="p-0">
                                {/* Pedidos */}
                                <div  className="blog-comments__item d-flex p-3 justify-content-between align-items-center">
                                    {/* Pedido */ }
                                    <div className="blog-comments__content">
                                        {/* Id do pedido */}
                                        <div className="blog-comments__meta text-mutes">
                                            <span className="text-mutes">
                                                Pedido #23
                                            </span>
                                        </div>

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

                                        {/* Endereço e hora do pedido */}
                                        <p className="m-0 my-1 mb-2 ">Rua guilherme perdigão 302, Parangaba - ás 19:38</p>
                                    </div>

                                    {/* Ações */}
                                    <div className="blog-comments__actions">
                                        <ButtonGroup size="sm">
                                            <Button theme="white">
                                                <span className="text-success">
                                                <i className="material-icons">check</i>
                                                </span>{" "}
                                                Aceitar
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-danger">
                                                <i className="material-icons">clear</i>
                                                </span>{" "}
                                                Rejeitar
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-light">
                                                <i className="material-icons">more_vert</i>
                                                </span>{" "}
                                                Cancelar
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                {/* Fim do pedido */}

                                {/* Pedidos */}
                                <div  className="blog-comments__item d-flex p-3 justify-content-between align-items-center">
                                    {/* Pedido */ }
                                    <div className="blog-comments__content">
                                        {/* Id do pedido */}
                                        <div className="blog-comments__meta text-mutes">
                                            <span className="text-mutes">
                                                Pedido #24
                                            </span>
                                        </div>

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

                                        {/* Endereço e hora do pedido */}
                                        <p className="m-0 my-1 mb-2 ">Rua guilherme perdigão 302, Parangaba - ás 19:38</p>
                                    </div>

                                    {/* Ações */}
                                    <div className="blog-comments__actions">
                                        <ButtonGroup size="sm">
                                            <Button theme="white">
                                                <span className="text-success">
                                                <i className="material-icons">check</i>
                                                </span>{" "}
                                                Aceitar
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-danger">
                                                <i className="material-icons">clear</i>
                                                </span>{" "}
                                                Rejeitar
                                            </Button>
                                            <Button theme="white">
                                                <span className="text-light">
                                                <i className="material-icons">more_vert</i>
                                                </span>{" "}
                                                Cancelar
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                {/* Fim do pedido */}

                            </CardBody>

                            <CardFooter className="border-top">
                                <Row>
                                    <Col className="text-center view-report">
                                        <Button theme="white" type="submit">
                                        Mostrar todos os pedidos
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>

                    {/* Os mais pedidos */}
                    <Col lg="3" md="12" sm="12" className="mb-4">
                        <Card small>
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Os mais pedidos</h6>
                                <div className="block-handle" />
                            </CardHeader>

                            <CardBody className="p-0">
                                <ListGroup small flush className="list-group-small">
                                    
                                    <ListGroupItem  className="d-flex px-3">
                                        <span className="text-semibold text-fiord-blue">X-burger</span>
                                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                                        2.294
                                        </span>
                                    </ListGroupItem>
                                    
                                </ListGroup>
                            </CardBody>

                            <CardFooter className="border-top">
                                <Row>
                                    {/* Time Span */}
                                    <Col>
                                    <FormSelect
                                        size="sm"
                                        value="last-week"
                                        style={{ maxWidth: "130px" }}
                                        onChange={() => {}}
                                    >
                                        <option value="last-week">Last Week</option>
                                        <option value="today">Today</option>
                                        <option value="last-month">Last Month</option>
                                        <option value="last-year">Last Year</option>
                                    </FormSelect>
                                    </Col>

                                    {/* View Full Report */}
                                    <Col className="text-right view-report">
                                    {/* eslint-disable-next-line */}
                                    <a href="#">Full report &rarr;</a>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ReceivedOrder;
