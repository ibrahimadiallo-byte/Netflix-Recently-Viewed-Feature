# Netflix Clone – Recently Viewed Feature

A Netflix-inspired web app that solves a real UX problem: Netflix buries viewing history 6+ clicks deep in account settings. We bring it front and center on the homepage.

**Live Demo:** [netflix-recently-viewed-feature.vercel.app](https://netflix-recently-viewed-feature.vercel.app)

---

## The Problem

Netflix users who browse multiple titles before deciding what to watch have no quick way to revisit content they already looked at. The current path — *Settings → Account → Viewing Activity → scroll* — is buried and frustrating.

## Our Solution

A **"Recently Viewed"** section displayed prominently on the homepage. One click to see the last 10 items you interacted with, sorted newest-first, with persistent storage across sessions.

| Before (Netflix) | After (Our Clone) |
|---|---|
| 6+ clicks through settings menus | 1 click — right on the homepage |
| Text-only viewing history list | Visual thumbnails matching Netflix's design language |
| No quick re-access to browsed content | Click any thumbnail to jump back instantly |

---

## Features

- **Click Tracking** — Every thumbnail click is recorded with timestamp and content metadata
- **Persistent Storage** — Recently viewed items survive page refresh and browser close (localStorage or PostgreSQL via API)
- **10-Item Limit** — Automatically drops the oldest entry when an 11th is added
- **Relative Timestamps** — "Viewed 2 hours ago" under each thumbnail
- **Remove & Clear** — Remove individual items (✕ on hover) or clear the entire list
- **Dual Storage Modes** — Toggle between localStorage (default) and a Railway-hosted PostgreSQL backend
- **TMDB Integration** — Optional real movie/show posters and metadata from The Movie Database API
- **Full-Screen Search** — Overlay search panel that filters across all content rows
- **CI/CD Pipelines** — GitHub Actions for auto-deploy to Vercel (frontend) and Railway (backend)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 6 |
| Styling | Vanilla CSS with CSS custom properties |
| Local Storage | Browser localStorage API |
| Backend (optional) | Express.js, PostgreSQL, Railway |
| Deployment | Vercel (frontend), Railway (backend) |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node)

### Install & Run

```bash
git clone https://github.com/yaasameen-maker/Netflix-Recently-Viewed-Feature.git
cd Netflix-Recently-Viewed-Feature
npm install
npm run dev
```

Open **http://localhost:5173** → click **Sign In** to reach the homepage.

### Environment Variables (optional)

Copy `.env.example` to `.env` and configure as needed:

```env
# Use Railway backend instead of localStorage
VITE_USE_API=false
VITE_API_URL=http://localhost:3001

# Use real TMDB movie data instead of local posters
VITE_USE_TMDB=false
VITE_TMDB_KEY=your_tmdb_api_key
```

By default, everything runs locally with bundled poster images and localStorage — no API keys or backend required.

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── HomePage.jsx        # Main logged-in view with all content rows
│   │   ├── HomePage.css        # Netflix-style dark theme styling
│   │   ├── LandingPage.jsx     # Sign-in splash screen
│   │   └── LandingPage.css
│   ├── data/
│   │   ├── dummyContent.js     # Static show/movie data with local poster paths
│   │   └── tmdbCache.json      # Cached TMDB API responses (fallback)
│   ├── utils/
│   │   └── recentlyViewed.js   # All storage logic (localStorage + API modes)
│   ├── App.jsx                 # Root component — login state toggle
│   ├── main.jsx                # React entry point
│   └── index.css               # Global resets and CSS variables
├── server/
│   ├── index.js                # Express API with PostgreSQL (Yaasameen)
│   └── package.json            # Backend dependencies
├── public/
│   ├── posters/                # Local show/movie poster images
│   └── backdrops/              # Hero section backdrop images
├── scripts/
│   └── buildTmdbCache.mjs      # Fetches TMDB data and saves to JSON cache
├── .github/workflows/
│   ├── deploy-frontend.yml     # Auto-deploy frontend to Vercel on push
│   └── deploy-backend.yml      # Auto-deploy backend to Railway on push
├── package.json                # Frontend dependencies (React, Vite)
├── vite.config.js              # Vite configuration
├── TEAM_PLAN.md                # Step-by-step build plan and workflow
├── ROADMAP.md                  # 4-day sprint task breakdown by team member
├── CPBA-ANALYSIS.md            # Current-Problem-Benefits-Approach analysis
└── CD-SETUP.md                 # CI/CD deployment setup instructions
```

---

## Team

| Member | Role | Focus Areas |
|---|---|---|
| **Ibrahima** | Project Lead | TMDB API integration, project coordination, CI/CD |
| **Joshua** | Frontend Developer | UI/UX components, Netflix-style styling, feature UI |
| **Yaasameen** | Backend/Logic Developer | Express server, PostgreSQL, data persistence logic |

---

## Git Workflow

```bash
# Create a feature branch
git checkout -b your-name/feature-description

# Make changes, then stage and commit
git add .
git commit -m "Add feature description"

# Push your branch
git push origin your-name/feature-description

# Open a Pull Request on GitHub to merge into main
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run tmdb:cache` | Fetch fresh TMDB data and save to `tmdbCache.json` |

---

## License

This project is for educational purposes as part of Pursuit's fellowship program.