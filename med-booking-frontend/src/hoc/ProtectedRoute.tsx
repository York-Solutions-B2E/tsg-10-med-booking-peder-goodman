import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  // requiredRoles is an array of roles that are allowed to access the route
  const { requiredRole } = props;

  const userRole = useSelector(
    (state: RootState) => state.user.userDetails?.role
  );

  // if the userRole is not falsy or userRole is the wrong role, redirect to the home page
  if (!userRole || userRole != requiredRole) {
    return <Navigate to="/home" replace />;
  }

  // otherwise, render the component
  return <Outlet />;
};
