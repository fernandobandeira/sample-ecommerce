import React, { Component } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Switch,
  Select,
  Icon,
  DatePicker,
  Transfer,
} from 'antd';
import { getDifferences } from '../../utils';
import moment from 'moment';

class DiscountsForm extends Component {
  state = {
    targetKeys: [],
    initialized: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let discount = values;
        discount.start = discount.period[0];
        discount.end = discount.period[1];
        discount.period = undefined;        

        if (this.props.discount) {
          return this.props.handleSubmit(getDifferences(this.props.discount, discount));
        }

        this.props.handleSubmit(discount);
      }
    });
  }

  handleTransferChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  componentWillReceiveProps(props) {
    if (props.discount && !this.state.initialized) {
      this.setState({ targetKeys: props.discount.products, initialized: true });
    }
  }

  render() {    
    const { loading, discount = {}, categories = [], products = [] } = this.props;
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
            <Form.Item
              {...formItemLayout}
              label="Categories"
            >
              {getFieldDecorator('categories', {
                initialValue: discount.categories,
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                >
                  {categories.map(category => (
                    <Select.Option key={category._id}>{category.name}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Products"
            >
              {getFieldDecorator('products', {
                initialValue: discount.products,
              })(
                <Transfer
                  dataSource={products}
                  targetKeys={this.state.targetKeys}
                  onChange={this.handleTransferChange}
                  render={product => product.name}
                />
              )}
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
