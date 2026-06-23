// src/pages/AdminPanel.js
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ScoreCard from "../components/ScoreCard";
import ProgressChart from "../components/ProgressChart";
import FeedbackPanel from "../components/FeedbackPanel";
import {
  fetchAllInmates, fetchAdminStats,
  createInmate, updateInmate, deleteInmate,
  assignGoal, submitFeedback, fetchFeedback,
} from "../services/api";
import "./AdminPanel.css";

// ─── Overview ─────────────────────────────────────────────────────────────────
const AdminHome = () => {
  const [stats,   setStats]   = useState(null);
  const [inmates, setInmates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAdminStats(), fetchAllInmates()])
      .then(([s, i]) => { setStats(s); setInmates(i); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-body">
      <div className="section-header">
        <h2>Facility Overview</h2>
        <span className="badge badge-success">System Active</span>
      </div>

      {loading && <div className="spinner-wrapper"><div className="spinner" /></div>}

      {!loading && stats && (
        <>
          <div className="grid-4" style={{ marginBottom: 24 }}>
            <StatCard label="Total Inmates"  value={stats.totalInmates}           color="#1B4F8A" icon="👥" />
            <StatCard label="Active Goals"   value={stats.activeGoals}            color="#22A66B" icon="🎯" />
            <StatCard label="Avg Score"      value={`${stats.avgScore}/40`}       color="#F59E0B" icon="⭐" />
            <StatCard label="Improved"       value={`${stats.improved}`}          color="#8B5CF6" icon="📈" sub={`${stats.declined} declined this period`} />
          </div>

          {/* Quick-view inmate table */}
          <div className="card">
            <div className="card-title">Recent Inmate Activity</div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Inmate</th>
                    <th>Cell</th>
                    <th>Score</th>
                    <th>Trend</th>
                    <th>Release Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inmates?.map((inmate) => (
                    <tr key={inmate.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="table-avatar">
                            {inmate.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0,2)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{inmate.name}</div>
                            <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{inmate.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{inmate.cell}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: inmate.score.total >= 28 ? "#22A66B" : inmate.score.total >= 20 ? "#F59E0B" : "#EF4444" }}>
                          {inmate.score.total}/40
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${inmate.trend === "up" ? "badge-success" : inmate.trend === "down" ? "badge-danger" : "badge-neutral"}`}>
                          {inmate.trend === "up" ? "↑ Improving" : inmate.trend === "down" ? "↓ Declining" : "→ Stable"}
                        </span>
                      </td>
                      <td style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{inmate.releaseDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Inmate Management ────────────────────────────────────────────────────────
const InmateModal = ({ inmate, onClose, onSave }) => {
  const isEdit = !!inmate?.id;
  const [form, setForm] = useState(
    inmate || { name: "", age: "", cell: "", sentence: "", admissionDate: "", releaseDate: "" }
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name   = "Name is required";
    if (!form.cell.trim())   e.cell   = "Cell is required";
    if (!form.sentence.trim()) e.sentence = "Sentence is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const result = isEdit
        ? await updateInmate(inmate.id, form)
        : await createInmate(form);
      onSave(result, isEdit);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? "Edit Inmate" : "Add New Inmate"}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className={`form-input ${errors.name ? "input-error" : ""}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="James Hartley" />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input className="form-input" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="34" />
            </div>
            <div className="form-group">
              <label className="form-label">Cell *</label>
              <input className={`form-input ${errors.cell ? "input-error" : ""}`} value={form.cell} onChange={(e) => setForm({ ...form, cell: e.target.value })} placeholder="B-12" />
              {errors.cell && <div className="form-error">{errors.cell}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Sentence *</label>
              <input className={`form-input ${errors.sentence ? "input-error" : ""}`} value={form.sentence} onChange={(e) => setForm({ ...form, sentence: e.target.value })} placeholder="5 years" />
              {errors.sentence && <div className="form-error">{errors.sentence}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Admission Date</label>
              <input className="form-input" type="date" value={form.admissionDate} onChange={(e) => setForm({ ...form, admissionDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Release Date</label>
              <input className="form-input" type="date" value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Update Inmate" : "Add Inmate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminInmates = () => {
  const [inmates, setInmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [modal,   setModal]   = useState(null); // null | "add" | inmate object
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchAllInmates().then(setInmates).finally(() => setLoading(false));
  }, []);

  const filtered = inmates.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.id.toLowerCase().includes(search.toLowerCase()) ||
    i.cell.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (result, isEdit) => {
    if (isEdit) {
      setInmates((prev) => prev.map((i) => (i.id === result.id ? { ...i, ...result } : i)));
    } else {
      setInmates((prev) => [...prev, { ...result, score: { total: 0, discipline: 0, participation: 0, taskCompletion: 0, attitude: 0 }, trend: "stable" }]);
    }
    setModal(null);
  };

  const handleDelete = async (id) => {
    await deleteInmate(id);
    setInmates((prev) => prev.filter((i) => i.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div className="page-body">
      <div className="section-header">
        <h2>Inmate Management</h2>
        <button className="btn btn-primary" onClick={() => setModal("add")}>+ Add Inmate</button>
      </div>

      <div className="card">
        <div className="table-search-bar">
          <input className="form-input" style={{ maxWidth: 300 }} placeholder="Search by name, ID, or cell…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <span className="search-count">{filtered.length} records</span>
        </div>

        {loading && <div className="spinner-wrapper"><div className="spinner" /></div>}

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Inmate</th>
                <th>Cell</th>
                <th>Sentence</th>
                <th>Score</th>
                <th>Trend</th>
                <th>Release</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inmate) => (
                <tr key={inmate.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="table-avatar">
                        {inmate.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{inmate.name}</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{inmate.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{inmate.cell}</td>
                  <td>{inmate.sentence}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: inmate.score.total >= 28 ? "#22A66B" : inmate.score.total >= 20 ? "#F59E0B" : "#EF4444" }}>
                      {inmate.score.total}/40
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${inmate.trend === "up" ? "badge-success" : inmate.trend === "down" ? "badge-danger" : "badge-neutral"}`}>
                      {inmate.trend === "up" ? "↑ Up" : inmate.trend === "down" ? "↓ Down" : "→ Stable"}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{inmate.releaseDate}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setModal(inmate)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(inmate)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(modal === "add" || (modal && modal.id)) && (
        <InmateModal
          inmate={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-box confirm-box" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Inmate?</h3>
            <p>Remove <strong>{confirmDelete.name}</strong> from the system? This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Goal Assignment ──────────────────────────────────────────────────────────
const AdminGoals = () => {
  const [inmates, setInmates] = useState([]);
  const [form,    setForm]    = useState({ inmateId: "", title: "", description: "", category: "Behavior", deadline: "" });
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors,  setErrors]  = useState({});

  useEffect(() => { fetchAllInmates().then(setInmates); }, []);

  const validate = () => {
    const e = {};
    if (!form.inmateId)          e.inmateId    = "Select an inmate";
    if (!form.title.trim())      e.title       = "Goal title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.deadline)          e.deadline    = "Deadline is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await assignGoal(form);
      setSuccess(true);
      setForm({ inmateId: "", title: "", description: "", category: "Behavior", deadline: "" });
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-body">
      <div className="section-header"><h2>Assign Goal</h2></div>
      <div className="card" style={{ maxWidth: 680 }}>
        {success && (
          <div className="error-box" style={{ background: "#F0FDF4", borderColor: "#A7F3D0", color: "#065F46", marginBottom: 20 }}>
            ✅ Goal assigned successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Inmate *</label>
            <select className={`form-select ${errors.inmateId ? "input-error" : ""}`} value={form.inmateId} onChange={(e) => { setForm({ ...form, inmateId: e.target.value }); setErrors({ ...errors, inmateId: "" }); }}>
              <option value="">Select inmate…</option>
              {inmates.map((i) => (
                <option key={i.id} value={i.id}>{i.name} ({i.id})</option>
              ))}
            </select>
            {errors.inmateId && <div className="form-error">{errors.inmateId}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Goal Title *</label>
            <input className={`form-input ${errors.title ? "input-error" : ""}`} value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); setErrors({ ...errors, title: "" }); }} placeholder="e.g. Complete Anger Management Course" />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea className={`form-textarea ${errors.description ? "input-error" : ""}`} value={form.description} onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: "" }); }} placeholder="Describe the goal and what success looks like…" />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["Behavior", "Education", "Vocational", "Mental Health", "Community"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Deadline *</label>
              <input className={`form-input ${errors.deadline ? "input-error" : ""}`} type="date" value={form.deadline} onChange={(e) => { setForm({ ...form, deadline: e.target.value }); setErrors({ ...errors, deadline: "" }); }} />
              {errors.deadline && <div className="form-error">{errors.deadline}</div>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Assigning…" : "Assign Goal"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Feedback ─────────────────────────────────────────────────────────────────
const AdminFeedback = () => {
  const { user } = useAuth();
  const [inmates,  setInmates]  = useState([]);
  const [selected, setSelected] = useState("");
  const [fbList,   setFbList]   = useState(null);
  const [loadFb,   setLoadFb]   = useState(false);
  const [form,     setForm]     = useState({ type: "positive", message: "" });
  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);

  useEffect(() => { fetchAllInmates().then(setInmates); }, []);

  useEffect(() => {
    if (!selected) return;
    setLoadFb(true);
    fetchFeedback(selected).then(setFbList).finally(() => setLoadFb(false));
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !form.message.trim()) return;
    setSaving(true);
    try {
      const entry = await submitFeedback({ inmateId: selected, officer: user?.name, ...form });
      setFbList((prev) => [entry, ...(prev || [])]);
      setForm({ type: "positive", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-body">
      <div className="section-header"><h2>Submit Feedback</h2></div>
      <div className="admin-feedback-layout">
        <div className="card">
          <div className="card-title">New Feedback Entry</div>
          <div className="form-group">
            <label className="form-label">Select Inmate</label>
            <select className="form-select" value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="">Choose inmate…</option>
              {inmates.map((i) => <option key={i.id} value={i.id}>{i.name} ({i.id})</option>)}
            </select>
          </div>
          {success && <div className="error-box" style={{ background: "#F0FDF4", borderColor: "#A7F3D0", color: "#065F46", marginBottom: 16 }}>✅ Feedback submitted!</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Feedback Type</label>
              <div className="fb-type-btns">
                {["positive", "neutral", "warning", "negative"].map((t) => (
                  <button key={t} type="button" className={`fb-type-btn fb-type-${t} ${form.type === t ? "active" : ""}`} onClick={() => setForm({ ...form, type: t })}>
                    {t === "positive" ? "👍 Positive" : t === "neutral" ? "📋 Note" : t === "warning" ? "⚠️ Warning" : "🚨 Concern"}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea className="form-textarea" style={{ minHeight: 120 }} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Write your feedback for this inmate…" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving || !selected || !form.message.trim()}>
              {saving ? "Submitting…" : "Submit Feedback"}
            </button>
          </form>
        </div>
        <FeedbackPanel feedback={fbList} loading={loadFb} />
      </div>
    </div>
  );
};

// ─── Analytics ────────────────────────────────────────────────────────────────
const AdminAnalytics = () => {
  const [inmates, setInmates]   = useState([]);
  const [selected, setSelected] = useState("");
  const [score,    setScore]    = useState(null);

  useEffect(() => {
    fetchAllInmates().then((list) => {
      setInmates(list);
      if (list[0]) setSelected(list[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    const inmate = inmates.find((i) => i.id === selected);
    if (inmate) setScore(inmate.score);
  }, [selected, inmates]);

  return (
    <div className="page-body">
      <div className="section-header">
        <h2>Performance Analytics</h2>
        <select className="form-select" style={{ width: 240 }} value={selected} onChange={(e) => setSelected(e.target.value)}>
          {inmates.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
      </div>
      <div className="dash-main-grid">
        <ScoreCard score={score} loading={!score} />
        <ProgressChart inmateId={selected} />
      </div>
    </div>
  );
};

// ─── Shell ─────────────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user?.role !== "admin") navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="page-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="main-content">
        <Navbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <Routes>
          <Route index             element={<AdminHome />}      />
          <Route path="inmates"    element={<AdminInmates />}   />
          <Route path="goals"      element={<AdminGoals />}     />
          <Route path="feedback"   element={<AdminFeedback />}  />
          <Route path="analytics"  element={<AdminAnalytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
