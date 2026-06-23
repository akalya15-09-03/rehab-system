// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ScoreCard from "../components/ScoreCard";
import ProgressChart from "../components/ProgressChart";
import GoalList from "../components/GoalList";
import FeedbackPanel from "../components/FeedbackPanel";
import NotificationAlert from "../components/NotificationAlert";
import StatCard from "../components/StatCard";
import { fetchScore, fetchGoals, fetchFeedback, fetchNotifications } from "../services/api";
import "./Dashboard.css";

// ─── Sub-pages ────────────────────────────────────────────────────────────────
const DashboardGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals(user?.id).then(setGoals).finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="page-body">
      <div className="section-header">
        <h2>My Goals</h2>
        <span className="badge badge-info">{goals?.length || 0} total</span>
      </div>
      <GoalList goals={goals} loading={loading} />
    </div>
  );
};

const DashboardFeedback = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchFeedback(user?.id).then(setFeedback).finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="page-body">
      <div className="section-header"><h2>Officer Feedback</h2></div>
      <FeedbackPanel feedback={feedback} loading={loading} />
    </div>
  );
};

const DashboardProgress = () => {
  const { user } = useAuth();
  return (
    <div className="page-body">
      <div className="section-header"><h2>My Progress</h2></div>
      <ProgressChart inmateId={user?.id} />
    </div>
  );
};

// ─── Main Dashboard Overview ──────────────────────────────────────────────────
const DashboardHome = () => {
  const { user } = useAuth();
  const [score,         setScore]         = useState(null);
  const [goals,         setGoals]         = useState(null);
  const [feedback,      setFeedback]      = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [loadScore,     setLoadScore]     = useState(true);
  const [loadGoals,     setLoadGoals]     = useState(true);
  const [loadFeedback,  setLoadFeedback]  = useState(true);

  useEffect(() => {
    const id = user?.id;
    fetchScore(id).then(setScore).finally(() => setLoadScore(false));
    fetchGoals(id).then(setGoals).finally(() => setLoadGoals(false));
    fetchFeedback(id).then(setFeedback).finally(() => setLoadFeedback(false));
    fetchNotifications(id).then(setNotifications);
  }, [user]);

  const completedGoals  = goals?.filter((g) => g.status === "completed").length || 0;
  const inProgressGoals = goals?.filter((g) => g.status === "in-progress").length || 0;

  return (
    <div className="page-body">
      {/* Greeting */}
      <div className="dash-greeting">
        <div>
          <h1>Good day, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="dash-sub">Here's your rehabilitation progress overview.</p>
        </div>
        <div className="dash-id-pill">
          ID: {user?.id}
        </div>
      </div>

      {/* Notifications */}
      <NotificationAlert notifications={notifications} />

      {/* Stat row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard label="Behavior Score"    value={score?.total ?? "—"} sub="out of 40"           color="#1B4F8A" icon="⭐" trend={2} />
        <StatCard label="Goals Completed"   value={completedGoals}      sub="goals finished"       color="#22A66B" icon="✅" />
        <StatCard label="In Progress"        value={inProgressGoals}    sub="active goals"         color="#F59E0B" icon="🎯" />
        <StatCard label="Feedback Entries"   value={feedback?.length ?? "—"} sub="from officers"  color="#8B5CF6" icon="💬" />
      </div>

      {/* Score + Chart */}
      <div className="dash-main-grid">
        <ScoreCard score={score} loading={loadScore} />
        <ProgressChart inmateId={user?.id} />
      </div>

      {/* Goals + Feedback */}
      <div className="grid-2" style={{ marginTop: 24 }}>
        <GoalList    goals={goals}       loading={loadGoals}    compact />
        <FeedbackPanel feedback={feedback} loading={loadFeedback} compact />
      </div>
    </div>
  );
};

// ─── Shell ─────────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Guard: only inmates
  useEffect(() => {
    if (user?.role === "admin") navigate("/admin");
  }, [user, navigate]);

  return (
    <div className="page-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="main-content">
        <Navbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <Routes>
          <Route index          element={<DashboardHome />} />
          <Route path="goals"    element={<DashboardGoals />} />
          <Route path="feedback" element={<DashboardFeedback />} />
          <Route path="progress" element={<DashboardProgress />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
