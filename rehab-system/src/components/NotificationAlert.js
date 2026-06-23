// src/components/NotificationAlert.js
import React, { useState } from "react";
import "./NotificationAlert.css";

const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#22A66B" strokeWidth="1.5"/>
      <path d="M6 9l2.5 2.5L12 6" stroke="#22A66B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L1.5 15h15L9 2Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 8v3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="13" r="0.8" fill="#F59E0B"/>
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#3B82F6" strokeWidth="1.5"/>
      <path d="M9 8v5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="5.5" r="0.8" fill="#3B82F6"/>
    </svg>
  ),
  danger: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="#EF4444" strokeWidth="1.5"/>
      <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const NotificationAlert = ({ notifications, loading }) => {
  const [dismissed, setDismissed] = useState(new Set());

  const visible = notifications?.filter((n) => !dismissed.has(n.id));

  if (loading || !visible || visible.length === 0) return null;

  return (
    <div className="notification-stack">
      {visible.slice(0, 4).map((n) => (
        <div key={n.id} className={`notification-item notif-${n.type}`}>
          <span className="notif-icon">{ICONS[n.type] || ICONS.info}</span>
          <div className="notif-body">
            <p className="notif-message">{n.message}</p>
            <span className="notif-date">{n.date}</span>
          </div>
          <button
            className="notif-dismiss"
            onClick={() => setDismissed((prev) => new Set([...prev, n.id]))}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationAlert;
