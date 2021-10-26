import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Modal, Typography, Button, Row, Col } from "antd";
const { Text } = Typography;

const screenViewModal = ({ handelClose, screen, visible }) => {
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
							View Screen
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
					<Text> Screen Name</Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{screen.name} </Text>
				</Col>
			</Row>
			<Row>
				<Text> Tiers</Text>
			</Row>
			{screen.tier.map((tier) => {
				return (
					<Row>
						<Col className="doubleDot" span={11}>
							<Text> {tier.name}</Text>
						</Col>
						<Col className="popValue" span={13}>
							<Text>{tier.price} Rs</Text>
						</Col>
					</Row>
				);
			})}
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

export default screenViewModal;
