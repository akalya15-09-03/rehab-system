// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goHome = () => {
    if (!user) navigate("/");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  return (
    <div className="not-found-page">
      <div className="nf-inner">
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page not found</h1>
        <p className="nf-desc">
          The page you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <div className="nf-actions">
          <button className="btn btn-primary btn-lg" onClick={goHome}>
            ← Go to {user ? (user.role === "admin" ? "Admin Panel" : "Dashboard") : "Home"}
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
