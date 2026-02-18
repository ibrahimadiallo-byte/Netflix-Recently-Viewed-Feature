# Netflix Clone – Team Plan

**One place for the whole team.** No one should be confused or out of the loop.

---

## Quick links

| Resource | What it is |
|----------|------------|
| [README.md](./README.md) | Full Product Requirements Document (PRD) – problem, requirements, user stories, timeline |
| This file | Step-by-step plan, who does what, how to run the app, demo checklist |

**Repo:** [Netflix-Recently-Viewed-Feature](https://github.com/ibrahimadiallo-byte/Netflix-Recently-Viewed-Feature)  
**Team:** Ibrahima, Joshua, Yaasameen  
**Target launch:** Wednesday, February 19, 2026 (demo-ready)

**Timeline:** Feature complete by **Tuesday, Feb 18**. Wednesday Feb 19 = demo prep & presentation only (no new builds).

---

## 1. How to run the project (everyone do this first)

```bash
# Clone (if you don’t have it yet)
git clone https://github.com/ibrahimadiallo-byte/Netflix-Recently-Viewed-Feature.git
cd Netflix-Recently-Viewed-Feature

# Get latest
git pull origin main

# Install and run
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

- **Landing page** → Click **Sign In** to see the logged-in homepage.
- **Profile (green avatar) → “Sign out of Netflix”** → back to landing.

### Team setup notes (new)

- Pull latest main before working:

```bash
git pull origin main
```

- Local posters/backdrop are bundled, so everyone should see the same images by default.
- TMDB is **off by default**. Enable only if needed:

```env
VITE_USE_TMDB=true
VITE_TMDB_KEY=your_key
```

- API mode (Railway) if you want backend storage:

```env
VITE_USE_API=true
VITE_API_URL=https://<railway-app>.up.railway.app
```

- The hero badge shows **Local Mode** or **API Mode** so you can confirm which data source is active.

---

## 2. What’s already done

- [x] Netflix-style **landing page** (logo, hero, email CTA, Sign In, dark theme).
- [x] **Logged-in homepage**: header (nav, search, notifications, profile), hero with Play/More Info, content rows with thumbnails.
- [x] Sign In / Sign out toggles (no real auth – demo only).
- [x] Placeholder images (picsum) – will be replaced with real movie/show images for the demo.

---

## 3. What we’re building next (in order)

### Phase A: Real movie & show images (demo quality)

So the clone looks like Netflix with real posters/backdrops.

| Step | Task | Notes |
|------|------|--------|
| A1 | Get a **TMDB API key** | Sign up at [themoviedb.org](https://www.themoviedb.org), create an API key (free). |
| A2 | Add **TMDB integration** | Fetch trending/popular movies and shows; get poster and backdrop URLs. Use `.env` (e.g. `VITE_TMDB_KEY`) and add `.env` to `.gitignore` so the key is never committed. |
| A3 | **Replace placeholders** | Point hero backdrop and all content row thumbnails to TMDB image URLs (e.g. `https://image.tmdb.org/t/p/w500/{path}`). |
| A4 | **Optional:** Pre-save response to a JSON file so the demo doesn’t depend on live API during the presentation. | |

**Owner:** TBD (good for whoever is comfortable with APIs or frontend data).

---

### Phase B: Recently Viewed – core (must-have)

| Step | Task | Notes |
|------|------|--------|
| B1 | **Data model** | Define a “recently viewed” item: `id`, `userId` (e.g. `"demo-user"`), `contentId`, `title`, `thumbnailUrl`, `viewedAt`, `contentType`. Same shape in code and in `localStorage`. |
| B2 | **Storage helpers** | Implement `getRecentlyViewed(userId)` (read from `localStorage`, sort by `viewedAt` newest first, return last 10) and `trackView(userId, content)` (add view, dedupe by content, keep last 10, write back to `localStorage`). |
| B3 | **Track clicks** | When a user clicks a title/thumbnail in any content row, call `trackView` with that item’s data (e.g. `contentId`, `title`, `thumbnailUrl`). |
| B4 | **“Recently Viewed” section** | Add a new row on the homepage titled **“Recently Viewed”**, placed below the hero and above other rows. |
| B5 | **Show the list** | In that row, render the list from `getRecentlyViewed(userId)`: same thumbnail + title style as other rows, horizontal scroll, 5 per row on desktop. |
| B6 | **Clickable row** | Clicking a thumbnail in “Recently Viewed” should open/navigate to that content (and can call `trackView` again so it stays recent). |
| B7 | **Persistence** | Use a stable `localStorage` key (e.g. `netflix-recently-viewed` or `netflix-recently-viewed-${userId}`). Confirm list survives refresh and closing the browser. |
| B8 | **Limit to 10** | In `trackView`, after adding a new view, keep only the last 10 items; `getRecentlyViewed` returns at most 10. |

**Owner:** TBD (split between frontend and “logic” if you want – e.g. one person storage/helpers, another UI row).

---

### Phase C: Polish & UX

| Step | Task |
|------|------|
| C1 | **Sort order** | “Recently Viewed” always newest first (already in B2; verify). |
| C2 | **Empty state** | When 0 recent views: hide the row or show “Nothing viewed yet. Click any title to see it here.” |
| C3 | **Hover / styling** | Same hover (scale/glow) and thumbnail styling as other rows. |
| C4 | **Smoke test** | Click 1 title → appears in Recently Viewed. Click 10 different titles → all 10 show. Click 11th → oldest drops off. Refresh → list still there. |

---

### Phase D: Optional (if time)

| Step | Task |
|------|------|
| D1 | **Timestamp** | Show “Viewed 2 hours ago” under each thumbnail using `viewedAt`. |
| D2 | **Remove single item** | “X” on hover to remove that item from Recently Viewed. |
| D3 | **Clear all** | “Clear all” / “Clear history” for Recently Viewed. |

---

### Phase E: Demo readiness (by Feb 19)

| Step | Task |
|------|------|
| E1 | **Test on everyone’s machine** | Each person: clone, `npm install`, `npm run dev`, verify landing → Sign In → browse → Recently Viewed works. |
| E2 | **Demo script** | Short script: open app → Sign In → click a few titles → scroll to “Recently Viewed” → show it updates and persists. |
| E3 | **Backup** | If live demo fails: have a short screen recording or screenshots of the feature working. |

---

## 4. Tech reminders

- **Storage:** `localStorage` for Recently Viewed (key like `netflix-recently-viewed` or per-user).
- **User for demo:** Use a fixed id (e.g. `"demo-user"`) or simple “current user”; no real auth required.
- **Stack:** React + Vite. Add the “Recently Viewed” row in the same place other content rows are rendered (e.g. `HomePage.jsx`).
- **Images:** TMDB for real movie/show art; keep API key in `.env` and out of the repo.

---

## 5. Ways to contribute (any of us can do any of these)

No fixed roles — pick whatever you want to work on. If someone’s already on a task, choose another so we’re all included and nothing is left behind.

| Area | What to do | Who |
|------|------------|-----|
| **Real images (Phase A)** | TMDB API key, fetch movies/shows, wire poster/backdrop URLs into hero and rows | Any |
| **Recently Viewed – storage (Phase B)** | Data shape, `getRecentlyViewed`, `trackView`, limit 10, `localStorage` key | Any |
| **Recently Viewed – UI (Phase B)** | New “Recently Viewed” row, render list, same thumbnail style, horizontal scroll | Any |
| **Click tracking (Phase B)** | On thumbnail/title click, call `trackView`; make Recently Viewed thumbnails clickable | Any |
| **Polish (Phase C)** | Empty state, hover styles, sort order, smoke test the full flow | Any |
| **Optional (Phase D)** | Timestamps, remove-one “X”, clear-all button | Any |
| **Demo prep (Phase E)** | Demo script, test on your machine, backup video or screenshots, coordinate who presents what | Any |

**How to stay in sync:** Short daily check-in (e.g. 15 min) until Feb 19. Say what you’re doing and what’s done so no one is confused and everyone can jump in somewhere.

---

## 6. Timeline (by Feb 18)

| Day | Focus | Goal |
|-----|--------|------|
| **Sun Feb 16** | — | Done: landing + logged-in UI |
| **Mon Feb 17** | Phase A + Phase B | Real images (TMDB) + Recently Viewed core working |
| **Tue Feb 18** | Phase C (+ optional D) | Polish, testing, feature complete |
| **Wed Feb 19** | Phase E only | Demo run-through, backup, present |

If you split Phase A and B across two people, Mon–Tue is enough to finish everything by **Feb 18**.

---

## 7. Suggested order (within each day)

1. **Phase A** (real images) – do early so the rest of the work looks like Netflix.
2. **Phase B** (Recently Viewed core) – B1 → B2 → B3 → B4 → B5 → B6 → B7 → B8.
3. **Phase C** (polish and smoke test).
4. **Phase D** only if you have time.
5. **Phase E** right before the demo (Feb 19).

---

## 8. Checklist before demo day

- [ ] Real movie/show images (TMDB) wired and working.
- [ ] Recently Viewed section visible on homepage below hero.
- [ ] Clicking a title adds it to Recently Viewed; list shows last 10, newest first.
- [ ] Data persists after refresh and after closing the browser.
- [ ] All three teammates have run the app and verified the flow.
- [ ] Demo script and backup (video or screenshots) ready.

---

*Last updated: February 2026. For full requirements and context, see [README.md](./README.md) (PRD).*
