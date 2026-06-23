// src/components/StatCard.js
import React from "react";
import "./StatCard.css";

const StatCard = ({ label, value, sub, color, icon, trend }) => (
  <div className="stat-card card">
    <div className="stat-card-header">
      <span className="stat-label">{label}</span>
      {icon && (
        <div className="stat-icon" style={{ background: `${color}18`, color }}>
          {icon}
        </div>
      )}
    </div>
    <div className="stat-value" style={{ color }}>{value}</div>
    {sub && <div className="stat-sub">{sub}</div>}
    {trend && (
      <div className={`stat-trend ${trend > 0 ? "up" : trend < 0 ? "down" : "stable"}`}>
        {trend > 0 ? "▲" : trend < 0 ? "▼" : "─"}
        {" "}{Math.abs(trend)} pts from last week
      </div>
    )}
  </div>
);

export default StatCard;
