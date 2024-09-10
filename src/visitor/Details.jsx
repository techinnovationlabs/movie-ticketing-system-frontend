import { Row, Col, Typography, Rate, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { HeartFilled } from "@ant-design/icons";

import "./visitor.css";
import { submitReview } from "../redux/action/movieAction";
import { REFRESH_REVIEW } from "../helpers/constant";
const Details = ({
  movie,
  user,
  submitReview,
  reviewPosted,
  errorMsg,
  refreshReview,
}) => {
  const [star, setStar] = useState();
  const [review, setReview] = useState();

  const submit = async () => {
    debugger;
    const body = {
      user: user._id,
      movie: movie._id,
      rating: star,
      comments: review,
    };
    submitReview(body);
  };

  useEffect(() => {
    if (reviewPosted !== null) {
      reviewPosted
        ? message.success("Review posted!!")
        : message.error(errorMsg);
      refreshReview();
    }
  }, [reviewPosted]);
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col span={6} align="center" className="overall-spacing">
            <img src={movie.poster} />
          </Col>
          <Col span={18}>
            <div className="movie-title">
              <Typography.Title>{movie.title}</Typography.Title>
              <Typography.Text type="secondary">
                {movie.description}
              </Typography.Text>
            </div>
            <div className="top-spacing">
              <HeartFilled className="fav-color" />
              <span>
                {parseInt(
                  movie.totalRatings / ((movie.totalReviews * 5) / 100)
                )}
                %
              </span>
              <span className="overall-spacing">{movie.avgRating} Ratings</span>
              <span>
                <Rate disabled allowHalf defaultValue={movie.avgRating} />
              </span>
            </div>
            <div className="top-spacing">
              <Typography.Title
                level={4}
              >{`Add your Ratings & Review`}</Typography.Title>
            </div>
            <Rate
              allowHalf
              value={star}
              defaultValue={0}
              onChange={(val) => {
                setStar(val);
              }}
            />
            <Input.TextArea
              className="text-area"
              placeholder="Write your review"
              onChange={({ target: { value } }) => setReview(value)}
            />
            <Button type="primary" className="button" onClick={submit}>
              Submit Review
            </Button>
            <div className="top-spacing">
              <Typography.Title level={4}>About the movie</Typography.Title>
              <div className="overall-spacing">
                <Typography.Text type="secondary">
                  {movie.summary}
                </Typography.Text>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={{ xs: 8, sm: 14, md: 18, lg: 24 }} className="top-spacing">
          <Col span={24} align="center" className="overall-spacing">
            <Typography.Title level={4}>Watch Trailer</Typography.Title>
          </Col>
          <Col span={4}></Col>
          <Col span={16} className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={movie.trailer}
              width="100%"
              height="100%"
              controls={true}
              light={true}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({
  movie: { selected, reviewPosted, errorMsg },
  auth: { user },
}) => ({
  movie: selected,
  reviewPosted,
  errorMsg,
  user,
});
export default connect(mapStateToProps, {
  submitReview,
  refreshReview: () => ({
    type: REFRESH_REVIEW,
  }),
})(Details);
