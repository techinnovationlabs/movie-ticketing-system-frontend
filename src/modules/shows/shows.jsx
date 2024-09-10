/* eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect, useState } from "react";
import { Button, Alert, Typography, Table, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchShows, createShow } from "./actions";
import { fetchScreens } from "../screens/actions";
import { fetchMovies } from "../movies/actions";
import { fetchSlots } from "../slots/actions";
import ShowViewModal from "./showview";
import { Helmet } from "react-helmet";
import "./show.css";
import { CLEAR_SHOW_FETCH_ERROR_MSG, CLEAR_SHOW_MSG } from "./action-types";
import { clearMessage } from "../../utils/common-actions";
import { RECORDS_PER_PAGE } from "../../utils/constants";
import ShowCreateModal from "./show-create";
const { Title } = Typography;

const Shows = ({
	shows,
	fetchShows,
	fetchErrorMsg,
	clearMessage,
	showLoading,
	errorMsg,
	successMsg,
	createShow,
	allSlots,
	allMovies,
	allScreens,
	fetchScreens,
	fetchMovies,
	fetchSlots,
}) => {
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedShow, setSelectedShow] = useState(null);
	useEffect(() => {
		fetchShows();
		fetchMovies();
		fetchSlots();
		fetchScreens();
		return () => {
			clearFetchError();
		};
	}, []);

	const clearFetchError = () => {
		clearMessage(CLEAR_SHOW_FETCH_ERROR_MSG);
	};
	const clearMessages = () => {
		clearMessage(CLEAR_SHOW_MSG);
	};
	const handleSubmit = async (values) => {
		setLoading(true);
		const result = await createShow(values);
		if (result.success) {
			fetchShows();
			setCreateModal(false);
		}
		setLoading(false);
	};
	const handleCreateCancel = () => {
		setCreateModal(false);
	};
	const handleCancel = () => {
		setViewModal(false);
		setSelectedShow(null);
	};

	const onView = (show) => {
		setSelectedShow({ ...show });
		setViewModal(true);
	};

	const columns = [
		{
			align: "center",
			title: "Date",
			dataIndex: "date",
			key: "date",
			width: "18%",
			render: (date) => date,
			ellipsis: true,
		},
		{
			align: "center",
			title: "Movie Name",
			dataIndex: "movie",
			key: "movie",
			width: "18%",
			render: (movie, record) => {
				return movie.title;
			},
			ellipsis: true,
		},
		{
			align: "center",
			title: "Screen Name",
			dataIndex: "screen",
			key: "screen",
			width: "18%",
			render: (screen, record) => {
				return screen.name;
			},
			ellipsis: true,
		},
		{
			align: "center",
			title: "Show Slot",
			dataIndex: "showTime",
			key: "showTime",
			width: "18%",
			render: (showTime, record) => {
				return showTime.slot;
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
				<title>Shows</title>
			</Helmet>
			<Title level={5}>Shows</Title>
			{fetchErrorMsg ? (
				<Alert
					message={fetchErrorMsg}
					type="error"
					closable
					afterClose={clearFetchError}
				/>
			) : null}
			<Row style={{ marginBottom: "10px" }}>
				<Button type="primary" onClick={() => setCreateModal(true)}>
					Create Show
				</Button>
			</Row>
			<Row>
				<Table
					loading={showLoading}
					columns={columns}
					pagination={{ defaultPageSize: RECORDS_PER_PAGE }}
					dataSource={shows}
					rowKey={(record) => record._id}
				/>
			</Row>
			{viewModal ? (
				<ShowViewModal
					handleClose={handleCancel}
					visible={viewModal}
					show={selectedShow}
				/>
			) : null}
			{createModal ? (
				<ShowCreateModal
					handleClose={handleCreateCancel}
					visible={createModal}
					handleSubmit={handleSubmit}
					errorMsg={errorMsg}
					loading={loading}
					allMovies={allMovies}
					allScreens={allScreens}
					allSlots={allSlots}
					clearMessages={clearMessages}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = ({
	showManagement,
	movieManagement,
	screenManagement,
	slotManagement,
}) => ({
	showLoading: showManagement.loading,
	shows: showManagement.shows,
	fetchErrorMsg: showManagement.fetchErrorMessage,
	successMsg: showManagement.successMessage,
	errorMsg: showManagement.errorMessage,
	allMovies: movieManagement.movies,
	allScreens: screenManagement.screens,
	allSlots: slotManagement.slots,
});
const mapDispatchToProps = {
	fetchShows,
	clearMessage,
	createShow,
	fetchScreens,
	fetchMovies,
	fetchSlots,
};
export default connect(mapStateToProps, mapDispatchToProps)(Shows);
