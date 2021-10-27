import React, { useEffect } from "react";
import { Card, Button } from "antd";
import { connect } from "react-redux";
import { fetchMovies } from "../movies/actions";
import "./dashboard.css";
import { useHistory } from "react-router-dom";
const { Meta } = Card;
const Dashboard = (props) => {
	const history = useHistory();
	useEffect(() => {
		props.fetchMovies();
	}, []);

	const onBookTicket = (id) => {
		history.push(`/book/${id}`);
	};

	const onView = (id) => {
		history.push(`/movies/${id}`);
	};

	return (
		<>
			<div className={"dashboard-container"}>
				{props.movies.map((movie) => (
					<Card
						cover={
							<img
								class="poster"
								alt="poster"
								src={movie.poster}
							/>
						}
						actions={[
							<Button onClick={() => onView(movie._id)}>
								View details
							</Button>,
							<Button onClick={() => onBookTicket(movie._id)}>
								Book now
							</Button>,
						]}
					>
						<Meta
							title={movie.title}
							description={
								<p className="line-clamp">{movie.plot}</p>
							}
						/>
					</Card>
				))}
			</div>
		</>
	);
};

const mapStateToProps = ({ movieManagement }) => ({
	moviesLoading: movieManagement.loading,
	movies: movieManagement.movies,
	fetchErrorMsg: movieManagement.fetchErrorMessage,
});
const mapDispatchToProps = {
	fetchMovies,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
