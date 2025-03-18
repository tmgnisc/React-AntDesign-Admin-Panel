import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 

const UserDetails = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [id]); 

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {user ? (
        <div>
          <h2 className="text-2xl font-bold">User Details</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
