import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/Loadings";
import Notice from "./pages/ui/notice";
import Message from "./pages/ui/messages";
import Tab from "./pages/ui/tabs";
import Carousels from "./pages/ui/carousel";
import Gallery from "./pages/ui/gallery";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import BasicTable from "./pages/table/basic";
import HighTable from "./pages/table/highTable";
import Common from "./common";
import OrderDetail from "./pages/order/detail";
import Home from "./pages/home/index";
import City from "./pages/city/index";
import Order from "./pages/order/index";
import Login from "./pages/login/index";
import NoMatch from "./pages/nomatch";
import Users from "./pages/user/index";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar/index";
import Pie from "./pages/echarts/pie/index";
import Line from "./pages/echarts/line/index";
import RichText from "./pages/rich/index";
import PermissionUser from "./pages/permission/index";
export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            {/* 登录页  如何默认登陆页*/}
            <Route path="/login" component={Login} />
            <Route
              path="/common"
              render={() => (
                <Common>
                  <Route
                    path="/common/order/detail/:orderId"
                    component={OrderDetail}
                  />
                </Common>
              )}
            />
            {/* 主页 */}
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/ui/buttons" component={Buttons} />
                    <Route path="/ui/modals" component={Modals} />
                    <Route path="/ui/loadings" component={Loadings} />
                    <Route path="/ui/notification" component={Notice} />
                    <Route path="/ui/messages" component={Message} />
                    <Route path="/ui/tabs" component={Tab} />
                    <Route path="/ui/carousel" component={Carousels} />
                    <Route path="/ui/gallery" component={Gallery} />
                    <Route path="/form/login" component={FormLogin} />
                    <Route path="/form/reg" component={FormRegister} />
                    <Route path="/table/basic" component={BasicTable} />
                    <Route path="/table/high" component={HighTable} />
                    <Route path="/rich" component={RichText} />
                    <Route path="/city" component={City} />
                    <Route path="/order" component={Order} />
                    <Route path="/user" component={Users} />
                    <Route path="/bikeMap" component={BikeMap} />
                    <Route path="/charts/bar" component={Bar} />
                    <Route path="/charts/pie" component={Pie} />
                    <Route path="/charts/line" component={Line} />
                    <Route path="/permission" component={PermissionUser} />
                    <Redirect to="/login" />
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
