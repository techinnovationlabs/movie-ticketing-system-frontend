import React, { useEffect } from "react";
import { Row, Col, Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import { fetchMovieById } from "../actions";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import "./movie.css";
const { Title } = Typography;

const MovieDetail = ({ fetchMovieById, match, movie, movieLoading }) => {
	const history = useHistory();
	useEffect(() => {
		fetchMovieById(match.params.id);
	}, [match.params.id]);

	const onBookNow = () => {
		history.push(`/book/${movie._id}`);
	};

	return (
		<>
			<div style={{ marginTop: 20 }}>
				{!movieLoading ? (
					<>
						<ReactPlayer
							height={"60vh"}
							width="100%"
							url={movie?.trailerLink}
						/>
						<Row className="movie-details-container">
							<Col span={8} style={{ paddingRight: 20 }}>
								<img
									class="poster-img"
									alt="poster"
									src={movie?.poster}
								/>
							</Col>
							<Col span={16}>
								<Title>{movie?.title}</Title>
								<p>{movie?.plot}</p>
								<Button type="primary" onClick={onBookNow}>
									Book Now
								</Button>
							</Col>
						</Row>
					</>
				) : null}
			</div>
		</>
	);
};

const mapStateToProps = ({ movieManagement }) => ({
	movieLoading: movieManagement.loading,
	movie: movieManagement.selectedMovie,
	fetchErrorMsg: movieManagement.fetchErrorMessage,
});
const mapDispatchToProps = {
	fetchMovieById,
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
