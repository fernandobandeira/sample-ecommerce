import React, { Component } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Switch,
  Icon,
  DatePicker,
} from 'antd';
import moment from 'moment';

class DiscountsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let discount = values;
        discount.start = discount.period[0];
        discount.end = discount.period[1];
        discount.period = undefined;

        this.props.handleSubmit(discount);
      }
    });
  }

  render() {    
    const { loading, discount = {} } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <div>
        {loading && (
          <Icon type="loading" className="loading" />
        )}
        {!loading && (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label="Active"
            >
              {getFieldDecorator('active', {
                valuePropName: 'checked',
                initialValue: discount.active,
              })(<Switch />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Name"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the discount name!', whitespace: true }],
                initialValue: discount.name,
              })(<Input />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Period"
            >
              {getFieldDecorator('period', {
                initialValue: [moment(discount.start), moment(discount.end)],
              })(
                <DatePicker.RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Start Time', 'End Time']}
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Percentage"
            >
              {getFieldDecorator('percentage', {
                initialValue: discount.percentage,
              })(<InputNumber min={0} max={100} />)}
              <span className="ant-form-text">%</span>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

export default Form.create()(DiscountsForm);
