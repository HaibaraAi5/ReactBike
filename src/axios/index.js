import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";
import Utils from "../utils/utils";
export default class Axios {
  //请求列表   就是看看vscode的git功能
  static requestList(_this, url, params) {
    var data = {
      params: params
    };
    this.ajax({
      url,
      data
    }).then(data => {
      if (data) {
        let list = data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        _this.setState({
          list,
          pagination: Utils.pagination(data, current => {
            _this.params.page = current;
            _this.requestList();
          })
        });
      }
    });
  }
  //日期
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: "callback"
        },
        function(err, response) {
          if (response.status === "success") {
            resolve(response);
          } else {
            reject(response.messsage);
          }
        }
      );
    });
  }
  //Easy Mock
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }
    let baseApi =
      "https://www.easy-mock.com/mock/5bf3adaa022ace3c89543885/mockapi";
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: "get",
        baseURL: baseApi,
        timeout: 50000,
        params: (options.data && options.data.params) || ""
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (response.status === 200) {
          let res = response.data;
          if (res.code === 0) {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}
