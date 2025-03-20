import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Button, Card } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { username, password } = values;

    if (username === "admin" && password === "admin") {
      toast.success("Login Success", { autoClose: 2000 });
      setLoading(true);
      
      
      localStorage.setItem("isAuthenticated", "true");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } else {
      toast.error("Invalid credentials", { autoClose: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="Login" className="w-96 shadow-lg">
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter username" />
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
