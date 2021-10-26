/* eslint-disable react-hooks/exhaustive-deps*/
import React from "react";
import { Dropdown, Layout, Menu } from "antd";
import userIcon from "../images/user-icon.png";
import logoutIcon from "../images/logout.png";
import dropImg from "../images/ellipsis.png";
import myOrder from "../images/myorder.png";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../modules/auth/actions";
import "./header.css";

const { Header } = Layout;

const HeaderComp = ({ account, logoutUser }) => {
	const history = useHistory();
	const logout = () => {
		logoutUser();
	};
	const menu = (
		<Menu>
			<Menu.Item
				key="2"
				onClick={(e) => {
					history.push("/my-bookings");
				}}
			>
				<div className="menuList">
					<img src={myOrder} alt="my-order" />
					<span>My Bookings</span>
				</div>
			</Menu.Item>
			<Menu.Item key="1" onClick={logout}>
				<div className="menuList">
					<img src={logoutIcon} alt="logOut" />
					<span>Log Out</span>
				</div>
			</Menu.Item>
		</Menu>
	);

	return (
		<Header className="header">
			<div className="iconsContainer">
				{account && (
					<div>
						<img alt="" src={userIcon} className="userIcon" />
						<span className="usernameContainer">
							{`${account.firstName} ${account.lastName}`}
						</span>
					</div>
				)}
				{account && (
					<Dropdown
						className="loginMenu"
						overlayClassName="loginDropdownMenu"
						overlay={menu}
						trigger={["click"]}
					>
						<span
							className="ant-dropdown-link"
							style={{ cursor: "pointer" }}
							onClick={(e) => e.preventDefault()}
						>
							<img src={dropImg} alt="" />
						</span>
					</Dropdown>
				)}
			</div>
		</Header>
	);
};

const mapStateToProps = ({ authentication }) => ({
	account: authentication.account,
});

export default connect(mapStateToProps, {
	logoutUser,
})(HeaderComp);
