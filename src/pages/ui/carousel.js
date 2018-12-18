import React from "react";
import { Card, Carousel } from "antd";
import "./ui.less";
export default class Carousels extends React.Component {
  render() {
    return (
      <div>
        <Card title="文字背景轮播" className="card-wrap">
          <Carousel autoplay effect="fade" afterChange={this.onChange}>
            <div>
              <h3>拜托拜托</h3>
            </div>
            <div>
              <h3>快活快活</h3>
            </div>
            <div>
              <h3>日日如梭</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="slider-wrap">
          <Carousel autoplay effect="fade">
            <div>
              <img src={require("./../../images/carousel/5.jpg")} alt="" />
            </div>
            <div>
              <img src={require("./../../images/carousel/6.jpg")} alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
