import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { UserContext } from "./authContext";

const RequireAuth = (props) => {
  const location = useLocation();
  const currentUser = React.useContext(UserContext);
  if (currentUser?.roleId === 1) {
    return props.children;
  }
  return <Navigate to="*" state={{ from: location }} />;
};

export default RequireAuth;
