import { Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/admin-login") ||
      location.pathname.includes("/admin-login")
    )
  ) {
    return <Navigate to="/admin-login" />;
  }

  if (isAuthenticated && location.pathname.includes("/admin-login")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
