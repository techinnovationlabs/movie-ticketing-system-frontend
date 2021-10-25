import React from "react";
import { Redirect, Route } from "react-router";

const AuthRoute = (props) => {
  return localStorage.getItem("authenticated") === "true" ? (
    <Route {...props} />
  ) : (
    <Redirect to="/un-authorize" />
  );
};

export default AuthRoute;
