import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";
const UserDetails = () => {
  const { user } = useContext(authContext);
  if (!user) {
    return <p>No user details available.</p>;
  }

  return (
    <section>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </section>
  );
};

export default UserDetails;