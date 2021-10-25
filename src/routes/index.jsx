import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/not-found";
import Login from "../modules/auth/login";
import Dashboard from "../modules/dashboard/dashboard";
import Register from "../modules/register/register";

const Routes = () => (
	<>
		<Switch>
			<Route exact path={`/dashboard`} component={Dashboard} />
			<Route exact path={`/register`} component={Register} />
			<Route exact path={`/login`} component={Login} />
			<Redirect exact from="/" to="/dashboard" />
			<Route path="*" component={NotFound} />
		</Switch>
	</>
);

export default Routes;
