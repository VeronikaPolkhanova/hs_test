import React, { useState } from "react";
import { Form, Button, Input, Row, Col, message } from "antd";
import { ROW_GUTTER } from "constants/ThemeConstant";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const EditUser = ({ user, setUsers, closeUserProfile }) => {
  const [selectedUser, setSelectedUser] = useState(user);

  const onFinish = (values) => {
    const key = "updatable";
    message.loading({ content: "Updating...", key });
    setTimeout(() => {
      const editedUser = {
        name: values.name,
        email: values.email,
        username: values.username,
        phone: values.phone,
        website: values.website,
      };

      setSelectedUser(editedUser);
      setUsers((prev) => {
        const newData = prev.filter(({ id }) => id !== selectedUser.id);
        return [{ ...selectedUser, ...editedUser }, ...newData];
      });
      message.success({ content: "Done!", key, duration: 2 });
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { name, email, username, phone, website } = selectedUser;

  return (
    <>
      <Button
        icon={<ArrowLeftOutlined />}
        className="mb-4"
        onClick={closeUserProfile}
      />
      <Form
        name="basicInformation"
        layout="vertical"
        initialValues={{
          name: name,
          email: email,
          username: username,
          phone: phone,
          website: website,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={16}>
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Phone Number" name="phone">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Website" name="website">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Save Change
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
