import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { fetchMovies, selectedMovie } from "../redux/action/movieAction";
import { useHistory } from "react-router";
import { connect } from "react-redux";

const { Meta } = Card;
const MoviesList = ({ fetchMovies, movies, selectedMovie }) => {
  const history = useHistory();
  useEffect(() => {
    fetchMovies();
  }, []);

  const movieDetails = (movie) => {
    selectedMovie(movie);
    history.push({
      pathname: "/details",
      search: `?movie=${movie.title}`,
    });
  };
  return (
    <Row>
      {movies.map((movie) => (
        <Col
          xs={24}
          lg={8}
          align="center"
          style={{ padding: 50 }}
          onClick={() => movieDetails(movie)}
        >
          <Card
            hoverable
            style={{ width: 350 }}
            cover={<img alt="example" src={movie.poster} />}
          >
            <Meta title={movie.title} description={movie.description} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
const mapStateToProps = ({ movie: { movies, errorMsg } }) => ({
  movies,
  errorMsg: errorMsg,
});
export default connect(mapStateToProps, { fetchMovies, selectedMovie })(
  MoviesList
);
