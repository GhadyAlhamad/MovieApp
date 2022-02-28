import React from "react";
import { Navigate } from "react-router-dom";
import { IAuthRouteProps } from "../interfaces/page.interface";

const UnAuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  // read user
  const currentUser = JSON.parse(localStorage.getItem("user") as string);

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};

export default UnAuthRoute;
