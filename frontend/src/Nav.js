import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./App.css";
import { Menu, Icon } from "antd";

class Nav extends Component {
  render() {
    return (
      <nav>
        <Menu style={{ textAlign: "center" }} mode="horizontal" theme="dark">
          <Menu.Item key="mail">
            <Link to="/ThemeArticles">
              <Icon type="home" />
              Thèmes
            </Link>
          </Menu.Item>
          <Menu.Item key="test">
            <Link to="/MyArticles">
              <Icon type="read" />
              My Articles
            </Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/">
              <Icon type="logout" />
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

export default Nav;
