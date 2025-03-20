import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserDetails } from "../../utils/api"; 

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchUserDetails(id);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

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
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
