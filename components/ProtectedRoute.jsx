import { useSelector } from "react-redux";
import { getToken } from "../src/store/slices/auth/authSelector";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = useSelector(getToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
