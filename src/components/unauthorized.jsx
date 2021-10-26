import React from "react";
import { Link } from "react-router-dom";
const UnauthorizedAccess = (props) => {
	return (
		<div>
			<h3>403 Access Forbidden</h3>
			<h5>
				We are sorry but the page you are looking for is not for your
				eyes.
			</h5>
			<h6>Click the below link to go to</h6>
			<div>
				<Link to="/dashboard">Dashboard</Link>
			</div>
			<p></p>
		</div>
	);
};

export default UnauthorizedAccess;
