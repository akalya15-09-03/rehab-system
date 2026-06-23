// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home       from "./pages/Home";
import Login      from "./pages/Login";
import Dashboard  from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import NotFound   from "./pages/NotFound";

import "./styles/global.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"      element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Inmate dashboard  — nested routes handled inside Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute role="inmate">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin panel — nested routes handled inside AdminPanel */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="/404"  element={<NotFound />} />
          <Route path="*"     element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
