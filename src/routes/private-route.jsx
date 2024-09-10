import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import UnauthorizedAccess from "../components/unauthorized";
import Layout from "../components/layout";

export const PrivateRoute = ({
	component: ComponentToRender,
	isAuthenticated,
	sessionHasBeenFetched,
	logout,
	authorized,
	account,
	...rest
}) => {
	const { role } = account || { role: "" };
	const renderRedirect = (props) => {
		if (!sessionHasBeenFetched) {
			return <div></div>;
		} else {
			return isAuthenticated ? (
				<Layout {...props}>
					{(authorized ? authorized.includes(role) : true) ? (
						<ComponentToRender {...props} />
					) : (
						<UnauthorizedAccess />
					)}
				</Layout>
			) : logout ? (
				<Redirect
					to={{
						pathname: "/login",
					}}
				/>
			) : (
				<Redirect
					to={{
						pathname: "/login",
						search: props.location.search,
						state: { from: props.location },
					}}
				/>
			);
		}
	};

	return <Route {...rest} render={renderRedirect} />;
};

const mapStateToProps = ({
	authentication: { isAuthenticated, sessionHasBeenFetched, logout, account },
}) => ({
	isAuthenticated,
	sessionHasBeenFetched,
	logout,
	account,
});
export default connect(mapStateToProps, null)(PrivateRoute);
