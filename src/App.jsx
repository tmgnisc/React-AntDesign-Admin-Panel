import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes - Wrapped with ProtectedRoute */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
          <Route path="/admin/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/admin/edit-user/:id" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/user-details/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
          <Route path="/admin/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
