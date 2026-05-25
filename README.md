# 🌾 Kisan Samridhi FPO Dashboard

A full-stack, dynamic dashboard for Farmer Producer Organizations (FPO) built with:
- **Backend**: Python FastAPI + Uvicorn
- **Frontend**: React 18 + Vite + Recharts

---

## 📁 Project Structure

```
fpo-dashboard/
├── backend/
│   ├── main.py              # FastAPI application & all API routes
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── index.html
│   ├── vite.config.js       # Vite + API proxy config
│   ├── package.json
│   └── src/
│       ├── App.jsx           # Root component + routing
│       ├── App.css
│       ├── index.css         # Global styles & CSS variables
│       ├── main.jsx
│       ├── components/
│       │   ├── Sidebar.jsx   # Navigation sidebar
│       │   ├── Topbar.jsx    # Header bar
│       │   └── StatCard.jsx  # Metric card component
│       ├── hooks/
│       │   └── useFetch.js   # Data fetching hook
│       ├── pages/
│       │   ├── Overview.jsx  # Dashboard home
│       │   ├── Farmers.jsx   # Farmers registry + add farmer
│       │   ├── Crops.jsx     # Crops & MSP tracker
│       │   ├── Transactions.jsx  # Transaction history
│       │   ├── Analytics.jsx # Charts & insights
│       │   ├── Alerts.jsx    # Notifications & govt schemes
│       │   └── Settings.jsx  # App settings
│       └── utils/
│           └── api.js        # API helper functions
└── README.md
```

---

## 🚀 Step-by-Step Setup on VS Code

### Prerequisites
- Node.js (v18+) — https://nodejs.org
- Python (3.10+) — https://python.org
- VS Code — https://code.visualstudio.com

---

### Step 1 — Open Project in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the `fpo-dashboard` folder

---

### Step 2 — Set Up the Backend (FastAPI)

Open a **new terminal** in VS Code (`Ctrl+`` ` or **Terminal → New Terminal**)

```bash
# Navigate to backend folder
cd backend

# Create a Python virtual environment
python -m venv venv

# Activate it:
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --port 8000
```

✅ Backend will run at: http://localhost:8000
✅ API docs at: http://localhost:8000/docs

---

### Step 3 — Set Up the Frontend (React + Vite)

Open a **second terminal** in VS Code (`Ctrl+Shift+`` `)

```bash
# Navigate to frontend folder
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend will run at: http://localhost:5173

---

### Step 4 — Open the Dashboard

1. Open your browser
2. Go to **http://localhost:5173**
3. The dashboard loads and fetches live data from your backend!

---

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| GET /api/summary | Dashboard KPIs |
| GET /api/farmers | List farmers (with filters) |
| POST /api/farmers | Add new farmer |
| GET /api/crops | Crops + MSP data |
| GET /api/transactions | Paginated transactions |
| GET /api/analytics/monthly-sales | Monthly sales chart |
| GET /api/analytics/crop-distribution | Crop pie chart |
| GET /api/analytics/village-stats | Village analytics |
| GET /api/analytics/income-trend | Income trend chart |
| GET /api/weather | Weather widget data |
| GET /api/alerts | Alerts & notifications |

---

## ✨ Dashboard Features

- **Overview** — KPI cards, sales chart, crop distribution, weather widget, alerts
- **Farmers Registry** — Searchable/filterable table, Add Farmer modal
- **Crops & MSP** — Cards with MSP vs market price comparison, production bar
- **Transactions** — Paginated table with crop/status filters
- **Analytics** — Income trend, village performance, pie charts
- **Alerts & News** — Alert feed + Government scheme directory
- **Settings** — Toggle preferences, update FPO info

---

## 🛠 VS Code Recommended Extensions

Install these for better development:
- **Python** (Microsoft)
- **ES7+ React Snippets**
- **Prettier - Code formatter**
- **Auto Rename Tag**

---

## 📦 Build for Production

```bash
# Frontend build
cd frontend
npm run build
# Output in frontend/dist/

# Backend production run
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```
