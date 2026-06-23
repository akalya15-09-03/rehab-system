// src/components/FeedbackPanel.js
import React from "react";
import "./FeedbackPanel.css";

const TYPE_META = {
  positive: { cls: "fb-positive", icon: "👍", label: "Positive"  },
  neutral:  { cls: "fb-neutral",  icon: "📋", label: "Note"      },
  warning:  { cls: "fb-warning",  icon: "⚠️", label: "Warning"   },
  negative: { cls: "fb-negative", icon: "🚨", label: "Concern"   },
};

const FeedbackCard = ({ item }) => {
  const meta = TYPE_META[item.type] || TYPE_META.neutral;

  return (
    <div className={`feedback-card ${meta.cls}`}>
      <div className="fb-header">
        <div className="fb-left">
          <span className="fb-icon">{meta.icon}</span>
          <div>
            <span className="fb-officer">{item.officer}</span>
            <span className={`badge ${
              item.type === "positive" ? "badge-success" :
              item.type === "warning"  ? "badge-warning" :
              item.type === "negative" ? "badge-danger"  : "badge-neutral"
            }`} style={{ marginLeft: 8 }}>{meta.label}</span>
          </div>
        </div>
        <span className="fb-date">{item.date}</span>
      </div>
      <p className="fb-message">{item.message}</p>
    </div>
  );
};

const FeedbackPanel = ({ feedback, loading, compact }) => {
  const items = compact ? feedback?.slice(0, 3) : feedback;

  return (
    <div className="feedback-panel card">
      <div className="card-title">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 3.5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-4 3.5V4.5a1 1 0 0 1 1-1Z" stroke="#1B4F8A" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        Officer Feedback
        {feedback && <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--color-text-muted)", fontWeight: 400 }}>{feedback.length} entries</span>}
      </div>

      {loading && <div className="spinner-wrapper"><div className="spinner" /></div>}

      {!loading && (!items || items.length === 0) && (
        <div className="empty-state">
          <p>No feedback recorded yet.</p>
        </div>
      )}

      {!loading && items && (
        <div className="feedback-list">
          {items.map((fb) => (
            <FeedbackCard key={fb.id} item={fb} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPanel;
