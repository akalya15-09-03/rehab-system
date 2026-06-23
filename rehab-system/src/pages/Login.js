// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";
import "./Login.css";

const DEMO_ACCOUNTS = [
  { role: "Admin / Officer", username: "admin",  password: "admin123",  color: "#1B4F8A" },
  { role: "Inmate",          username: "inmate", password: "inmate123", color: "#22A66B" },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form,    setForm]    = useState({ username: "", password: "" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [apiErr,  setApiErr]  = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.password)        e.password = "Password is required";
    if (form.password && form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    setApiErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const { user, token } = await loginUser(form);
      login(user, token);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setApiErr(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acc) => {
    setForm({ username: acc.username, password: acc.password });
    setErrors({});
    setApiErr("");
  };

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-left-inner">
          <div className="login-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#1B4F8A"/>
              <path d="M12 20a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" stroke="#22A66B" strokeWidth="2"/>
              <path d="M15.5 20l3.5 3.5 6-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>RehabSystem</span>
          </div>
          <h1 className="login-left-title">Building better paths forward.</h1>
          <p className="login-left-sub">
            A secure, structured system for tracking rehabilitation progress, assigning goals,
            and guiding behavioral improvement across correctional facilities.
          </p>

          <div className="login-features">
            {["Real-time behavior scoring", "Goal assignment & tracking", "Officer feedback logs", "Visual progress analytics"].map((f) => (
              <div className="login-feature-item" key={f}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" fill="#22A66B"/>
                  <path d="M5 8l2.5 2.5L11 5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div className="login-form-box">
          <div className="login-form-header">
            <h2>Sign in to your account</h2>
            <p>Enter your credentials to access the system</p>
          </div>

          {/* Demo accounts */}
          <div className="demo-accounts">
            <div className="demo-label">Quick access — demo accounts</div>
            <div className="demo-btns">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  className="demo-btn"
                  style={{ borderColor: acc.color, color: acc.color }}
                  onClick={() => fillDemo(acc)}
                  type="button"
                >
                  {acc.role}
                </button>
              ))}
            </div>
          </div>

          {apiErr && (
            <div className="error-box" style={{ marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M8 5v4" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="11" r="0.7" fill="#EF4444"/>
              </svg>
              {apiErr}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                className={`form-input ${errors.username ? "input-error" : ""}`}
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
              {errors.username && <div className="form-error">{errors.username}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg login-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Signing in…
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <p className="login-disclaimer">
            This is a secure government system. All activity is monitored and logged.
            Unauthorized access is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
