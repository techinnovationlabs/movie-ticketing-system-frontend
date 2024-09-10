/* eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect, useState } from "react";
import { Button, Alert, Typography, Table, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchScreens, createScreen } from "./actions";
import ScreenViewModal from "./screenview";
import { Helmet } from "react-helmet";
import "./screen.css";
import { CLEAR_SCREEN_FETCH_ERROR_MSG } from "./action-types";
import { clearMessage } from "../../utils/common-actions";
import { RECORDS_PER_PAGE } from "../../utils/constants";
import ScreenCreateModal from "./screen-create";
const { Title } = Typography;

const Screens = ({
	screens,
	fetchScreens,
	fetchErrorMsg,
	clearMessage,
	screenLoading,
	errorMsg,
	successMsg,
	createScreen,
}) => {
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedScreen, setSelectedScreen] = useState(null);
	useEffect(() => {
		fetchScreens();
		return () => {
			clearFetchError();
		};
	}, []);

	const clearFetchError = () => {
		clearMessage(CLEAR_SCREEN_FETCH_ERROR_MSG);
	};

	const handleSubmit = async (values) => {
		setLoading(true);
		const result = await createScreen(values);
		if (result.success) {
			fetchScreens();
			setCreateModal(false);
		}
		setLoading(false);
	};
	const handleCreateCancel = () => {
		setCreateModal(false);
	};
	const handleCancel = () => {
		setViewModal(false);
		setSelectedScreen(null);
	};

	const onView = (screen) => {
		setSelectedScreen({ ...screen });
		setViewModal(true);
	};

	const columns = [
		{
			align: "center",
			title: "Screen name",
			dataIndex: "name",
			key: "name",
			width: "18%",
			render: (name) => name,
			ellipsis: true,
		},
		{
			align: "center",
			title: "Available Tiers",
			dataIndex: "tier",
			key: "tier",
			width: "18%",
			render: (tier, record) => {
				const tiers = record.tier.map((tier) => tier.name);
				return tiers.join(",");
			},
			ellipsis: true,
		},
		{
			align: "center",
			title: "Actions",
			key: "action",
			width: "15%",
			ellipsis: true,
			render: (record) => (
				<Button
					size="small"
					title="view"
					className="icon-btn"
					onClick={() => {
						onView(record);
					}}
				>
					<EyeOutlined
						style={{ color: "#549e39" }}
						className="edit-icon"
					/>
				</Button>
			),
			responsive: ["lg", "md"],
		},
	];

	return (
		<div>
			<Helmet>
				<title>Screens</title>
			</Helmet>
			<Title level={5}>Screens</Title>
			{fetchErrorMsg ? (
				<Alert
					message={fetchErrorMsg}
					type="error"
					closable
					afterClose={clearFetchError}
				/>
			) : null}
			<Row style={{ marginBottom: 10 }}>
				<Button type="primary" onClick={() => setCreateModal(true)}>
					Create Screen
				</Button>
			</Row>
			<Row>
				<Table
					loading={screenLoading}
					columns={columns}
					pagination={{ defaultPageSize: RECORDS_PER_PAGE }}
					dataSource={screens}
					rowKey={(record) => record._id}
				/>
			</Row>
			{viewModal ? (
				<ScreenViewModal
					handleClose={handleCancel}
					visible={viewModal}
					screen={selectedScreen}
				/>
			) : null}
			{createModal ? (
				<ScreenCreateModal
					handleClose={handleCreateCancel}
					visible={createModal}
					handleSubmit={handleSubmit}
					errorMsg={errorMsg}
					loading={loading}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = ({ screenManagement }) => ({
	screenLoading: screenManagement.loading,
	screens: screenManagement.screens,
	fetchErrorMsg: screenManagement.fetchErrorMessage,
	successMsg: screenManagement.successMessage,
	errorMsg: screenManagement.errorMessage,
});
const mapDispatchToProps = {
	fetchScreens,
	clearMessage,
	createScreen,
};
export default connect(mapStateToProps, mapDispatchToProps)(Screens);
