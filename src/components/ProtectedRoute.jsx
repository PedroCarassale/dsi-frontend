import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../store/slices/auth/authSelector";

function ProtectedRoute({ children }) {
  const token = useSelector(getToken);

  // Si no hay token en Redux ni en localStorage, redirigir a login
  if (!token && !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

