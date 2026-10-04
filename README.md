<p align="center">
  <img src="https://img.shields.io/badge/💧-JalRakshak-0077B6?style=for-the-badge&labelColor=023E8A&logoColor=white" alt="JalRakshak" height="50"/>
</p>

<h1 align="center">JalRakshak 💧🛡️</h1>

<p align="center">
  <b>Smart Water Quality · Complaint Reporting · Community Alert Platform</b>
</p>

<p align="center">
  <em>"Report. Track. Resolve. — Clean Water Through Digital Action."</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SDG_6-Clean_Water_%26_Sanitation-0077B6?style=flat-square&logo=un&logoColor=white" alt="SDG 6"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Drizzle_ORM-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

---

## 🌊 The Problem

> **780 million** people lack access to clean water. **2 million** die annually from waterborne diseases. In India, delayed complaint resolution and lack of transparency make water issues worse every day.

Citizens have **no fast, transparent way** to report water problems like contamination, broken pipelines, or sewage overflow — and authorities have **no unified dashboard** to prioritize and resolve them.

---

## 💡 The Solution — JalRakshak

**JalRakshak** is a full-stack civic platform that bridges the gap between citizens and water authorities by providing:

| For Citizens 👥 | For Authorities 🏛️ |
|:---|:---|
| 📝 Report water issues with photos & location | 📊 Live analytics dashboard |
| 🗺️ View issue heatmap across the city | 🚦 Smart priority engine (auto-severity) |
| 📍 Track complaint status in real-time | ⚡ Complaint lifecycle management |
| 🚨 Receive community safety alerts | 🗂️ Area-wise risk monitoring |
| ⭐ Rate resolution quality via feedback | 📈 Trend analysis & reports |

---

## ✨ Key Features

### 🧠 1. Smart Priority Engine
Complaints are **automatically scored** based on:
- Issue type severity (sewage mixing = 50, leakage = 20, etc.)
- Whether drinking water is affected (+15)
- Image evidence attached (+10)
- User-reported urgency level (+5/+10)
- Number of unresolved complaints in the same area (+10/+20)

```
Score 0–24  → 🟢 Low     |  Score 25–49 → 🟡 Medium
Score 50–74 → 🟠 High    |  Score 75+   → 🔴 Critical
```

### 🚨 2. Community Water Safety Alerts
When an area has multiple unresolved complaints, automatic alerts warn citizens:
- ⚠️ **Boil water before use**
- 🚱 **Avoid drinking directly**
- 🏥 **Report symptoms to health center**

### 🗺️ 3. Interactive Issue Heatmap
Color-coded map markers give an instant visual overview:
- 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Resolved

### 📊 4. Live Analytics Dashboard
Real-time stats including total complaints, resolution rates, most affected areas, category breakdowns, and weekly trend graphs.

### 📍 5. Area-Wise Water Safety Score
Each area receives a dynamic safety score:
| Score | Rating |
|:---:|:---|
| 90–100 | ✅ Safe |
| 70–89 | 🟡 Moderate |
| 40–69 | 🟠 Risky |
| 0–39 | 🔴 Unsafe |

### 📜 6. Complaint Timeline Tracking
Every complaint shows a parcel-tracking-style timeline:
> *Submitted → Under Review → Assigned → In Progress → Resolved*

### 🖼️ 7. Before/After Resolution Images
Admins can upload resolved images for transparency and accountability.

