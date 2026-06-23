// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wraps routes that require authentication.
 * Optionally restrict to a specific role: <ProtectedRoute role="admin">
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="spinner-wrapper" style={{ minHeight: "100vh" }}>
        <div className="spinner" />
        <span style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Loading…</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Redirect to the correct dashboard for the actual role
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
};

export default ProtectedRoute;
