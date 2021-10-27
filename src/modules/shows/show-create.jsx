/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	Modal,
	Button,
	Form,
	Alert,
	Spin,
	Select,
	DatePicker,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./show.css";
const { Option } = Select;
const ShowCreateModal = ({
	visible,
	handleClose,
	handleSubmit,
	errorMsg,
	loading,
	allMovies,
	allScreens,
	allSlots,
	clearMessages,
}) => {
	useEffect(() => {
		clearMessages();
	});
	const onFormSubmit = async (values) => {
		debugger;
		await handleSubmit(values);
	};

	return (
		<React.Fragment>
			<Modal
				title={
					<div className="screen-modal-header">
						<div>Create Show</div>
						<div>
							<Button className="closeBtn" onClick={handleClose}>
								<CloseOutlined />
							</Button>
						</div>
					</div>
				}
				visible={visible}
				width={500}
				maskClosable={false}
				onCancel={handleClose}
				footer={null}
				closable={false}
			>
				{errorMsg ? (
					<Alert
						message={errorMsg}
						type="error"
						closable
						afterClose={clearMessages}
					/>
				) : null}
				<Form layout="horizontal" onFinish={onFormSubmit}>
					<Row>
						<Col span={24}>
							<Form.Item
								labelCol={{
									sm: { span: 24 },
									md: { span: 8 },
								}}
								labelAlign={"left"}
								name="date"
								label="Date"
								rules={[
									() => ({
										required: true,
									}),
								]}
							>
								<DatePicker />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								labelCol={{
									sm: { span: 24 },
									md: { span: 8 },
								}}
								labelAlign={"left"}
								name="movieId"
								label="Movie"
								rules={[
									{
										required: true,
										message: "Please select the Movie",
									},
								]}
							>
								<Select
									placeholder="Select a movie"
									showSearch
									optionFilterProp="children"
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(
												optionB.children.toLowerCase()
											)
									}
								>
									{allMovies.map((movie) => (
										<Option value={movie._id}>
											{movie.title}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								labelCol={{
									sm: { span: 24 },
									md: { span: 8 },
								}}
								labelAlign={"left"}
								name="screenId"
								label="Movie"
								rules={[
									{
										required: true,
										message: "Please select the Screen",
									},
								]}
							>
								<Select
									placeholder="Select a screen"
									showSearch
									optionFilterProp="children"
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(
												optionB.children.toLowerCase()
											)
									}
								>
									{allScreens.map((screen) => (
										<Option value={screen._id}>
											{screen.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								labelCol={{
									sm: { span: 24 },
									md: { span: 8 },
								}}
								labelAlign={"left"}
								name="slotId"
								label="Showtime"
								rules={[
									{
										required: true,
										message: "Please select the Showtime",
									},
								]}
							>
								<Select
									placeholder="Select a Showtime"
									showSearch
									optionFilterProp="children"
									filterSort={(optionA, optionB) =>
										optionA.children
											.toLowerCase()
											.localeCompare(
												optionB.children.toLowerCase()
											)
									}
								>
									{allSlots.map((slot) => (
										<Option value={slot._id}>
											{slot.slot}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<div className="modalBtn">
						<Form.Item style={{ marginRight: "3%" }}>
							<Button
								className="cancelBtn"
								htmlType="reset"
								onClick={handleClose}
							>
								Cancel
							</Button>
						</Form.Item>
						<Form.Item>
							<Spin spinning={loading}>
								<Button className="submitBtn" htmlType="submit">
									Submit
								</Button>
							</Spin>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</React.Fragment>
	);
};
export default ShowCreateModal;
