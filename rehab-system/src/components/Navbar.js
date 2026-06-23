// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Mobile hamburger */}
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <div className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#1B4F8A"/>
            <path d="M8 14C8 10.686 10.686 8 14 8s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6Z" fill="none" stroke="#22A66B" strokeWidth="2"/>
            <path d="M11 14l2.5 2.5L17 11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <span className="navbar-brand">RehabSystem</span>
            <span className="navbar-facility">State Correctional Facility</span>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-role-badge">
          {user?.role === "admin" ? "Admin Panel" : "Inmate Portal"}
        </div>

        <div className="navbar-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role === "admin" ? "Officer" : "Inmate"}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`chevron ${dropdownOpen ? "open" : ""}`}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <span>{user?.name}</span>
                <span className="dropdown-id">ID: {user?.id}</span>
              </div>
              <button className="dropdown-item" onClick={() => { setDropdownOpen(false); navigate(user?.role === "admin" ? "/admin" : "/dashboard"); }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
                Dashboard
              </button>
              <button className="dropdown-item danger" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M7 11l3-3-3-3M10 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
