import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Modal, Typography, Button, Row, Col } from "antd";
import "./user.css";
const { Text } = Typography;

const userViewModal = ({ handelClose, user, visible }) => {
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
								onClick={handelClose}
							>
								<CloseOutlined />
							</Button>
						</Col>
					</Row>
				</div>
			}
			visible={visible}
			maskClosable={false}
			onCancel={handelClose}
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
					onClick={handelClose}
				>
					Close
				</Button>
			</Row>
		</Modal>
	);
};

export default userViewModal;
