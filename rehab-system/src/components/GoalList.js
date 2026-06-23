// src/components/GoalList.js
import React, { useState } from "react";
import "./GoalList.css";

const STATUS_META = {
  "completed":   { label: "Completed",   cls: "badge-success" },
  "in-progress": { label: "In Progress", cls: "badge-info"    },
  "not-started": { label: "Not Started", cls: "badge-neutral" },
  "overdue":     { label: "Overdue",     cls: "badge-danger"  },
};

const CATEGORY_COLORS = {
  "Mental Health": "#8B5CF6",
  "Education":     "#3B82F6",
  "Vocational":    "#F59E0B",
  "Behavior":      "#EF4444",
  "Community":     "#22A66B",
};

const GoalItem = ({ goal }) => {
  const [expanded, setExpanded] = useState(false);
  const meta = STATUS_META[goal.status] || STATUS_META["not-started"];
  const catColor = CATEGORY_COLORS[goal.category] || "#6B7280";

  return (
    <div className={`goal-item ${expanded ? "expanded" : ""}`}>
      <div className="goal-item-header" onClick={() => setExpanded(!expanded)}>
        <div className="goal-left">
          <div className="goal-category-dot" style={{ background: catColor }} />
          <div>
            <div className="goal-title">{goal.title}</div>
            <div className="goal-meta-row">
              <span className="goal-category" style={{ color: catColor }}>{goal.category}</span>
              <span className="goal-sep">·</span>
              <span className="goal-by">Assigned by {goal.assignedBy}</span>
              <span className="goal-sep">·</span>
              <span className="goal-deadline">Due {goal.deadline}</span>
            </div>
          </div>
        </div>
        <div className="goal-right">
          <span className={`badge ${meta.cls}`}>{meta.label}</span>
          <svg className={`goal-chevron ${expanded ? "open" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Progress bar always visible */}
      <div className="goal-progress-bar">
        <div
          className="goal-progress-fill"
          style={{ width: `${goal.progress}%`, background: catColor }}
        />
      </div>
      <div className="goal-progress-pct">{goal.progress}% complete</div>

      {/* Expanded details */}
      {expanded && (
        <div className="goal-details">
          <p className="goal-description">{goal.description}</p>
        </div>
      )}
    </div>
  );
};

const GoalList = ({ goals, loading, compact }) => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? goals
    : goals?.filter((g) => g.status === filter);

  return (
    <div className="goal-list card">
      <div className="card-title" style={{ marginBottom: 0 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="#1B4F8A" strokeWidth="1.5"/>
          <circle cx="9" cy="9" r="3.5" stroke="#1B4F8A" strokeWidth="1.5"/>
          <circle cx="9" cy="9" r="1" fill="#1B4F8A"/>
        </svg>
        My Goals
        {goals && <span className="goal-count">{goals.length}</span>}
      </div>

      {!compact && (
        <div className="goal-filters">
          {["all", "in-progress", "completed", "not-started"].map((s) => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? "active" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s === "all" ? "All" : STATUS_META[s]?.label}
            </button>
          ))}
        </div>
      )}

      {loading && <div className="spinner-wrapper"><div className="spinner" /></div>}

      {!loading && (!filtered || filtered.length === 0) && (
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3>No goals found</h3>
          <p>Goals assigned to you will appear here.</p>
        </div>
      )}

      {!loading && filtered && (
        <div className="goal-items">
          {(compact ? filtered.slice(0, 3) : filtered).map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalList;
