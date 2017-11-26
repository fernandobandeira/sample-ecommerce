import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class LoginPage extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {      
      if (!err) {
        this.props.doLogin(values);
      }
    });
  }

  render() {    
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Username"
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input the username!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input the password!', whitespace: true }],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginPage);
