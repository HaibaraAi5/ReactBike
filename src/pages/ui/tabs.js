import React from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class Tab extends React.Component {

  newTabIndex = 1;
  handleCallback = (key) => {
    message.info("咳咳，选择了页签：" + key)
  }

  componentWillMount() {
    const panes = [
      {
        title: '灰原哀',
        content: '灰原哀',
        key: '1'
      },
      {
        title: '柯南',
        content: '柯南',
        key: '2'
      },
      {
        title: '小兰',
        content: '小兰',
        key: '3'
      }
    ]
    this.setState({
      activeKey: panes[0].key,
      panes
    })
  }

  onChange = (activeKey) => {
    this.setState({
      //点击onChange时候激活的key
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `编号00${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="嘟嘟" key="1">欢迎来到程序员小木屋</TabPane>
            <TabPane tab="丢丢" key="2" disabled>欢迎光临</TabPane>
            <TabPane tab="简简" key="3">React是一个非常受欢迎的MV*框架吆</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab={<span><Icon type="plus" />嘟嘟</span>} key="1">欢迎来到程序员小木屋</TabPane>
            <TabPane tab={<span><Icon type="edit" />丢丢</span>} key="2">欢迎光临</TabPane>
            <TabPane tab={<span><Icon type="delete" />简简</span>} key="3">React是一个非常受欢迎的MV*框架吆</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map((panel) => {
                return <TabPane
                  tab={panel.title}
                  key={panel.key}
                />
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}