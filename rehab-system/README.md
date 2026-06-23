# RehabSystem — Rehabilitation & Behavior Improvement System

A modern React frontend for managing inmate rehabilitation in a correctional facility. Officers can monitor, guide, and track inmate progress. Inmates can review their scores, goals, and feedback on a personal dashboard.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

The app opens at **http://localhost:3000**

---

## 🔑 Demo Login Credentials

| Role   | Username | Password   | Redirects to  |
|--------|----------|------------|---------------|
| Admin  | `admin`  | `admin123` | `/admin`      |
| Inmate | `inmate` | `inmate123`| `/dashboard`  |

> By default the app runs with **mock data** — no backend required.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── FeedbackPanel.js    # Officer feedback list
│   ├── GoalList.js         # Assigned goals with progress
│   ├── Navbar.js           # Top navigation bar (role-aware)
│   ├── NotificationAlert.js# Dismissable alert stack
│   ├── ProgressChart.js    # Chart.js line chart (weekly/monthly)
│   ├── ProtectedRoute.js   # Auth + role guard
│   ├── ScoreCard.js        # Behaviour score ring + breakdown
│   ├── Sidebar.js          # Left nav (role-aware)
│   └── StatCard.js         # KPI summary card
│
├── context/
│   └── AuthContext.js      # JWT session management (localStorage)
│
├── data/
│   └── mockData.js         # Realistic demo data
│
├── pages/
│   ├── Home.js             # Landing page
│   ├── Login.js            # Auth form (admin + inmate)
│   ├── Dashboard.js        # Inmate portal (nested routes)
│   ├── AdminPanel.js       # Admin portal (nested routes)
│   └── NotFound.js         # 404 page
│
├── services/
│   └── api.js              # Axios API layer (mock/real toggle)
│
├── styles/
│   └── global.css          # Design tokens, utilities, typography
│
├── App.js                  # Router + AuthProvider
└── index.js                # React root
```

---

## 🌐 Pages & Routes

| Path                  | Page            | Access        |
|-----------------------|-----------------|---------------|
| `/`                   | Home            | Public        |
| `/login`              | Login           | Public        |
| `/dashboard`          | Inmate Overview | Inmate only   |
| `/dashboard/goals`    | My Goals        | Inmate only   |
| `/dashboard/feedback` | Feedback        | Inmate only   |
| `/dashboard/progress` | Progress Chart  | Inmate only   |
| `/admin`              | Admin Overview  | Admin only    |
| `/admin/inmates`      | Inmate Mgmt     | Admin only    |
| `/admin/goals`        | Assign Goals    | Admin only    |
| `/admin/feedback`     | Submit Feedback | Admin only    |
| `/admin/analytics`    | Analytics       | Admin only    |
| `*`                   | 404             | Public        |

---

## 🔌 Connecting a Real Backend

1. Copy `.env.example` to `.env`
2. Set `REACT_APP_USE_MOCK=false`
3. Set `REACT_APP_API_URL=http://your-backend/api`

### Expected API endpoints

```
POST   /api/auth/login          → { token, user: { id, name, role } }
GET    /api/score?inmateId=      → { total, discipline, participation, taskCompletion, attitude }
GET    /api/goals?inmateId=      → Goal[]
GET    /api/feedback?inmateId=   → Feedback[]
GET    /api/progress?inmateId=&period=weekly|monthly → { labels[], total[], discipline[], … }
GET    /api/notifications?inmateId= → Notification[]
GET    /api/admin/inmates        → Inmate[]
GET    /api/admin/stats          → { totalInmates, activeGoals, avgScore, improved, declined, stable }
POST   /api/admin/inmate         → Inmate
PUT    /api/admin/inmate/:id     → Inmate
DELETE /api/admin/inmate/:id     → { success }
POST   /api/admin/goal           → Goal
POST   /api/admin/feedback       → Feedback
```

---

## 🛠 Tech Stack

| Library           | Version  | Purpose                  |
|-------------------|----------|--------------------------|
| React             | 18.x     | UI framework             |
| React Router DOM  | 6.x      | Client-side routing      |
| Axios             | 1.x      | HTTP client              |
| Chart.js          | 4.x      | Progress charts          |
| react-chartjs-2   | 5.x      | Chart.js React bindings  |
| lucide-react      | 0.x      | Icons                    |

---

## 🎨 Design System

| Token              | Value     |
|--------------------|-----------|
| Primary            | `#1B4F8A` |
| Primary Dark       | `#0F3260` |
| Accent (green)     | `#22A66B` |
| Background         | `#F4F6FA` |
| Surface (cards)    | `#FFFFFF` |
| Border             | `#E2E8F0` |
| Font               | Inter     |

All tokens are CSS custom properties in `src/styles/global.css`.

---

## 📦 Build for Production

```bash
npm run build
```

Output is in the `/build` folder — ready to serve via Nginx, Apache, or any static host.

---

## 📸 Feature Summary

- **Role-based routing** — admins and inmates see different pages automatically
- **JWT auth** — token stored in `localStorage`, restored on page reload
- **Behavior scoring** — 4-category breakdown displayed as progress bars + animated ring
- **Chart.js charts** — line chart with weekly/monthly toggle and total/breakdown view
- **Goal management** — expandable goal cards with status badges and progress bars
- **Feedback log** — color-coded entries by type (positive / note / warning / concern)
- **Smart alerts** — dismissable notification stack with slide-in animation
- **Admin CRUD** — add, edit, delete inmates with a modal form
- **Goal assignment** — form with validation and category/deadline selection
- **Mock data** — fully realistic dummy data; no backend needed to evaluate the UI
- **Responsive** — works on mobile, tablet, and desktop
- **Loading states** — every async action shows a spinner
- **Error handling** — API failures surface as inline error boxes

---

*Confidential system — authorized personnel only.*
