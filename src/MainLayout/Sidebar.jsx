import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="bg-gray-200 w-1/4 p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-red-700 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-red-700 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaUser /> User Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/logout"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive ? "bg-red-700 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaSignOutAlt /> Logout
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
