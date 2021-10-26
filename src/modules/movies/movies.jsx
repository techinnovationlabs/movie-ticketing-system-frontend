/* eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect } from "react";
import { Button, Alert, Typography, Table, Row } from "antd";
import { connect } from "react-redux";
import { fetchMovies } from "./actions";
import { Helmet } from "react-helmet";
import { CLEAR_MOVIE_FETCH_ERROR_MSG } from "./action-types";
import { clearMessage } from "../../utils/common-actions";
import { RECORDS_PER_PAGE } from "../../utils/constants";
import { useHistory } from "react-router-dom";
const { Title } = Typography;

const Movies = ({
	movies,
	fetchMovies,
	fetchErrorMsg,
	clearMessage,
	moviesLoading,
}) => {
	const history = useHistory();
	useEffect(() => {
		fetchMovies();
		return () => {
			clearFetchError();
		};
	}, []);

	const clearFetchError = () => {
		clearMessage(CLEAR_MOVIE_FETCH_ERROR_MSG);
	};

	const onView = (movie) => {
		history.push(`${window.location.pathname}/${movie._id}`);
	};

	const columns = [
		{
			align: "center",
			title: "Title",
			dataIndex: "title",
			key: "title",
			width: "30%",
			render: (title) => title,
			ellipsis: true,
		},
		{
			align: "center",
			title: "Plot",
			dataIndex: "plot",
			key: "plot",
			width: "50%",
			render: (plot) => plot,
			ellipsis: true,
		},
		{
			align: "center",
			title: "Actions",
			key: "action",
			width: "20%",
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
					View Details
				</Button>
			),
			responsive: ["lg", "md"],
		},
	];

	return (
		<div>
			<Helmet>
				<title>Movies</title>
			</Helmet>
			<Title level={5}>Movies</Title>
			{fetchErrorMsg ? (
				<Alert
					message={fetchErrorMsg}
					type="error"
					closable
					afterClose={clearFetchError}
				/>
			) : null}
			<Row>
				<Table
					loading={moviesLoading}
					columns={columns}
					pagination={{ defaultPageSize: RECORDS_PER_PAGE }}
					dataSource={movies}
					rowKey={(record) => record._id}
				/>
			</Row>
		</div>
	);
};

const mapStateToProps = ({ movieManagement }) => ({
	moviesLoading: movieManagement.loading,
	movies: movieManagement.movies,
	fetchErrorMsg: movieManagement.fetchErrorMessage,
});
const mapDispatchToProps = {
	fetchMovies,
	clearMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
