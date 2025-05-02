import React, { use, useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Spin, Table, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

const User = () => {
  // sate quản lý loading danh sách người dùng
  const [loading, setLoading] = useState(false);
  // sate quản lý danh sách người dùng
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Nhận values:", values);


    message.success("Tạo người dùng thành công!");
    navigate("/admin/users");
  };
  const handleEdit = (record) => {
    console.log("Chỉnh sửa người dùng:", record);
    // Chuyển hướng đến trang chỉnh sửa người dùng với ID người dùng
    navigate(`/admin/users/edit/${record.id}`);
  };
  const handleDelete = async (userId) => {
    console.log("Xóa người dùng:", userId);
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Lỗi khi xóa người dùng");
      }
      message.success("Xóa người dùng thành công!");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  
  
  ]
 // hàm gọi api lấy danh sách người dùng
 useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Giả lập gọi API để lấy danh sách người dùng
        const response = await fetch("http://localhost:8080/users/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if(!response.ok) {
          throw new Error("Lỗi khi lấy danh sách người dùng");
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
 },[])
  return (
    <div>
    {/* form tạo người dùng */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h2>Create User</h2>
      <Form
        name="create_user"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          role: "USER", 
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="USER">USER</Option>
            <Option value="ADMIN">ADMIN</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create User
          </Button>
        </Form.Item>
      </Form>
      </div>
     

      <div style={{ marginTop: "40px" }}>
        {/* Bảng danh sách người dùng */}
        <h2>User List</h2>
        {loading ? (
          <Spin tip="Loading users..." />
        ) :   (<Table columns={columns} dataSource={users} rowKey="id" /> )   
        }
      </div>
    </div>
    
  );
};

export default User;