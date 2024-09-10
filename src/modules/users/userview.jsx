import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Modal, Typography, Button, Row, Col } from "antd";
const { Text } = Typography;

const userViewModal = ({ handleClose, user, visible }) => {
	return (
		<Modal
			title={
				<div>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col
							className="gutter-row gutter-col"
							style={{ display: "flex", alignItems: "center" }}
							span={20}
						>
							View User
						</Col>
						<Col className="gutter-row" span={4}>
							<Button
								style={{ border: "none" }}
								onClick={handleClose}
							>
								<CloseOutlined />
							</Button>
						</Col>
					</Row>
				</div>
			}
			visible={visible}
			maskClosable={false}
			onCancel={handleClose}
			footer={null}
			closable={false}
			width={400}
		>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> First Name</Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{user.firstName} </Text>
				</Col>
			</Row>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> Last Name</Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{user.lastName} </Text>
				</Col>
			</Row>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> Role</Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{user.role} </Text>
				</Col>
			</Row>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> Email</Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{user.email} </Text>
				</Col>
			</Row>

			<Row justify={"center"}>
				<Button
					style={{ marginTop: 25 }}
					type="primary"
					onClick={handleClose}
				>
					Close
				</Button>
			</Row>
		</Modal>
	);
};

export default userViewModal;
