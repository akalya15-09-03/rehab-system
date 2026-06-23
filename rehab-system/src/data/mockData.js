// src/data/mockData.js
// Mock data used when backend is not connected

export const mockInmates = [
  {
    id: "INM001",
    name: "James Hartley",
    age: 34,
    cell: "B-12",
    facility: "State Correctional Facility",
    sentence: "5 years",
    admissionDate: "2022-03-15",
    releaseDate: "2027-03-15",
    photo: null,
    score: {
      total: 32,
      discipline: 8,
      participation: 9,
      taskCompletion: 7,
      attitude: 8,
    },
    trend: "up",
  },
  {
    id: "INM002",
    name: "Marcus Deleon",
    age: 28,
    cell: "C-05",
    facility: "State Correctional Facility",
    sentence: "3 years",
    admissionDate: "2023-06-01",
    releaseDate: "2026-06-01",
    photo: null,
    score: {
      total: 22,
      discipline: 5,
      participation: 6,
      taskCompletion: 5,
      attitude: 6,
    },
    trend: "down",
  },
  {
    id: "INM003",
    name: "Trevor Williams",
    age: 41,
    cell: "A-08",
    facility: "State Correctional Facility",
    sentence: "8 years",
    admissionDate: "2020-01-10",
    releaseDate: "2028-01-10",
    photo: null,
    score: {
      total: 37,
      discipline: 10,
      participation: 9,
      taskCompletion: 9,
      attitude: 9,
    },
    trend: "up",
  },
  {
    id: "INM004",
    name: "Darius Thompson",
    age: 25,
    cell: "D-03",
    facility: "State Correctional Facility",
    sentence: "2 years",
    admissionDate: "2024-02-20",
    releaseDate: "2026-02-20",
    photo: null,
    score: {
      total: 18,
      discipline: 4,
      participation: 5,
      taskCompletion: 4,
      attitude: 5,
    },
    trend: "stable",
  },
];

export const mockGoals = [
  {
    id: "G001",
    title: "Complete Anger Management Course",
    description: "Attend all 12 sessions of the anger management program.",
    category: "Mental Health",
    status: "in-progress",
    deadline: "2025-08-01",
    progress: 58,
    assignedBy: "Officer Rodriguez",
  },
  {
    id: "G002",
    title: "GED Certification",
    description: "Pass all GED subject tests to earn your high school equivalency diploma.",
    category: "Education",
    status: "in-progress",
    deadline: "2025-12-31",
    progress: 40,
    assignedBy: "Officer Chen",
  },
  {
    id: "G003",
    title: "Vocational Training — Carpentry",
    description: "Complete 80 hours of carpentry workshop and pass the final assessment.",
    category: "Vocational",
    status: "completed",
    deadline: "2025-05-01",
    progress: 100,
    assignedBy: "Officer Rodriguez",
  },
  {
    id: "G004",
    title: "30-Day Zero Disciplinary Incidents",
    description: "Maintain good conduct for 30 consecutive days without any recorded incidents.",
    category: "Behavior",
    status: "in-progress",
    deadline: "2025-07-15",
    progress: 73,
    assignedBy: "Officer Martinez",
  },
  {
    id: "G005",
    title: "Community Service Hours (50 hrs)",
    description: "Volunteer for approved community service activities within the facility.",
    category: "Community",
    status: "not-started",
    deadline: "2025-10-01",
    progress: 0,
    assignedBy: "Officer Chen",
  },
];

export const mockFeedback = [
  {
    id: "F001",
    date: "2025-07-02",
    officer: "Officer Rodriguez",
    type: "positive",
    message:
      "James showed exceptional leadership during the group therapy session today. He helped mediate a conflict between two other participants calmly and constructively. This is a significant improvement from when he first arrived.",
  },
  {
    id: "F002",
    date: "2025-06-28",
    officer: "Officer Chen",
    type: "neutral",
    message:
      "GED study sessions are consistent. James is struggling with math modules but is putting in effort. Recommend additional tutoring support from the education department.",
  },
  {
    id: "F003",
    date: "2025-06-20",
    officer: "Officer Martinez",
    type: "positive",
    message:
      "Completed carpentry course with distinction. Quality of work was above average. Certificate issued. This opens up vocational opportunities upon release.",
  },
  {
    id: "F004",
    date: "2025-06-10",
    officer: "Officer Rodriguez",
    type: "warning",
    message:
      "Minor verbal altercation in the dining hall. James walked away before it escalated — that was the right call. Discussed the incident in our 1:1. No formal disciplinary action taken.",
  },
  {
    id: "F005",
    date: "2025-05-30",
    officer: "Officer Chen",
    type: "positive",
    message:
      "Week 4 behavior score: 32/40. Steady upward trend for three consecutive weeks. Attitude sub-score improved by 2 points. Keep it up.",
  },
];

export const mockProgressData = {
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    discipline: [5, 6, 6, 7, 7, 8, 8, 8],
    participation: [6, 6, 7, 7, 8, 8, 9, 9],
    taskCompletion: [4, 5, 5, 6, 6, 7, 7, 7],
    attitude: [5, 5, 6, 6, 7, 7, 8, 8],
    total: [20, 22, 24, 26, 28, 30, 32, 32],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    discipline: [4, 5, 5, 6, 7, 8, 8],
    participation: [5, 6, 6, 7, 7, 8, 9],
    taskCompletion: [3, 4, 5, 5, 6, 7, 7],
    attitude: [4, 5, 5, 6, 6, 7, 8],
    total: [16, 20, 21, 24, 26, 30, 32],
  },
};

export const mockNotifications = [
  {
    id: "N001",
    type: "success",
    message: "Your behavior score increased by 2 points this week!",
    date: "2025-07-02",
    read: false,
  },
  {
    id: "N002",
    type: "success",
    message: "Goal completed: Vocational Training — Carpentry. Great work!",
    date: "2025-06-20",
    read: false,
  },
  {
    id: "N003",
    type: "info",
    message: "New goal assigned: Community Service Hours (50 hrs).",
    date: "2025-06-15",
    read: true,
  },
  {
    id: "N004",
    type: "warning",
    message: "Reminder: Anger Management session this Thursday at 14:00.",
    date: "2025-07-01",
    read: true,
  },
];

export const mockAdminStats = {
  totalInmates: 148,
  activeGoals: 312,
  avgScore: 26.4,
  improved: 89,
  declined: 23,
  stable: 36,
};
