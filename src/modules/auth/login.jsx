import React from "react";
import { Form, Input, Button, Card, Row, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, clearAuthError } from "./actions";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Login = (props) => {
	const {
		isAuthenticated,
		loginError,
		loading,
		clearAuthError,
		login,
	} = props;

	if (isAuthenticated) {
		return <Redirect to={"/"} />;
	}
	const onChange = (val) => {
		if (loginError) {
			clearAuthError();
		}
	};

	const onFinish = (values) => {
		login(values);
	};

	return (
		<Card title={<span>Login</span>} style={{ width: 500 }}>
			<Form
				name="normal_login"
				className="login-form"
				onFinish={onFinish}
			>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your email!",
						},
					]}
					onChange={onChange}
				>
					<Input
						prefix={
							<UserOutlined className="site-form-item-icon" />
						}
						placeholder="Email"
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
					onChange={onChange}
				>
					<Input
						prefix={
							<LockOutlined className="site-form-item-icon" />
						}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				{props.loginError ? (
					<Alert
						message={props.loginError}
						type="error"
						closable
						afterClose={props.clearAuthError}
					/>
				) : null}

				<Form.Item>
					<Row justify="center">
						<Button
							loading={loading}
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

const mapStateToProps = ({ authentication }) => ({
	loading: authentication.loading,
	isAuthenticated: authentication.isAuthenticated,
	loginError: authentication.errorMessage,
});

const mapDispatchToProps = { login, clearAuthError };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
