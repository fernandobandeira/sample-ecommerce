import React, { Component } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Switch,
  Icon,
  Select,
} from 'antd';

class ProductsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  }

  render() {    
    const { loading, categories, product = {} } = this.props;
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
                initialValue: product.active,
              })(<Switch />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Name"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the product name!', whitespace: true }],
                initialValue: product.name,
              })(<Input />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Price"
            >
              {getFieldDecorator('price', {
                initialValue: product.price,
              })(<InputNumber min={0} />)}
              <span className="ant-form-text">USD</span>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Description"
            >
              {getFieldDecorator('description', {
                initialValue: product.description,
              })(<Input.TextArea rows={4} />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Categories"
            >
              {getFieldDecorator('categories', {
                initialValue: product.categories !== undefined ? product.categories.reduce((previous, category) => {
                  previous.push(category._id);
                  return previous;
                }, []) : undefined,
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
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

export default Form.create()(ProductsForm);
