//表单组件的封装  父级
import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker } from 'antd'
import Utils from '../../utils/utils'
const FormItem = Form.Item;
class FilterForm extends React.Component {
    //查询  完了再了解一下
    handleFilterSubmit = () => {
        const { getFieldsValue } = this.props.form;
        let DATA = getFieldsValue();
        this.props.filterSubmit(DATA);//最终 向后端输出
    }

    //重置

    reset = () => {
        this.props.form.resetFields();
    }
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        let formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, key) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                let list = item.list || [];
                if (item.type === 'start_time') {
                    const start = <FormItem label="订单时间" key={key}>
                        {
                            getFieldDecorator('start_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(start)
                }
                else if (item.type === 'end_time') {
                    const end = <FormItem label="~" colon={false} key={key}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end)
                }
                else if (item.type === 'input') {
                    const INPUT = <FormItem label={label} key={key}>
                        {getFieldDecorator(field, { initialValue: initialValue })(
                            <Input placeholder={placeholder} />
                        )}
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type === 'select') {

                    const SELECT = <FormItem label={label} key={key} >
                        {getFieldDecorator(field, {
                            initialValue: initialValue
                        }
                        )(
                            <Select style={{ width: width }} placeholder={placeholder}>
                                {Utils.getOptionList(list)}
                            </Select>
                        )}
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type === 'checkbox') {
                    const CHECKBOX = <FormItem label={label} key={key}>
                        {
                            getFieldDecorator(field, {
                                valuePropName: 'checked',
                                initialValue: initialValue //true | false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList;
    }
    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    {/* 在这边加一条判断 */}
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);