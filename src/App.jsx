import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import AuthLayout from "./AuthLayout/AuthLayout";
import MainLayout from "./MainLayout/MainLayout";
import UserSettings from "./pages/user/UserSettings";
import AddUser from "./pages/user/AddUser";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Login from "./AuthLayout/Login";
import NotFound from "./pages/NotFound";
import UserList from "./pages/user/UserList";
import UserDetails from "./pages/user/UserDetails";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from API
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUsers(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserList users={users} loading={loading} />} />
          <Route path="/admin/settings" element={<UserSettings users={users} setUsers={setUsers} loading={loading} />} />
          <Route path="/admin/add-user" element={<AddUser users={users} setUsers={setUsers} />} />
          <Route path="/admin/edit-user/:id" element={<AddUser users={users} setUsers={setUsers} />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/admin/logout" element={<Logout />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
