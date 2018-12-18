import React from "react";
import MenuConfig from "../../config/menuConfig";
import { Menu } from "antd";
//连接器
import { connect } from "react-redux";
//触发事件行为
import { switchMenu } from "./../../redux/action";
import { NavLink } from "react-router-dom";

import "./index.less";
//子菜单
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {
  state = {
    currentKey: ""
  };
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    //hash替换路由
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    this.setState({
      currentKey,
      menuTreeNode
    });
  }

  // 菜单点击
  handleClick = ({ item, key }) => {
    if (key === this.state.currentKey) {
      return false;
    }
    // 拿到dispatch  事件派发，自动调用reducer，通过reducer保存到store对象中
    const { dispatch } = this.props;
    //switchMenu代表切换菜单
    dispatch(switchMenu(item.props.title));

    this.setState({
      currentKey: key
    });
    // hashHistory.push(key);
  };
  //菜单渲染  拿到menuConfig.js文件中的MenuConfig数据进行渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        //递归
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="logo">
          <div className="logo-name">筱_筱哀React小木屋</div>
        </div>
        {/* selectedKeys是数组 */}
        <Menu
          theme="dark"
          selectedKeys={[this.state.currentKey]}
          onClick={this.handleClick}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}
//被redux管理
export default connect()(NavLeft);
