// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const features = [
  { icon: "📊", title: "Behavior Scoring", desc: "Track discipline, participation, task completion, and attitude across a 40-point scale with real-time updates." },
  { icon: "🎯", title: "Goal Management", desc: "Officers assign structured rehabilitation goals. Inmates track their progress step by step." },
  { icon: "💬", title: "Officer Feedback", desc: "Direct written feedback from correctional officers keeps the rehabilitation process transparent and personal." },
  { icon: "📈", title: "Progress Analytics", desc: "Visual charts show behavior trends over weeks and months — motivating continuous improvement." },
  { icon: "🔔", title: "Smart Alerts", desc: "Automatic notifications when scores improve, goals are completed, or attention is needed." },
  { icon: "🔒", title: "Secure Access", desc: "Role-based login ensures inmates and officers each see only what's relevant to their role." },
];

const stats = [
  { value: "148", label: "Active Inmates" },
  { value: "312", label: "Goals Assigned" },
  { value: "89%", label: "Improvement Rate" },
  { value: "26.4", label: "Avg. Score / 40" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* ── Top bar ── */}
      <header className="home-header">
        <div className="home-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#1B4F8A"/>
            <path d="M9 16a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z" stroke="#22A66B" strokeWidth="2"/>
            <path d="M12.5 16l3 3 4-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <span className="home-brand">RehabSystem</span>
            <span className="home-facility">State Correctional Facility</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Sign In →
        </button>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">Rehabilitation & Behavior Improvement</div>
          <h1 className="hero-title">
            A clearer path<br />
            <span className="hero-title-accent">toward change.</span>
          </h1>
          <p className="hero-desc">
            A structured digital system that helps correctional officers track, guide, and improve
            inmate behavior — and empowers inmates to take ownership of their rehabilitation journey.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/login")}>
              Get Started
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
              Learn More
            </button>
          </div>
        </div>

        {/* Hero visual — score preview */}
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hc-header">
              <div className="hc-avatar">JH</div>
              <div>
                <div className="hc-name">James Hartley</div>
                <div className="hc-id">ID: INM-001 · Cell B-12</div>
              </div>
              <span className="badge badge-success" style={{ marginLeft: "auto" }}>↑ Improving</span>
            </div>
            <div className="hc-score-row">
              <div className="hc-score-big">32<span>/40</span></div>
              <div className="hc-score-label">Behavior Score</div>
            </div>
            {[
              { label: "Discipline",     val: 8,  color: "#1B4F8A" },
              { label: "Participation",  val: 9,  color: "#22A66B" },
              { label: "Task Completion",val: 7,  color: "#F59E0B" },
              { label: "Attitude",       val: 8,  color: "#8B5CF6" },
            ].map(({ label, val, color }) => (
              <div className="hc-bar-row" key={label}>
                <span>{label}</span>
                <div className="hc-bar-track">
                  <div className="hc-bar-fill" style={{ width: `${val * 10}%`, background: color }} />
                </div>
                <span>{val}/10</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="stats-strip">
        {stats.map(({ value, label }) => (
          <div className="stat-item" key={label}>
            <span className="stat-num">{value}</span>
            <span className="stat-lbl">{label}</span>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <div className="section-header" style={{ flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2>Everything needed for structured rehabilitation</h2>
          <p style={{ color: "var(--color-text-muted)", marginTop: 8, maxWidth: 520 }}>
            Built for both correctional officers and inmates — two views of the same mission.
          </p>
        </div>
        <div className="features-grid">
          {features.map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="roles-section">
        <div className="role-card admin-role">
          <div className="role-badge">Officer / Admin</div>
          <h3>Manage your unit from one panel</h3>
          <p>Add and monitor inmates, assign rehabilitation goals, log feedback after each interaction, and view facility-wide performance analytics.</p>
          <button className="btn btn-primary" onClick={() => navigate("/login")}>Admin Login →</button>
        </div>
        <div className="role-card inmate-role">
          <div className="role-badge">Inmate</div>
          <h3>Own your rehabilitation journey</h3>
          <p>Check your behavior score, review assigned goals, read officer feedback, and see your progress week over week on your personal dashboard.</p>
          <button className="btn btn-accent" onClick={() => navigate("/login")}>Inmate Login →</button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} RehabSystem — State Correctional Facility</p>
        <p style={{ fontSize: 12, color: "var(--color-text-light)", marginTop: 4 }}>
          Confidential system. Authorized personnel only.
        </p>
      </footer>
    </div>
  );
};

export default Home;
