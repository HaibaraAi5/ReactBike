//主页
import React from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import "./style/common.less";
// import Home from './pages/home/index'
export default class Admin extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span="3" className="nav-left">
          <NavLeft>NavLeft</NavLeft>
        </Col>
        <Col span="21" className="main">
          <Header>Header</Header>
          {/*需要路由跳转渲染的地方*/}
          <Row className="content">
            {/* <Home /> */}
            {this.props.children}
          </Row>
          <Footer>Footer</Footer>
        </Col>
      </Row>
    );
  }
}
