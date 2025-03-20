import { useUser } from "../context/UserContext";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";

const Header = () => {
  const { user, logoutUser } = useUser();

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={logoutUser}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md">
      
      <img src={logo} alt="Logo" className="h-10 w-auto" />

      
      {user ? (
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span>{user.name}</span>
          </div>
        </Dropdown>
      ) : (
        <span>Guest</span>
      )}
    </header>
  );
};

export default Header;
