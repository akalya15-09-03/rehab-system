// src/components/ProgressChart.js
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { fetchProgress } from "../services/api";
import "./ProgressChart.css";

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
);

const PERIODS = [
  { key: "weekly",  label: "Weekly"  },
  { key: "monthly", label: "Monthly" },
];

const ProgressChart = ({ inmateId }) => {
  const [period, setPeriod]   = useState("weekly");
  const [data,   setData]     = useState(null);
  const [view,   setView]     = useState("total");   // "total" | "breakdown"
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchProgress(inmateId, period);
        setData(res);
      } catch (e) {
        setError("Failed to load progress data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [inmateId, period]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        display: view === "breakdown",
        position: "bottom",
        labels: { usePointStyle: true, pointStyleWidth: 8, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: "#1A202C",
        titleFont: { size: 12 },
        bodyFont:  { size: 13 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        min: 0,
        max: view === "total" ? 40 : 10,
        ticks: { stepSize: view === "total" ? 8 : 2, color: "#9CA3AF", font: { size: 11 } },
        grid: { color: "#F1F5F9" },
      },
      x: {
        ticks: { color: "#9CA3AF", font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  const buildChartData = () => {
    if (!data) return null;

    if (view === "total") {
      return {
        labels: data.labels,
        datasets: [
          {
            label: "Total Score",
            data: data.total,
            borderColor: "#1B4F8A",
            backgroundColor: "rgba(27,79,138,0.08)",
            borderWidth: 2.5,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#1B4F8A",
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }

    return {
      labels: data.labels,
      datasets: [
        { label: "Discipline",      data: data.discipline,     borderColor: "#1B4F8A", backgroundColor: "transparent", borderWidth: 2, pointRadius: 3, tension: 0.4 },
        { label: "Participation",   data: data.participation,  borderColor: "#22A66B", backgroundColor: "transparent", borderWidth: 2, pointRadius: 3, tension: 0.4 },
        { label: "Task Completion", data: data.taskCompletion, borderColor: "#F59E0B", backgroundColor: "transparent", borderWidth: 2, pointRadius: 3, tension: 0.4 },
        { label: "Attitude",        data: data.attitude,       borderColor: "#8B5CF6", backgroundColor: "transparent", borderWidth: 2, pointRadius: 3, tension: 0.4 },
      ],
    };
  };

  return (
    <div className="progress-chart card">
      <div className="progress-chart-header">
        <div className="card-title" style={{ margin: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 14l4-5.5 3.5 3 4-6 2.5 2.5" stroke="#1B4F8A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Progress Over Time
        </div>
        <div className="progress-chart-controls">
          {/* Period toggle */}
          <div className="toggle-group">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                className={`toggle-btn ${period === p.key ? "active" : ""}`}
                onClick={() => setPeriod(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
          {/* View toggle */}
          <div className="toggle-group">
            <button className={`toggle-btn ${view === "total" ? "active" : ""}`} onClick={() => setView("total")}>Total</button>
            <button className={`toggle-btn ${view === "breakdown" ? "active" : ""}`} onClick={() => setView("breakdown")}>Breakdown</button>
          </div>
        </div>
      </div>

      <div className="chart-area">
        {loading && <div className="spinner-wrapper"><div className="spinner" /></div>}
        {error   && <div className="error-box">{error}</div>}
        {!loading && !error && data && (
          <Line data={buildChartData()} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default ProgressChart;
