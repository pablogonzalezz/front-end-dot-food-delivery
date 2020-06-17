/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

class ViewGroupItems extends React.Component {
  _isMounted = false;
  _id = null;

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount(){
    this._id = this.props.match.params.id;
    this._isMounted = true;
    fetch(`http://pablogonzalez.chickenkiller.com:2222/items/get_item_by_group/${this._id}`)
      .then(res => res.json())
      .then(data => {if(this._isMounted) this.setState({items: data}); console.log(this.state)})
      .catch(error => console.log(error))
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const {
      items,
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4 pb-4 container-fluid">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <a href='/cardapio'>
          <i className="material-icons">keyboard_arrow_left</i> Voltar para Cardápio</a>
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
                    <a href="#" className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.description}</p>
                  <span>R$15,00</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ViewGroupItems;
