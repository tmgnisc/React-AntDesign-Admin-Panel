import { useEffect, useState } from "react";

import axios from "axios";
import UserList from "./UserList";

const UserSettings = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all data
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        console.log("API Response:", response.data);
        setUsers(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (userID) => {
    try {
      await axios.delete(`http://localhost:4000/users/${userID}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userID));

      console.log("User deleted with ID:", userID);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <UserList
        users={users}
        setUsers={setUsers}
        loading={loading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserSettings;
