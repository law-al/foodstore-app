import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(isAuthenticated, user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
