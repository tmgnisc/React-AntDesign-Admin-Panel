import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Modal } from "antd";

const UserList = ({ users, loading, handleDelete }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const showDeleteConfirm = (userID) => {
    setSelectedUserId(userID);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleDelete(selectedUserId);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/user-details/${record.id}`)}
        >
          {record.name}
        </Button>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", align: "center" },
    { title: "Role", dataIndex: "role", key: "role", align: "center" },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => navigate(`/admin/edit-user/${record.id}`)}
          >
            Edit
          </Button>

          <Button
            type="primary"
            danger
            onClick={() => showDeleteConfirm(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">User List</h2>
        <Button type="primary" onClick={() => navigate("/admin/add-user")}>
          Add User
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Delete"
        okType="danger"
        cancelText="No, Cancel"
        centered
      >
        <p>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default UserList;
