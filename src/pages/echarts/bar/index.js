import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import echartTheme from "../echartTheme";
//全部加载所有图
// import echarts from 'echarts'
// 引入 ECharts 主模块 按需加载
import echarts from "echarts/lib/echarts";
// 引入饼图和折线图
import "echarts/lib/chart/bar";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
export default class Bar extends React.Component {
  state = {};
  //注入主题
  componentWillMount() {
    echarts.registerTheme("Imooc", echartTheme);
  }
  //数据源
  getOption() {
    let option = {
      title: {
        text: "筱_筱哀一周的饮水量"
      },
      tooltip: {
        trigger: "axis"
      },
      //X轴
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "筱_筱哀今天饮水量为",
          type: "bar",
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    };
    return option;
  }

  getOption2() {
    let option = {
      title: {
        text: "筱_筱哀一周的饮食量"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["水果", "主食", "肉"]
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "水果",
          type: "bar",
          data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
        },
        {
          name: "主食",
          type: "bar",
          data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
        },
        {
          name: "肉",
          type: "bar",
          data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
        }
      ]
    };
    return option;
  }
  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts
            option={this.getOption()}
            theme="Imooc"
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="柱形图表之二" style={{ marginTop: 10 }}>
          <ReactEcharts
            option={this.getOption2()}
            theme="Imooc"
            notMerge={true}
            lazyUpdate={true}
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
