import React from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "./../../axios/index";
import Utils from "./../../utils/utils";
export default class BasicTable extends React.Component {
  state = {
    // dataSource2:[]
  };
  params = {
    page: 1
  };
  componentDidMount() {
    //表格数据
    const data = [
      {
        id: "0",
        userName: "Jack",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2018-11-20",
        address: "上海市浦东新区陆家嘴东方明珠塔",
        time: "09:00"
      },
      {
        id: "1",
        userName: "Tom",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2018-11-20",
        address: "上海市浦东新区陆家嘴东方明珠塔",
        time: "09:00"
      },
      {
        id: "2",
        userName: "Lily",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2018-11-20",
        address: "上海市浦东新区陆家嘴东方明珠塔",
        time: "09:00"
      }
    ];
    //动态添加key
    data.map((item, index) => {
      return (item.key = index);
    });
    //存储起来
    this.setState({
      dataSource: data
    });
    this.request();
  }
  //动态获取数据
  request = () => {
    let _this = this;
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: {
            page: this.params.page
          }
          // isShowLoading:false
        }
      })
      .then(res => {
        res.result.item_list.map((item, index) => {
          return (item.key = index);
        });
        this.setState({
          dataSource2: res.result.item_list,
          selectedRowKeys2: [],
          selectedRows: null,
          pagination: Utils.pagination(res, current => {
            _this.params.page = current;
            this.request();
          })
        });
      });
  };
  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: "信息",
      content: `用户名：${record.userName},用户爱好：${record.interest}`
    });
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    });
  };
  // 多选执行删除动作
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map(item => {
      return ids.push(item.id);
    });
    Modal.confirm({
      title: "删除提示",
      content: `您确定要删除这些数据吗？${ids.join(",")}`,
      onOk: () => {
        message.success("删除成功");
        this.request();
      }
    });
  };
  render() {
    //表头
    const columns = [
      {
        title: "id",
        key: "id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName"
      },
      {
        title: "性别",
        key: "sex",
        dataIndex: "sex",
        render(sex) {
          return sex === false ? "男" : "女";
        }
      },
      {
        title: "状态",
        key: "state",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        key: "interest",
        dataIndex: "interest",
        render(abc) {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "踢足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          };
          return config[abc];
        }
      },
      {
        title: "生日",
        key: "birthday",
        dataIndex: "birthday"
      },
      {
        title: "地址",
        key: "address",
        dataIndex: "address"
      },
      {
        title: "早起时间",
        key: "time",
        dataIndex: "time"
      }
    ];
    const selectedRowKeys1 = this.state.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      //选中按钮
      selectedRowKeys1
    };
    const selectedRowKeys2 = this.state.selectedRowKeys;
    const rowCheckSelection = {
      type: "checkbox",
      selectedRowKeys2,
      onChange: (selectedRowKeys2, selectedRows) => {
        this.setState({
          selectedRowKeys2,
          selectedRows
        });
      }
    };
    return (
      <div>
        <Card title="基础表格">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-复选" style={{ margin: "10px 0" }}>
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-多选" style={{ margin: "10px 0" }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-表格分页" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}
