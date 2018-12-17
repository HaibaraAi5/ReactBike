import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios/index'
import { connect } from 'react-redux'
class Header extends React.Component {

  componentWillMount() {
    setInterval(() => {
      let syTime = Util.formateDate(new Date().getTime())
      this.setState({
        syTime
      })
    }, 1000)
    this.getWeather()
  }
  getWeather = () => {
    //对中文进行编码 encodeURIComponent
    let city = '上海'
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
    }).then((res) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0]
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })

  }
  constructor(props) {
    super(props)
    this.state = {
      userName: 'HaibaraAi'
    }
  }
  render() {
    //头部判断  复用
    const menuType = this.props.menuType
    return (
      <div className='header'>
        <Row className="header-top">
          {
            menuType ?
              <Col span="6" className="logo">
                <span>React管理系统</span>
              </Col> : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#Top">退出</a>
          </Col>
        </Row>
        {
          menuType ? '' : <Row className='breadcrumb'>
            <Col span='4' className='breadcrumb-title'>{this.props.menuName}</Col>
            <Col span='20' className='weather'>
              <span className='date'>{this.state.syTime}</span>
              <span className='weather-detail'>
                <img src={this.state.dayPictureUrl} alt='' className='weather-img' />
                <span>{this.state.weather}</span>
              </span>
            </Col>
          </Row>
        }

      </div>
    )
  }
}
//获取Navleft里面的 title
const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
};
export default connect(mapStateToProps)(Header)