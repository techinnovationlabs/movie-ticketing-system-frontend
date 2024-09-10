import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Login from "../unauthenticated pages/Login";
import NotFound from "../unauthenticated pages/NotFound";
import OwnerTabs from "../owner/OwnerTabs";
import Register from "../unauthenticated pages/Register";
import UnAuth from "../unauthenticated pages/UnAuth";
import Details from "../visitor/Details";
import MoviesList from "../visitor/MoviesList";

const AppRoute = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Redirect exact path="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={Register} />
          <AuthRoute exact path="/movies" component={MoviesList} />
          <AuthRoute exact path="/details" component={Details} />
          <AuthRoute exact path="/owner-dashboard" component={OwnerTabs} />
          <Route path="/un-authorize" component={UnAuth} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoute;
