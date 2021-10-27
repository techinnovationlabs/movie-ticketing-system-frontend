/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import {
	Row,
	Col,
	Modal,
	Button,
	Form,
	Input,
	Select,
	Alert,
	Spin,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { NORMAL_TIER_ROWS, VIP_TIER_ROWS } from "../../utils/constants";

const ScreenModal = ({
	visible,
	handleClose,
	handleSubmit,
	errorMsg,
	clearMessages,
	loading,
}) => {
	const onFormSubmit = async (values) => {
		const tier = tiercreateStaticTiers(values);
		await handleSubmit({ name: values.name, tier });
	};

	const tiercreateStaticTiers = (values) => {
		const tier = [];
		tier.push({
			name: "Normal",
			code: "N",
			price: values.normalPrice,
			rows: NORMAL_TIER_ROWS,
		});
		tier.push({
			name: "VIP",
			code: "V",
			price: values.vipPrice,
			rows: VIP_TIER_ROWS,
		});
		return tier;
	};

	return (
		<React.Fragment>
			<Modal
				title={
					<div className="screen-modal-header">
						<div>Create Screen</div>
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
				centered={true}
			>
				{errorMsg ? (
					<Alert
						message={errorMsg}
						type="error"
						closable
						afterClose={clearMessages}
					/>
				) : null}
				<Form
					layout="horizontal"
					onFinish={onFormSubmit}
					labelAlign="left"
				>
					<Row>
						<Form.Item
							name="name"
							label="Name"
							rules={[
								() => ({
									required: true,
									message: "Please enter the name",
								}),
							]}
						>
							<Input
								placeholder="Enter here"
								className="inputStyle"
							/>
						</Form.Item>
					</Row>
					<Row>
						<Form.Item
							name="vipPrice"
							label="VIP Price"
							rules={[
								() => ({
									required: true,
									message: "Please enter the price",
								}),
							]}
						>
							<Input
								type="number"
								min={0}
								placeholder="Enter here"
								className="inputStyle"
							/>
						</Form.Item>
					</Row>
					<Row>
						<Form.Item
							name="normalPrice"
							label="Normal Price"
							rules={[
								() => ({
									required: true,
									message: "Please enter the price",
								}),
							]}
						>
							<Input
								type="number"
								min={0}
								placeholder="Enter here"
								className="inputStyle"
							/>
						</Form.Item>
					</Row>

					<div className="modalBtn">
						<Button
							htmlType="reset"
							onClick={handleClose}
							style={{ marginRight: "25px" }}
						>
							Cancel
						</Button>
						<Spin spinning={loading}>
							<Button htmlType="submit">Submit</Button>
						</Spin>
					</div>
				</Form>
			</Modal>
		</React.Fragment>
	);
};
export default ScreenModal;
