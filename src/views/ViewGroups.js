/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

class ViewGroups extends React.Component {
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

    fetch('http://pablogonzalez.chickenkiller.com:2222/item_group/get_all')
      .then(res => res.json())
      .then(data => {if(this._isMounted) this.setState({item_groups: data}); console.log(this.state)})
      .catch(error => console.log(error))
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const {
      item_groups
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Meu cardápio" subtitle="Todos os itens no seu cardápio" className="text-sm-left" />
        </Row>
        <Row>
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
                    <a href={`/view-group-items/${post.id}`} className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.description}</p>
                </CardBody>
              </Card>
            </Col>
        ))}
        </Row>     
      </Container>
    );
  }
}

export default ViewGroups;
