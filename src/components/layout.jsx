import { Layout, Menu } from "antd";
import {
	PieChartOutlined,
	FullscreenOutlined,
	PlaySquareFilled,
	UnorderedListOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./layout.css";
import HeaderComponent from "./header";
import { Link } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

const TopLayout = (props) => {
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = (collapsed) => {
		console.log(collapsed);
		setCollapsed(collapsed);
	};

	return (
		<Layout style={{ minHeight: "100vh", width: "100%" }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="header-logo" />
				<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						<Link to="/dashboard">Dashboard</Link>
					</Menu.Item>
					<Menu.Item key="2" icon={<PlaySquareFilled />}>
						<Link to="/movies">Movies</Link>
					</Menu.Item>
					<Menu.Item key="3" icon={<FullscreenOutlined />}>
						<Link to="/screens">Screens</Link>
					</Menu.Item>
					<Menu.Item key="4" icon={<UnorderedListOutlined />}>
						<Link to="/shows">Shows</Link>
					</Menu.Item>
					<Menu.Item key="5" icon={<UserOutlined />}>
						<Link to="/users">Users</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<HeaderComponent />
				<Content style={{ margin: "0 16px" }}>{props.children}</Content>
				<Footer style={{ textAlign: "center" }}>
					Movie Booking App @2021
				</Footer>
			</Layout>
		</Layout>
	);
};

export default TopLayout;
