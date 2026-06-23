// src/services/api.js
// Centralized API layer. Switches to mock data when REACT_APP_USE_MOCK=true
// or when backend is unreachable.

import axios from "axios";
import {
  mockInmates,
  mockGoals,
  mockFeedback,
  mockProgressData,
  mockNotifications,
  mockAdminStats,
} from "../data/mockData";

const USE_MOCK = process.env.REACT_APP_USE_MOCK !== "false"; // default: use mock

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Axios instance with auth header
const apiClient = axios.create({ baseURL: BASE_URL });
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("rbs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Simulated network delay for realistic mock UX
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

// ─── Auth ────────────────────────────────────────────────────────────────────
export const loginUser = async ({ username, password }) => {
  if (USE_MOCK) {
    await delay();
    // Demo credentials
    if (username === "admin" && password === "admin123") {
      return {
        token: "mock-jwt-admin-token",
        user: { id: "ADM001", name: "Officer Rodriguez", role: "admin" },
      };
    }
    if (username === "inmate" && password === "inmate123") {
      return {
        token: "mock-jwt-inmate-token",
        user: { id: "INM001", name: "James Hartley", role: "inmate" },
      };
    }
    throw new Error("Invalid credentials. Try admin/admin123 or inmate/inmate123");
  }
  const res = await apiClient.post("/auth/login", { username, password });
  return res.data;
};

// ─── Inmate Score ─────────────────────────────────────────────────────────────
export const fetchScore = async (inmateId) => {
  if (USE_MOCK) {
    await delay(300);
    const inmate = mockInmates.find((i) => i.id === inmateId) || mockInmates[0];
    return inmate.score;
  }
  const res = await apiClient.get("/score", { params: { inmateId } });
  return res.data;
};

// ─── Goals ────────────────────────────────────────────────────────────────────
export const fetchGoals = async (inmateId) => {
  if (USE_MOCK) {
    await delay(400);
    return mockGoals;
  }
  const res = await apiClient.get("/goals", { params: { inmateId } });
  return res.data;
};

// ─── Feedback ─────────────────────────────────────────────────────────────────
export const fetchFeedback = async (inmateId) => {
  if (USE_MOCK) {
    await delay(400);
    return mockFeedback;
  }
  const res = await apiClient.get("/feedback", { params: { inmateId } });
  return res.data;
};

// ─── Progress ─────────────────────────────────────────────────────────────────
export const fetchProgress = async (inmateId, period = "weekly") => {
  if (USE_MOCK) {
    await delay(300);
    return mockProgressData[period];
  }
  const res = await apiClient.get("/progress", { params: { inmateId, period } });
  return res.data;
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const fetchNotifications = async (inmateId) => {
  if (USE_MOCK) {
    await delay(200);
    return mockNotifications;
  }
  const res = await apiClient.get("/notifications", { params: { inmateId } });
  return res.data;
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const fetchAllInmates = async () => {
  if (USE_MOCK) {
    await delay(500);
    return mockInmates;
  }
  const res = await apiClient.get("/admin/inmates");
  return res.data;
};

export const fetchAdminStats = async () => {
  if (USE_MOCK) {
    await delay(300);
    return mockAdminStats;
  }
  const res = await apiClient.get("/admin/stats");
  return res.data;
};

export const createInmate = async (data) => {
  if (USE_MOCK) {
    await delay(600);
    return { ...data, id: "INM" + Date.now() };
  }
  const res = await apiClient.post("/admin/inmate", data);
  return res.data;
};

export const updateInmate = async (id, data) => {
  if (USE_MOCK) {
    await delay(500);
    return { id, ...data };
  }
  const res = await apiClient.put(`/admin/inmate/${id}`, data);
  return res.data;
};

export const deleteInmate = async (id) => {
  if (USE_MOCK) {
    await delay(400);
    return { success: true };
  }
  const res = await apiClient.delete(`/admin/inmate/${id}`);
  return res.data;
};

export const assignGoal = async (data) => {
  if (USE_MOCK) {
    await delay(500);
    return { ...data, id: "G" + Date.now() };
  }
  const res = await apiClient.post("/admin/goal", data);
  return res.data;
};

export const submitFeedback = async (data) => {
  if (USE_MOCK) {
    await delay(500);
    return { ...data, id: "F" + Date.now(), date: new Date().toISOString().split("T")[0] };
  }
  const res = await apiClient.post("/admin/feedback", data);
  return res.data;
};
