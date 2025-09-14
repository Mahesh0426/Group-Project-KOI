import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PageLoadingSpinner from "../helper/PageLoadingSpinner";

const RouteGuard = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );
  const location = useLocation();

  // Memoize the role to prevent unnecessary changes
  const role = useMemo(() => {
    return user?.role?.toLowerCase().trim();
  }, [user?.role]); // Only recompute when role changes

  // Memoize path checks
  const isAdminPath = useMemo(() => {
    return location.pathname.startsWith("/admin");
  }, [location.pathname]);

  // Show loading spinner while checking authentication
  if (isLoading) return <PageLoadingSpinner />;

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if user is trying to access a route that matches their role
  if (role === "admin" && !isAdminPath) {
    // Admin trying to access non-admin route - redirect to admin dashboard
    return <Navigate to="/admin/dashboard" replace />;
  } else if (role === "learner" && isAdminPath) {
    // Learner trying to access admin route - redirect to learner dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Additional check for other roles if needed
  if (role && role !== "admin" && role !== "learner" && isAdminPath) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
