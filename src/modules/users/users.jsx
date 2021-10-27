/* eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect, useState } from "react";
import { Button, Alert, Typography, Table, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchUsers } from "./actions";
import UserViewModal from "./userview";
import { Helmet } from "react-helmet";
import { CLEAR_USER_FETCH_ERROR_MSG } from "./action-types";
import { clearMessage } from "../../utils/common-actions";
import { RECORDS_PER_PAGE } from "../../utils/constants";
const { Title } = Typography;

const Users = ({
	users,
	fetchUsers,
	fetchErrorMsg,
	clearMessage,
	usersLoading,
}) => {
	const [viewModal, setViewModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	useEffect(() => {
		fetchUsers();
		return () => {
			clearFetchError();
		};
	}, []);

	const clearFetchError = () => {
		clearMessage(CLEAR_USER_FETCH_ERROR_MSG);
	};

	const handleCancel = () => {
		setViewModal(false);
		setSelectedUser(null);
	};

	const onView = (user) => {
		setSelectedUser({ ...user });
		setViewModal(true);
	};

	const columns = [
		{
			align: "center",
			title: "First Name",
			dataIndex: "firstName",
			key: "firstName",
			width: "18%",
			render: (firstName) => firstName,
			ellipsis: true,
		},
		{
			align: "center",
			title: "Last Name",
			dataIndex: "lastName",
			key: "lastName",
			width: "18%",
			render: (lastName) => lastName,
			ellipsis: true,
		},
		{
			align: "center",
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: "18%",
			render: (email) => (email ? email : "-"),
			ellipsis: true,
		},
		{
			align: "center",
			title: "Role",
			dataIndex: "role",
			key: "role",
			width: "13%",
			render: (role) => <div className="roleName">{role} </div>,
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
				<title>Users</title>
			</Helmet>
			<Title level={5}>Users</Title>
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
					loading={usersLoading}
					columns={columns}
					pagination={{ defaultPageSize: RECORDS_PER_PAGE }}
					dataSource={users}
					rowKey={(record) => record._id}
				/>
			</Row>
			{viewModal ? (
				<UserViewModal
					handleClose={handleCancel}
					visible={viewModal}
					user={selectedUser}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = ({ userManagement }) => ({
	usersLoading: userManagement.loading,
	users: userManagement.users,
	fetchErrorMsg: userManagement.fetchErrorMessage,
});
const mapDispatchToProps = {
	fetchUsers,
	clearMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
