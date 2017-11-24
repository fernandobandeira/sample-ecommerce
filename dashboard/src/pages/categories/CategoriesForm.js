import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Switch,
  Icon,
} from 'antd';

class CategoriesForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  }

  render() {    
    const { loading, category = {} } = this.props;
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
                initialValue: category.active,
              })(<Switch />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Name"
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the category name!', whitespace: true }],
                initialValue: category.name,
              })(<Input />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Description"
            >
              {getFieldDecorator('description', {
                initialValue: category.description,
              })(<Input.TextArea rows={4} />)}
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

export default Form.create()(CategoriesForm);
