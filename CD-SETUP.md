# Continuous Deployment (CD) Setup

This repo has GitHub Actions for automatic deployment on push to `main`.

## Backend Deployment (Railway)

**File:** `.github/workflows/deploy-backend.yml`

**Triggers:** Push to `main` with changes in `/server` folder

### Setup Steps:

1. **Get Railway Token:**
   - Go to railway.app → Account → API Tokens
   - Create new token → Copy it

2. **Add GitHub Secrets:**
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Click **"New repository secret"**
   - Add `RAILWAY_TOKEN` = (your Railway token)
   - Add `RAILWAY_SERVICE_ID` = (found in Railway project settings)

3. **Test:** Push to main branch → Workflow runs automatically

---

## Frontend Deployment (Vercel)

**File:** `.github/workflows/deploy-frontend.yml`

**Triggers:** Push to `main` with changes in `/src`, `index.html`, `package.json`, etc.

### Setup Steps:

1. **Create Vercel Project:**
   - Go to vercel.com → Connect your GitHub repo
   - Select this repo
   - Set **Root Directory:** `.` (project root, not `/server`)
   - Set **Build Command:** `npm run build`
   - Set **Install Command:** `npm install`

2. **Get Vercel Credentials:**
   - Go to vercel.com → Account Settings → Tokens
   - Create token → Copy it

3. **Add GitHub Secrets:**
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - `VERCEL_TOKEN` = (your Vercel token)
   - `VERCEL_ORG_ID` = (find in Vercel account)
   - `VERCEL_PROJECT_ID` = (find in Vercel project settings)

4. **Test:** Push to main branch → Workflow runs automatically

---

## What Happens on Push

### Backend
```
1. Push code to GitHub (server/ folder)
2. GitHub Actions triggers
3. Builds and deploys to Railway
4. API available at https://netflix-recently-viewed-feature-production.up.railway.app
```

### Frontend
```
1. Push code to GitHub (src/ folder)
2. GitHub Actions triggers
3. Builds with Vite
4. Deploys to Vercel
5. App available at https://your-vercel-url.vercel.app
```

---

## Monitoring Deployments

- Go to GitHub repo → **Actions** tab
- See all workflow runs
- Click on any run to see logs

---

## Environment Variables

### Railway (Backend)
```
DATABASE_URL = postgresql://...
NODE_ENV = production
FRONTEND_URL = https://your-vercel-url.vercel.app
```

### Vercel (Frontend)
```
VITE_API_URL = https://netflix-recently-viewed-feature-production.up.railway.app
```

---

## Troubleshooting

If deployment fails:
1. Check **Actions** tab for error logs
2. Verify all secrets are added correctly
3. Check branch is `main`
4. Verify file paths in workflow match your actual files
