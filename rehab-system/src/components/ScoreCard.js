// src/components/ScoreCard.js
import React from "react";
import "./ScoreCard.css";

const MAX_EACH = 10;

const categories = [
  { key: "discipline",      label: "Discipline",       color: "#1B4F8A", icon: "⚖️" },
  { key: "participation",   label: "Participation",    color: "#22A66B", icon: "🤝" },
  { key: "taskCompletion",  label: "Task Completion",  color: "#F59E0B", icon: "✅" },
  { key: "attitude",        label: "Attitude",         color: "#8B5CF6", icon: "🌱" },
];

const getRating = (total) => {
  if (total >= 35) return { label: "Excellent", cls: "excellent" };
  if (total >= 28) return { label: "Good",      cls: "good" };
  if (total >= 20) return { label: "Fair",      cls: "fair" };
  return               { label: "Needs Work",  cls: "poor" };
};

const ScoreCard = ({ score, loading }) => {
  if (loading) {
    return (
      <div className="score-card card">
        <div className="spinner-wrapper"><div className="spinner" /></div>
      </div>
    );
  }

  if (!score) return null;

  const total = score.total || 0;
  const pct   = Math.round((total / 40) * 100);
  const rating = getRating(total);

  return (
    <div className="score-card card">
      <div className="card-title">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1l2.163 5.568H17L12.418 9.9l1.746 5.568L9 12.135l-5.164 3.333 1.746-5.568L1 6.568h5.837L9 1Z" stroke="#1B4F8A" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        Behavior Score
      </div>

      {/* Big ring */}
      <div className="score-ring-wrapper">
        <svg className="score-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10"/>
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke={total >= 28 ? "#22A66B" : total >= 20 ? "#F59E0B" : "#EF4444"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="score-ring-center">
          <span className="score-number">{total}</span>
          <span className="score-denom">/40</span>
          <span className={`score-rating-label ${rating.cls}`}>{rating.label}</span>
        </div>
      </div>

      {/* Breakdown bars */}
      <div className="score-breakdown">
        {categories.map(({ key, label, color, icon }) => {
          const val = score[key] || 0;
          const barPct = (val / MAX_EACH) * 100;
          return (
            <div className="score-row" key={key}>
              <div className="score-row-label">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
              <div className="score-bar-track">
                <div
                  className="score-bar-fill"
                  style={{ width: `${barPct}%`, background: color }}
                />
              </div>
              <span className="score-row-val">{val}<span className="score-row-max">/10</span></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreCard;
