import React from 'react'
import moment from 'moment';
import BaseForm from '../../components/BaseForm/index'
import axios from '../../axios/index'
import { Card, Button, Table, Modal, Form, Input, Radio, Select, DatePicker } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const Option = Select.Option
const { TextArea } = Input
export default class Users extends React.Component {
  state = {
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList()
  }
  handleFilter = (params) => {
    //分页
    this.params = params
    this.requestList()
  }
  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }
  handleOpertate = (type) => {
    let item = this.state.selectedItem
    if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if (type === 'edit' || type === 'detail') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一位用户'
        })
        return
      }
      this.setState({
        title: type === 'edit' ? '编辑用户' : '查看详情',
        isVisible: true,
        userInfo: item,
        type,
      })
    }
    else {
      if (!item) {
        Modal.info({
          title: '小提示',
          content: "请选择需要删除的用户"
        })
        return
      }
      Modal.confirm({
        content: '确定要删除此用户吗？',
        onOk: () => {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then((res) => {
            if (res.code === 0) {
              this.setState({
                isVisible: false
              })
              this.requestList();
            }
          })
        }
      })

    }
  }
  //创建员工 提交
  handleSubmit = () => {
    let type = this.state.type;
    let data = this.userForm.props.form.getFieldsValue();
    axios.ajax({
      //对url进行判断
      url: type === 'create' ? '/user/add' : '/user/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      // console.log(res)
      if (res.code === 0) {
        //重置表单
        this.userForm.props.form.resetFields()
        this.setState({
          isVisible: false
        })
        this.requestList();
      }
    })
  }
  formList = [
    {
      type: 'input',
      field: 'user_name',
      placeholder: '请输入用户名',
      initialValue: '',
      width: 80,
    },
    {
      type: 'input',
      field: 'password',
      placeholder: '请输入密码',
      initialValue: '',
      width: 80,
    }
  ]
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  render() {
    const columns = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'username',
        dataIndex: 'username'
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest',
        render(abc) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          }
          return config[abc];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        dataIndex: 'time'
      }
    ]


    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" icon='plus' onClick={() => this.handleOpertate('create')}>创建员工</Button>
          <Button type="primary" icon='edit' style={{ marginLeft: 10 }} onClick={() => this.handleOpertate('edit')}>编辑员工</Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={() => this.handleOpertate('detail')}>员工详情</Button>
          <Button type="danger" icon='delete' style={{ marginLeft: 10 }} onClick={() => this.handleOpertate('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          />


          <Modal title={this.state.title}
            visible={this.state.isVisible}
            onOk={this.handleSubmit}
            onCancel={() => {
              this.userForm.props.form.resetFields()
              this.setState({
                isVisible: false,
                userInfo: ''
              })
            }
            }
            width={600} >
            <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => this.userForm = inst} />
          </Modal>
        </div>
      </div>

    );
  }
}
//创建员工的Modal部分
class UserForm extends React.Component {
  state = {

  }
  //下拉框百度词典
  getState = (state) => {
    return {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者'
    }[state]
  }
  render() {
    //getFieldDecorator生成控件表单
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const userInfo = this.props.userInfo || {};
    const type = this.props.type;
    return (
      <Form layout='horizontal'>
        <FormItem label='用户名' {...formItemLayout}>
          {
            // 判断会否为可编辑的页面
            userInfo && type === 'detail' ? userInfo.username :
              getFieldDecorator('username', {
                initialValue: userInfo.username
              })(
                <Input type="text" placeholder="请输入姓名" />
              )
          }
        </FormItem>
        <FormItem label='性别' {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.sex :
              getFieldDecorator('sex', {
                initialValue: userInfo.sex
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.state :
              getFieldDecorator('state', {
                initialValue: userInfo.state
              })(
                <Select>
                  <Option value={1}>咸鱼一条</Option>
                  <Option value={2}>风华浪子</Option>
                  <Option value={3}>北大才子一枚</Option>
                  <Option value={4}>百度FE</Option>
                  <Option value={5}>创业者</Option>
                </Select>
              )
          }
        </FormItem>
        <FormItem label='生日' {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.birthday :
              getFieldDecorator('birthday', {
                //初始化值
                initialValue: moment(userInfo.birthday)
              })(
                <DatePicker />
              )
          }
        </FormItem>
        <FormItem label='地址' {...formItemLayout}>
          {
            userInfo && type === 'detail' ? userInfo.address :
              getFieldDecorator('address', {
                initialValue: userInfo.address
              })(
                <TextArea rows={3} placeholder='请输入地址' />
              )
          }
        </FormItem>
      </Form>
    )
  }
}
//表单重新初始化
UserForm = Form.create({})(UserForm)
