import React from "react";

import { Row, Col } from "antd";
import { Form, Input, Button, Checkbox } from "antd";

import "../App.css";
import { login } from "../redux/action/authAction";
import { connect } from "react-redux";

const Login = ({ login }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    login({ data: values });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  return (
    <Row className="loginFormAlign" align="middle">
      <Col sm={0} lg={8} offset={{ sm: 0, lg: 8 }} />
      <Col sm={24} lg={8}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, { login })(Login);
