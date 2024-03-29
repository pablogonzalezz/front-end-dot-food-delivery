/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import * as api from "../../services/api";

class ViewGroups extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      item_groups: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount(){
    this._isMounted = true;
  
    const result = await api.getAllItemGroups();
    await result.json().then(res => this.setState({item_groups: res}))
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async handleClick(event, id, idx) {
    event.preventDefault();
    if(event.target.id === "delete-group-i" || event.target.id === "delete-group-a") {
      if (window.confirm('Tem certeza que deseja deletar essa categoria?')) {
        await api.deleteItemGroup(id);

        let array = this.state.item_groups;
        array.splice(idx, 1);
        this.setState({item_groups: array})
      }
    }
  }

  render() {
    const {
      item_groups
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4 d-flex justify-content-between align-items-center">
          <PageTitle sm="4" title="Meu cardápio" subtitle="Todos os itens no seu cardápio" className="text-sm-left" />
          <a href="/create-group"className="btn btn-primary col-sm-4 col-md-2 mt-2 mb-2"><i className="material-icons">add</i>Adicionar categoria</a>
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
                <CardFooter>
                  <div className="d-flex justify-content-between">
                    <a id="edit-group-a" href={`/update-group/${post.id}`}>
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

export default ViewGroups;
