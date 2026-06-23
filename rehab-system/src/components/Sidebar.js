// src/components/Sidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const AdminNav = () => (
  <nav className="sidebar-nav">
    <div className="nav-section-label">Management</div>
    <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <DashIcon /> Overview
    </NavLink>
    <NavLink to="/admin/inmates" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <PeopleIcon /> Inmates
    </NavLink>
    <NavLink to="/admin/goals" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <GoalIcon /> Goals
    </NavLink>
    <NavLink to="/admin/feedback" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <FeedbackIcon /> Feedback
    </NavLink>

    <div className="nav-section-label" style={{ marginTop: 24 }}>Reports</div>
    <NavLink to="/admin/analytics" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <ChartIcon /> Analytics
    </NavLink>
  </nav>
);

const InmateNav = () => (
  <nav className="sidebar-nav">
    <div className="nav-section-label">My Progress</div>
    <NavLink to="/dashboard" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <DashIcon /> Dashboard
    </NavLink>
    <NavLink to="/dashboard/goals" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <GoalIcon /> My Goals
    </NavLink>
    <NavLink to="/dashboard/feedback" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <FeedbackIcon /> Feedback
    </NavLink>
    <NavLink to="/dashboard/progress" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <ChartIcon /> Progress
    </NavLink>
  </nav>
);

const Sidebar = ({ mobileOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="sidebar-inner">
          <div className="sidebar-top">
            {/* Profile pill */}
            <div className="sidebar-profile">
              <div className="sidebar-avatar">
                {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?"}
              </div>
              <div>
                <div className="sidebar-profile-name">{user?.name}</div>
                <div className="sidebar-profile-role">
                  {user?.role === "admin" ? "Correctional Officer" : `ID: ${user?.id}`}
                </div>
              </div>
            </div>

            {/* Navigation */}
            {user?.role === "admin" ? <AdminNav /> : <InmateNav />}
          </div>

          <div className="sidebar-bottom">
            <button className="sidebar-logout" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M7 11l3-3-3-3M10 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// ─── Inline icon components ───────────────────────────────────────────────────
const DashIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9.5" y="1.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1.5" y="9.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9.5" y="9.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const PeopleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 14c0-2.485 2.015-4.5 4.5-4.5S11 11.515 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12.5 9.5c1.657 0 3 1.343 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const GoalIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="1" fill="currentColor"/>
  </svg>
);
const FeedbackIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M2.5 3.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-8l-4 3V4.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const ChartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <path d="M2 13l4-5 3 3 4-6 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Sidebar;