### 🌍 8. SDG 6 Impact Counter
Homepage displays live impact metrics:
> *Complaints Resolved · Areas Improved · Citizens Helped · Risk Alerts Issued*

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    pnpm Monorepo                         │
├───────────────┬──────────────────┬───────────────────────┤
│   Frontend    │   API Server     │     Shared Libs       │
│ (React + Vite)│ (Express 5)      │                       │
├───────────────┼──────────────────┼───────────────────────┤
│ • Home        │ • /auth/*        │ @workspace/db         │
│ • Dashboard   │ • /complaints/*  │   └─ Drizzle ORM      │
│ • Report      │ • /areas/*       │   └─ PostgreSQL        │
│ • Map View    │ • /alerts/*      │ @workspace/api-zod    │
│ • Complaints  │ • /analytics/*   │   └─ Zod v4 schemas   │
│ • Alerts      │ • /feedback/*    │ @workspace/api-client │
│ • Water Status│ • /users/*       │   └─ Orval codegen    │
│ • Safety Tips │ • /healthz       │ @workspace/api-spec   │
│ • Feedback    │                  │   └─ OpenAPI 3.1      │
│ • Login/Reg   │                  │                       │
└───────────────┴──────────────────┴───────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | React 19, TypeScript 5.9, Vite, Tailwind CSS, Shadcn/UI, Recharts, Leaflet.js |
| **Backend** | Node.js 24, Express 5, TypeScript |
| **Database** | PostgreSQL + Drizzle ORM |
| **Validation** | Zod v4, drizzle-zod |
| **API Design** | OpenAPI 3.1 spec, Orval (codegen) |
| **Auth** | JWT (bcrypt password hashing) |
| **Monorepo** | pnpm workspaces |
| **Build** | esbuild (CJS bundle) |

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/profile` | Get current user profile |

### 📝 Complaints
| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/complaints` | Submit a new complaint |
| `GET` | `/api/complaints` | List all complaints (filterable) |
| `GET` | `/api/complaints/:id` | Get complaint details + timeline |
| `PATCH` | `/api/complaints/:id` | Update complaint status/priority |

### 🗺️ Areas & Water Status
| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/areas` | List all area statuses |
| `PATCH` | `/api/areas/:id` | Update area risk level |

### 🚨 Alerts
| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/alerts` | List community alerts |
| `POST` | `/api/alerts` | Create new alert (admin) |
| `PATCH` | `/api/alerts/:id` | Update alert status |

### 📊 Analytics
| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/analytics/summary` | Dashboard summary stats |
| `GET` | `/api/analytics/trends` | Weekly/monthly trend data |

### ⭐ Feedback
| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/feedback` | Submit resolution feedback |
| `GET` | `/api/feedback` | List all feedback entries |

---

## 📂 Project Structure

```
Jal-Rakshak/
├── artifacts/
│   ├── api-server/          # Express 5 API server
│   │   └── src/
│   │       ├── routes/      # auth, complaints, areas, alerts, analytics, feedback, users
│   │       └── lib/         # severity engine, auth helpers, logger
│   ├── jalrakshak/          # Main React frontend app
│   │   └── src/
│   │       ├── pages/       # home, dashboard, report, map, complaints, alerts, etc.
│   │       ├── components/  # layout, UI components
│   │       └── lib/         # auth context, utilities
│   └── jalrakshak-doc/      # Documentation / presentation app
├── lib/
│   ├── db/                  # Drizzle ORM schemas (PostgreSQL)
│   │   └── src/schema/      # users, complaints, areas, alerts, feedback
│   ├── api-spec/            # OpenAPI 3.1 specification
│   ├── api-zod/             # Generated Zod validation schemas
│   └── api-client-react/    # Generated React API client (Orval)
├── scripts/                 # Build & utility scripts
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # Workspace definition
└── tsconfig.base.json       # Shared TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 24
- **pnpm** ≥ 9
- **PostgreSQL** running locally or remotely

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AnuragKannojiya/Jal-Rakshak.git
cd Jal-Rakshak

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, etc.

# 4. Push database schema
pnpm --filter @workspace/db run push

# 5. Start the development server
pnpm --filter @workspace/api-server run dev
```

### Key Commands

| Command | Description |
|:---|:---|
| `pnpm run typecheck` | Full TypeScript typecheck across all packages |
| `pnpm run build` | Typecheck + build all packages |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks & Zod schemas |
| `pnpm --filter @workspace/db run push` | Push DB schema changes |
| `pnpm --filter @workspace/api-server run dev` | Run API server locally |

---

## 🗄️ Database Schema

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Users      │────▶│   Complaints     │────▶│  Complaint   │
│              │     │                  │     │  History     │
│ id           │     │ id               │     │              │
│ name         │     │ userId      (FK) │     │ complaintId  │
│ email        │     │ complaintTitle   │     │ changedBy    │
│ password     │     │ issueType        │     │ oldStatus    │
│ phone        │     │ description      │     │ newStatus    │
│ role         │     │ area / address   │     │ remark       │
│ area         │     │ lat / lng        │     │ timestamp    │
│ createdAt    │     │ severityScore    │     └──────────────┘
└─────────────┘     │ priority         │
                    │ status           │     ┌──────────────┐
┌─────────────┐     │ adminRemark      │     │  Feedback    │
│ Area Status  │     │ resolvedImage    │────▶│              │
│              │     └──────────────────┘     │ complaintId  │
│ areaName     │                              │ userId       │
│ waterScore   │     ┌──────────────────┐     │ rating       │
│ riskLevel    │     │   Alerts         │     │ comment      │
│ qualityTag   │     │                  │     └──────────────┘
│ activeCount  │     │ title / desc     │
│ lastUpdated  │     │ area / level     │
└─────────────┘     │ status           │
                    └──────────────────┘
```

---

## 🌍 SDG 6 Alignment

JalRakshak directly supports **United Nations Sustainable Development Goal 6: Clean Water and Sanitation**.

| SDG Target | How JalRakshak Helps |
|:---|:---|
| **6.1** Universal safe drinking water | Enables rapid reporting of contaminated water sources |
| **6.3** Improve water quality | Tracks pollution complaints and enables timely remediation |
| **6.4** Water-use efficiency | Identifies leakage and wastage issues through citizen reports |
| **6.b** Community participation | Empowers local communities with alerts, feedback, and transparency |

---

## 🎬 Demo Flow

```
1️⃣  Open Homepage → View hero, SDG impact counters, feature showcase
2️⃣  Explore Map → See complaint heatmap with color-coded markers
3️⃣  Login as Citizen → Register/Login with JWT authentication
4️⃣  Report Issue → Submit complaint with photo, location, category
5️⃣  Track Complaint → View real-time status timeline
6️⃣  Switch to Admin → See complaints in admin dashboard
7️⃣  Admin Action → Update priority, change status, add remarks
8️⃣  Alert Generated → Community warning for affected area
9️⃣  Analytics Update → Dashboard reflects new data in real-time
🔟  Resolution → Complaint marked resolved with before/after images
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Anurag Kannojiya**
- GitHub: [@AnuragKannojiya](https://github.com/AnuragKannojiya)

---

<p align="center">
  <b>💧 Every drop matters. Every complaint counts. Every community deserves clean water. 💧</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-❤️_for_SDG_6-0077B6?style=for-the-badge" alt="Made with love"/>
</p>
