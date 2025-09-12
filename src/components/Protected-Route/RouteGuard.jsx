import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PageLoadingSpinner from "../helper/PageLoadingSpinner";

const RouteGuard = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );
  const location = useLocation();

  if (isLoading) return <PageLoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const role = user?.role?.toLowerCase().trim();

  if (role === "admin") {
    if (!location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  } else if (role === "user") {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default RouteGuard;
