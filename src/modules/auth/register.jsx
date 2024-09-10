import React from "react";
import { Form, Input, Button, Select, Alert, Card } from "antd";
import { register, clearAuthError } from "./actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Register = (props) => {
	const {
		loading,
		register,
		clearAuthError,
		isAuthenticated,
		registerError,
	} = props;

	if (isAuthenticated) {
		return <Redirect to={"/"} />;
	}

	const onFinish = (values) => {
		register(values);
	};

	return (
		<>
			<Card title={<span>Register</span>} style={{ width: 500 }}>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					layout="horizontal"
					onFinish={onFinish}
				>
					<Form.Item
						name="firstName"
						label="First Name"
						rules={[
							{
								required: true,
								message: "Please enter your name.",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="lastName"
						label="Last Name"
						rules={[
							{
								required: true,
								message: "Please enter your name.",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please enter your email.",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="role"
						label="Role"
						rules={[
							{
								required: true,
								message: "Please select your role.",
							},
						]}
					>
						<Select>
							<Select.Option value="VISITOR">
								Visitor
							</Select.Option>
							<Select.Option value="OWNER">Owner</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please enter your password",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						label="Confirm Password"
						dependencies={["password"]}
						rules={[
							{
								required: true,
								message: "Please enter Confirm Password",
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (
										!value ||
										getFieldValue("password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										"Password does not match!"
									);
								},
							}),
						]}
					>
						<Input />
					</Form.Item>
					{registerError ? (
						<Alert
							message={registerError}
							type="error"
							closable
							afterClose={clearAuthError}
						/>
					) : null}
					<Button loading={loading} type="primary" htmlType="submit">
						Register
					</Button>
				</Form>
			</Card>
		</>
	);
};

const mapStateToProps = ({ authentication }) => ({
	loading: authentication.loading,
	isAuthenticated: authentication.isAuthenticated,
	registerError: authentication.errorMessage,
});

const mapDispatchToProps = { register, clearAuthError };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
