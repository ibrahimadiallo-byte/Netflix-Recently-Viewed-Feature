# CPBA FRAMEWORK ANALYSIS

## Netflix Clone: Recently Viewed Feature

**Team:** Ibrahima, Joshua, Yaasameen | **February 16-19, 2026**

---

## Executive Summary

This document provides a comprehensive CPBA (Current-Problem-Benefits-Approach) analysis for implementing a 'Recently Viewed' feature in our Netflix clone. The analysis breaks down the 4-day development sprint into actionable tasks with clear ownership and measurable outcomes.

| Attribute | Details |
|-----------|---------|
| **Project** | Netflix Clone - Recently Viewed Feature |
| **Timeline** | Feb 16-19, 2026 (4 days) |
| **Team** | Ibrahima (Lead), Joshua (Frontend), Yaasameen (Logic/Storage) |
| **Tech Stack** | React + Vite, localStorage, TMDB API |
| **Success Metric** | Demo-ready feature by Wed Feb 19 |

---

## CPBA Framework Analysis

### Current State (C)

#### What exists now

- Netflix-style landing page with sign-in functionality
- Logged-in homepage with hero section and content rows
- Placeholder images (picsum) in content thumbnails
- Basic navigation and UI components
- No viewing history tracking or display
- No real movie/show data integration

#### Current User Pain Points

- Users browse multiple titles but can't easily return to them
- No persistence of user interaction with content
- Netflix buries viewing history in settings (6+ clicks to access)
- Difficult to rediscover content after browsing sessions

---

### Problem/Proposed State (P)

#### Root Cause Analysis

- Netflix prioritizes new content discovery over viewing history access
- Viewing history is treated as account data, not browsing convenience
- No quick access pattern for 'recently viewed but not watched' content
- Poor UX creates friction for users who want to revisit browsed content

#### Proposed Solution

- Add 'Recently Viewed' section prominently on homepage
- Track all content clicks, not just playback starts
- Display last 10 viewed items with persistent storage
- One-click access to previously browsed content
- Real movie/show data via TMDB API for demo quality

#### Success Criteria

| Metric | Target |
|--------|--------|
| **Click Reduction** | From 6+ clicks to 1 click |
| **Feature Visibility** | 100% visibility on homepage |
| **Data Persistence** | Survives browser refresh/close |
| **Demo Quality** | Real movie posters + thumbnails |

---

### Benefits (B)

#### User Experience Benefits

- **Reduced frustration:** Users can easily return to browsed content
- **Improved discovery:** Recently viewed becomes a personalized content rail
- **Better engagement:** Lower barrier to content re-engagement
- **Familiar pattern:** Matches user mental models from other platforms

#### Business Benefits

- Increased session time through easier content rediscovery
- Higher conversion: Users more likely to watch previously browsed content
- Reduced search abandonment: Quick access to recent interests
- Portfolio demonstration: Shows UX thinking and problem-solving skills

#### Technical Learning Benefits

- localStorage implementation and data persistence patterns
- State management for user interactions
- API integration experience with TMDB
- Component architecture for dynamic content lists

---

### Approach/Action Plan (A)

#### Team Role Split & Workflow

| Team Member | Primary Responsibilities | Secondary Support |
|-------------|-------------------------|-------------------|
| **Ibrahima (Lead)** | Project coordination, TMDB API integration, demo prep | Code review, testing, presentation |
| **Joshua (Frontend)** | UI components, Recently Viewed section, styling | Click tracking, thumbnail layout |
| **Yaasameen (Logic)** | localStorage helpers, data models, click tracking | Testing, edge cases, data flow |

---

## 4-Day Sprint Breakdown

### Day 1 - Sunday, Feb 16: Foundation

**Status: Complete ✅**

- Netflix-style UI already implemented
- Project structure and basic components ready
- Sign-in/sign-out functionality working

### Day 2 - Monday, Feb 17: Core Implementation

| Priority | Task | Owner | Hours |
|----------|------|-------|-------|
| **P0** | TMDB API integration + real movie posters | Ibrahima | 3-4h |
| **P0** | localStorage helpers (getRecentlyViewed, trackView) | Yaasameen | 2-3h |
| **P0** | Recently Viewed UI section + thumbnail grid | Joshua | 2-3h |
| **P1** | Click tracking on all thumbnails | Team | 1-2h |

**End of Day 2 Goal:** Recently Viewed section displays real movie data

### Day 3 - Tuesday, Feb 18: Polish & Testing

| Priority | Task | Owner | Hours |
|----------|------|-------|-------|
| **P0** | Full integration testing (click → store → display) | All | 2h |
| **P0** | Data persistence testing (refresh/close browser) | Yaasameen | 1h |
| **P0** | UI polish (hover effects, empty state) | Joshua | 2h |
| **P1** | Optional: Timestamps, remove buttons | TBD | 2-3h |

