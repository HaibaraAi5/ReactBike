import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
  //封装日期
  formateDate(time) {
    if (!time) {
      return '';
    }
    else {
      let date = new Date(time);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds()
    }
  },
  //分页
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`
      },
      showQuickJumper: true
    }
  },
  //下拉框封装
  getOptionList:(data)=> {
    if (!data) {
      return [];
    }

    let options = [];

    data.map((item, index) => {
      // debugger
      return options.push(<Option value={item.id} key={index}>{item.name}</Option>)
    })
    return options;
  },


  // ETable 行点击通用函数
  // @param {*选中行的索引} selectedRowKeys
  // @param {*选中行对象} selectedItem

  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  },
}