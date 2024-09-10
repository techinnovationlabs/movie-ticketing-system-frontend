import { Table, Row, Col, Button, Modal, Form, Input, Select } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { fetchScreens } from "../../redux/action/screenAction";
import { fetchMovies } from "../../redux/action/movieAction";
import {
  createShow,
  fetchShows,
  fetchTimings,
} from "../../redux/action/showAction";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const ShowTimings = ({
  screens,
  movies,
  createShow,
  fetchScreens,
  fetchShows,
  fetchMovies,
  fetchTimings,
  shows,
  showTimings,
}) => {
  const columns = [
    {
      title: "Movie",
      dataIndex: "movie",
      key: "movie",
      render: (movie) => movie.title,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => time.time,
    },
    {
      title: "Screen",
      dataIndex: "screen",
      key: "screen",
      render: (screen) => screen.name,
    },
    {
      title: "Available seats",
      dataIndex: "availableSeats",
      key: "availableSeats",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (data) => (
        <Row>
          <Col>
            <Button icon={<EyeOutlined />} />
          </Col>
          <Col>
            <Button icon={<EditOutlined />} />
          </Col>
        </Row>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  useEffect(() => {
    fetchMovies();
    fetchScreens();
    fetchTimings();
    fetchShows();
  }, []);
  const onFinish = (values) => {
    console.log(values);
    createShow(values);
    setVisible(false);
  };
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col align="end" span={24} style={{ padding: "50px 50px 0px" }}>
          <Button onClick={() => setVisible(true)}>Add+</Button>
        </Col>
        <Col span={24} style={{ padding: "50px" }}>
          <Table dataSource={shows} columns={columns} />
        </Col>
      </Row>
      <Modal
        title="Add Show"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="show"
          onFinish={onFinish}
          initialValues={null}
          scrollToFirstError
        >
          <Form.Item
            name="movie"
            label="Movie"
            rules={[
              {
                required: true,
                message: "Please select Movies!",
              },
            ]}
          >
            <Select placeholder="Please select Movie">
              {movies.map((movie) => (
                <Select.Option value={movie._id}>{movie.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="screen"
            label="Screen"
            rules={[
              {
                required: true,
                message: "Please select Screen!",
              },
            ]}
          >
            <Select placeholder="Please select Screen">
              {screens.map((screen) => (
                <Select.Option value={screen.key}>{screen.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="time"
            label="Show Time"
            rules={[
              {
                required: true,
                message: "Please select Show time!",
              },
            ]}
          >
            <Select placeholder="Please select Show time">
              {showTimings.map((time) => (
                <Select.Option value={time._id}>{time.time}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your Show Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  screen: { screens },
  movie: { movies },
  show: { shows, showTimings },
}) => ({
  screens,
  movies,
  shows,
  showTimings,
});
export default connect(mapStateToProps, {
  fetchScreens,
  fetchMovies,
  fetchTimings,
  createShow,
  fetchShows,
})(ShowTimings);
