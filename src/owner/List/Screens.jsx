import {
  Table,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Radio,
} from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import {
  createScreen,
  fetchScreens,
  editScreen,
} from "../../redux/action/screenAction";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SELECTED_SCREEN } from "../../helpers/constant";
const Screens = ({
  screens,
  errorMsg,
  selected,
  createScreen,
  fetchScreens,
  editScreen,
  selectedScreen,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Catetogories",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Normal Price",
      dataIndex: "nPrice",
      key: "nPrice",
    },
    {
      title: "Premium Price",
      dataIndex: "pPrice",
      key: "pPrice",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
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
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                debugger;
                console.log(data);
                setMode("Edit");
                selectedScreen(data);
                setVisible(true);
              }}
            />
          </Col>
        </Row>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("Add");
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
    fetchScreens();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    mode === "Add" ? createScreen(values) : editScreen(values);
    setVisible(false);
  };
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col align="end" span={24} style={{ padding: "50px 50px 0px" }}>
          <Button onClick={() => setVisible(true)}>Add+</Button>
        </Col>
        <Col span={24} style={{ padding: "50px" }}>
          <Table dataSource={screens} columns={columns} />
        </Col>
      </Row>
      <Modal
        title="Add Screen"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={null}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your Screen Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
            <Typography.Text type="secondary">
              Category - Normal
            </Typography.Text>
            <span>
              <Form.Item
                name="adultNormal"
                label="Adult"
                rules={[
                  {
                    required: true,
                    message: "Please input Adult pricing!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="childNormal"
                label="Child"
                rules={[
                  {
                    required: true,
                    message: "Please input Child pricing!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </span>
          </div>
          <div>
            <Typography.Text type="secondary">
              Category - Premium
            </Typography.Text>
            <span>
              <Form.Item
                name="adultPremium"
                label="Adult"
                rules={[
                  {
                    required: true,
                    message: "Please input Adult pricing!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="childPremium"
                label="Child"
                rules={[
                  {
                    required: true,
                    message: "Please input Child pricing!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </span>
          </div>
          <Form.Item name="size" label="Size of Hall">
            <Radio.Group>
              <Radio value="small">Small</Radio>
              <Radio value="large">Large</Radio>
            </Radio.Group>
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

const mapStateToProps = ({ screen: { screens, errorMsg, selected } }) => ({
  screens,
  errorMsg,
  selected,
});
export default connect(mapStateToProps, {
  createScreen,
  fetchScreens,
  editScreen,
  selectedScreen: (data) => ({ type: SELECTED_SCREEN, payload: data }),
})(Screens);
