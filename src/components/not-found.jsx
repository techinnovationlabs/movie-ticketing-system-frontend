import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
	return (
		<div>
			<h3>404 page not found</h3>
			<h5>
				We are sorry but the page you are looking for does not exist.
			</h5>
			<h6>Click the below link to go to</h6>
			<div>
				<Link to="/">Dashboard</Link>
			</div>
		</div>
	);
};

export default NotFound;