**End of Day 3 Goal:** Feature complete and bug-free

### Day 4 - Wednesday, Feb 19: Demo Day

- Final smoke testing on all team member machines
- Demo script preparation and practice
- Backup plan (screenshots/video) if live demo fails
- Class presentation delivery

---

## Technical Implementation Architecture

### Data Model

**Recently Viewed Item Structure:**

```javascript
{
  id: "unique-item-id",
  userId: "demo-user",
  contentId: "movie-123",
  title: "Stranger Things",
  thumbnailUrl: "https://image.tmdb.org/t/p/w500/path.jpg",
  viewedAt: "2026-02-17T14:30:00Z",
  contentType: "series"
}
```

### Core Functions

| Function | Purpose | Owner |
|----------|---------|-------|
| `trackView()` | Add item to recently viewed, limit to 10, dedupe | Yaasameen |
| `getRecentlyViewed()` | Fetch last 10 items, sort by newest first | Yaasameen |
| `fetchTMDBData()` | Get real movie/show data and poster URLs | Ibrahima |
| `RecentlyViewed` component | Display thumbnails in Netflix-style grid | Joshua |

---

## Risk Analysis & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Not finishing by Wed** | Medium | High | Minimal viable scope: core feature only, no optional features |
| **TMDB API rate limits** | Low | Medium | Cache responses in JSON file, use demo data if needed |
| **localStorage data loss** | Medium | Low | Accept as demo limitation, mention in presentation |
| **Team coordination** | Low | Medium | Daily 15-min standups, clear task ownership |
| **Demo day bugs** | Medium | High | Thorough testing Tue, backup screenshots/video ready |

---

## Success Measurement & Testing

### Test Cases (Must Pass by Tuesday)

| ID | Test Case | Expected Result |
|----|-----------|-----------------|
| **TC-1** | Click movie thumbnail in any content row | Item appears in Recently Viewed section |
| **TC-2** | Click 10 different movie thumbnails | All 10 show in Recently Viewed, newest first |
| **TC-3** | Click 11th different movie thumbnail | Oldest item removed, new item appears at top |
| **TC-4** | Refresh browser page | Recently Viewed data persists and displays |
| **TC-5** | Close browser, reopen application | Recently Viewed data still present |
| **TC-6** | Click thumbnail in Recently Viewed section | Navigate to content (updates timestamp) |

---

## Daily Workflow & Coordination

### Daily Standup Format (15 minutes)

1. What did I complete yesterday?
2. What am I working on today?
3. Any blockers or dependencies?
4. Quick sync on integration points

### Git Workflow

- **Main branch:** production-ready code only
- **Feature branches:** `feature/recently-viewed-ui`, `feature/tmdb-integration`, etc.
- Pull requests required for main branch
- Code review by at least one other team member

### Integration Points (Critical)

- Yaasameen's localStorage helpers ↔ Joshua's UI components
- Ibrahima's TMDB data ↔ Both UI and storage systems
- All click tracking events need consistent data format
- Coordinate on data structure early (Monday morning)

---

## Demo Day Preparation

### Demo Script (5-minute presentation)

1. Open Netflix clone → Sign In
2. Show homepage with real movie posters
3. Click 3-4 different movie thumbnails
4. Scroll to 'Recently Viewed' section
5. Show clicked items appearing newest first
6. Refresh page → show persistence
7. Explain the UX improvement vs Netflix's buried history

### Backup Plan

- Screen recording of working feature (2-3 minutes)
- Screenshots of key functionality
- Code walkthrough if live demo fails
- Each team member prepared to explain their contribution

---

## Conclusion

This CPBA analysis provides a structured framework for implementing the Recently Viewed feature within our 4-day sprint. By clearly defining current state pain points, quantified benefits, and a detailed execution approach, the team can deliver a demo-quality feature that solves real user problems.

The key to success will be maintaining focus on the core P0 features, effective daily coordination, and thorough testing before demo day. This project demonstrates both technical implementation skills and user-centered design thinking.

---

## Appendix: Quick Reference

### Repository & Setup

```bash
git clone https://github.com/ibrahimadiallo-byte/Netflix-Recently-Viewed-Feature.git
cd Netflix-Recently-Viewed-Feature
npm install
npm run dev
# → http://localhost:5173
```

### Key localStorage Functions

```javascript
// Yaasameen's core functions
trackView(userId, content)      // Add to recently viewed
getRecentlyViewed(userId)       // Get last 10, newest first

// Storage key: "netflix-recently-viewed"
```
