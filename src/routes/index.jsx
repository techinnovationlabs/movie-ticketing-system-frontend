import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "../components/not-found";
import Login from "../modules/auth/login";
import Dashboard from "../modules/dashboard/dashboard";
import Register from "../modules/auth/register";
import Movies from "../modules/movies/movies";
import Screens from "../modules/screens/screens";
import Users from "../modules/users/users";
import Shows from "../modules/shows/shows";
import MovieDetail from "../modules/movies/movie/movie";
import MyBookings from "../modules/my-bookings/my-bookings";
import { autoLogin } from "../modules/auth/actions";
import { connect } from "react-redux";
import PrivateRoute from "./private-route";

const Routes = ({ autoLogin }) => {
	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<>
			<Switch>
				<PrivateRoute
					exact
					path={`/my-bookings`}
					component={MyBookings}
				/>
				<PrivateRoute
					exact
					path={`/movies/:id`}
					component={MovieDetail}
				/>
				<PrivateRoute exact path={`/movies`} component={Movies} />
				<PrivateRoute exact path={`/screens`} component={Screens} />
				<PrivateRoute exact path={`/shows`} component={Shows} />
				<PrivateRoute exact path={`/users`} component={Users} />
				<PrivateRoute exact path={`/dashboard`} component={Dashboard} />
				<Route exact path={`/register`} component={Register} />
				<Route exact path={`/login`} component={Login} />
				<Redirect exact from="/" to="/dashboard" />
				<Route path="*" component={NotFound} />
			</Switch>
		</>
	);
};

const mapDispatchToProps = { autoLogin };

export default connect(null, mapDispatchToProps)(Routes);
