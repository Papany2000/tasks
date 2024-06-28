import { useLocation, Navigate } from "react-router-dom";
import React from "react";
import { UserContext } from "./authContext";

const RequireAuth = (props) => {
  const location = useLocation();
  const currentUser = React.useContext(UserContext);
console.log(56, currentUser.roleId)
  if (currentUser.roleId === 1) {
    return props.children;
  }
  return <Navigate to="*" state={{ from: location }} />;
};

export default RequireAuth;
