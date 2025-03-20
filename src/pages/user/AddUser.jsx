import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { addUser, updateUser } from "../../utils/api"; 

const { Option } = Select;

const AddUser = ({ users, setUsers }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const userToEdit = users.find((user) => user.id.toString() === id);
      if (userToEdit) {
        form.setFieldsValue(userToEdit);
      }
    }
  }, [id, users, form]);

  const handleSubmit = async (values) => {
    try {
      if (isEditing) {
        // Update user
        await updateUser(id, values);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id.toString() === id ? { ...user, ...values } : user
          )
        );
      } else {
        // Add new user
        const newUser = { id: uuidv4(), ...values };
        await addUser(newUser);
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }
      navigate("/admin/settings");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-6 bg-white shadow-md ml-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          {isEditing ? "Edit User" : "Add User"}
        </h2>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={<span className="text-red-600">Name</span>}
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label={<span className="text-red-600">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label={<span className="text-red-600">Role</span>}
            name="role"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select placeholder="Select role">
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-red-500 hover:bg-red-600 border-none"
            >
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
