import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PageLoadingSpinner from "../helper/PageLoadingSpinner";

const RouteGuard = ({ element }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const isAuthenticated = user?._id;
  const location = useLocation();

  // If loading, return the centered spinner
  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  // Redirect instructors to the  / instructor
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/home" replace />;
  }

  // Instructors: Redirect to /instructor if they access non-instructor routes
  if (user?.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  // Redirect regular users to the home page if they try to access restricted routes
  if (user?.role === "user" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/home" replace />;
  }
  return <>{element}</>;
};

export default RouteGuard;
