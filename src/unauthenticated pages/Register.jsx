import React, { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  message,
  Typography,
} from "antd";
import { register } from "../redux/action/authAction";
import { connect } from "react-redux";

import "../App.css";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = ({ register, registerSuccess }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (registerSuccess === true) {
      message.success("Registration successfull!");
    } else if (registerSuccess === false) {
      message.error("Registration failure!");
    }
  }, [registerSuccess]);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    register(values);
  };

  return (
    <>
      <Row justify="center" align="middle" className="register-label">
        <Col align="center" span={24}>
          <Typography.Title level={4}>REGISTER</Typography.Title>
        </Col>
      </Row>
      <Row align="middle" className="register-form-align">
        <Col sm={0} lg={8} offset={{ sm: 0, lg: 8 }} />
        <Col sm={24} lg={8}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="name"
              label="Nickname"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select role!" }]}
            >
              <Select placeholder="select your role">
                <Option value="VISITOR">Visitor</Option>
                <Option value="OWNER">Owner</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="OTHER">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  registerSuccess: state.auth.registerSuccess,
});
export default connect(mapStateToProps, { register })(Register);
