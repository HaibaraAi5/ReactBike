import React from "react";
import { connect } from "react-redux";
import "./index.less";
class Home extends React.Component {
  state = {};
  render() {
    if (this.props.loginFlag) {
      console.log(this.props.loginFlag);
    }
    return <div className="home-wrap">欢迎来到雪之下雪乃咚程序员小木屋</div>;
  }
}
//取loginFlag
const loginFlagProps = ({ loginFlag }) => {
  return {
    loginFlag
  };
};
export default connect(loginFlagProps)(Home);
