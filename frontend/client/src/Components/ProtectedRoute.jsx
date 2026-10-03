import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../context/authContext";
import { useContext } from "react";
    
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation();// this preserves from where i am coming

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;