import React from "react";
import { Form, Input, Button, Card, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = (props) => {
	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	return (
		<Card title={<span>Login</span>} style={{ width: 300 }}>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your Username!",
						},
					]}
				>
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}
				>
					<Input
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<Form.Item>
					<Row justify="center">
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Log in
						</Button>
					</Row>

					<Row justify="center">
						<Link to="/register">register now!</Link>
					</Row>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default Login;
