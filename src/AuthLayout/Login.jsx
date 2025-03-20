import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Button, Card } from "antd";
import { useUser } from "../context/UserContext";
import { fetchUsers } from "../utils/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleLogin = async (values) => {
    setLoading(true);
  
    try {
      // Fetch users from API
      const users = await fetchUsers();
      
      // Find the user from the fetched users
      const foundUser = users.find(
        (user) =>
          user.email.trim().toLowerCase() === values.email.trim().toLowerCase() &&
          user.password === values.password
      );
  
      if (foundUser) {
        toast.success("Login Successful", { autoClose: 1500 });
  
        // Save the user in context and localStorage
        loginUser(foundUser);  // This updates the context
  
        // Store user in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(foundUser));
  
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        toast.error("Invalid credentials", { autoClose: 2000 });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error logging in");
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="Login" className="w-96 shadow-lg">
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>
      </Card>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
