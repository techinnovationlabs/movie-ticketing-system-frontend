import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Modal, Typography, Button, Row, Col } from "antd";
const { Text } = Typography;

const ShowViewModal = ({ handleClose, show, visible }) => {
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
							View Show
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
					<Text> Date </Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{show.date} </Text>
				</Col>
			</Row>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> Movie </Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{show.movie.title} </Text>
				</Col>
			</Row>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> Screen </Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{show.screen.name} </Text>
				</Col>
			</Row>
			<Row>
				<Col className="doubleDot" span={11}>
					<Text> Slot </Text>
				</Col>
				<Col className="popValue" span={13}>
					<Text>{show.showTime.slot} </Text>
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

export default ShowViewModal;
