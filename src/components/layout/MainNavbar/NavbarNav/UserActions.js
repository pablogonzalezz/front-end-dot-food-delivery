import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { logout } from "../../../../services/auth";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions(e) {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleClick(event) {
    if(event.target.id === "logout") {
      logout();
      window.location = "/"
    } else {

    }
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Sierra Brooks</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Perfil
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem  id="logout" className="text-danger" onClick={this.handleClick}>
            <i className="material-icons text-danger">&#xE879;</i> Sair
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
