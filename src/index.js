import React from "react";
import ReactDOM from "react-dom";
// import Admin from './Admin';
import Router from "./router";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
// Redux Store对象，管理所有的Redux状态
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
