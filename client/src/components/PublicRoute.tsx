import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PublicRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  // If user is logged in, redirect to home/dashboard
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
