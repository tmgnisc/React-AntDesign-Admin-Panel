import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isAuthenticated");

    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
