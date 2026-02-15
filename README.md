# Netflix-Recently-Viewed-Feature
Product Requirements Document (PRD)
Recently Viewed Feature for Netflix Clone

Document Information
Field
Details
Product Name
Netflix Clone - Recently Viewed Feature
Team Members
Ibrahima, Joshua, Yaasmeen
Document Owner
Ibrahima
Created Date
February 15, 2026
Target Launch
February 19, 2026 (Wednesday)
Status
In Development


1. Executive Summary
What are we building?
A "Recently Viewed" section on the Netflix clone homepage that displays the last 10 items a user has viewed, making it easy to find and re-access content without digging through settings.
Why are we building it?
Currently, Netflix buries viewing history deep in account settings (Settings → Account → Viewing Activity), requiring 6+ clicks to find previously watched content. This creates friction and frustration for users who want to re-watch or continue exploring content they've seen before.
Success Criteria
Users can see their recently viewed content in 1 click (on homepage)
Feature is live and functional by Wednesday, February 19, 2026
Demo-ready for class presentation

2. Problem Statement
Current Pain Points:
Hidden Feature: Netflix's viewing history is buried in settings, not easily discoverable
Too Many Clicks: Requires 6+ navigation steps to access viewing history
Poor UX: Users forget what they were browsing and can't easily return to it
No Quick Access: Unlike "Continue Watching," there's no prominent section for recently viewed (but not necessarily unfinished) content
User Impact:
Users waste time searching for content they already found
Frustration leads to disengagement
Missed opportunity for re-engagement with content

3. Target Users
Primary User:
Frequent Netflix users who browse multiple titles before deciding what to watch
Users who want to return to content they previewed but didn't finish
Users who re-watch favorite shows/movies
User Persona Example:
"Casual Binger Chris"
Age: 22, college student
Behavior: Browses 10-15 titles before picking one to watch
Pain Point: Forgets which shows looked interesting after browsing
Need: Quick way to see what they recently looked at

4. Goals & Objectives
Business Goals:
Improve user experience and reduce friction
Increase user engagement and session time
Demonstrate UX thinking and problem-solving skills
User Goals:
Easily find recently viewed content
Reduce clicks needed to access viewing history
Re-discover content they were interested in
Technical Goals:
Build a working prototype by Wednesday
Track user viewing behavior
Display data in clean, Netflix-style UI

5. Success Metrics
Key Performance Indicators (KPIs):
Metric
Target
How to Measure
Click Reduction
From 6+ clicks to 1 click
User flow comparison
Feature Visibility
100% of users see it on homepage
Placement on main page
Demo Readiness
Fully functional by Feb 19
Team testing
User Satisfaction
Positive feedback in presentation
Class feedback


6. Requirements
6.1 Functional Requirements (Must-Have)
ID
Requirement
Priority
Owner
FR-1
Display "Recently Viewed" section on homepage
P0 (Critical)
Team
FR-2
Track when user clicks on a title/thumbnail
P0 (Critical)
TBD
FR-3
Store last 10 viewed items per user
P0 (Critical)
TBD
FR-4
Display thumbnails in grid format
P0 (Critical)
TBD
FR-5
Show title name under each thumbnail
P0 (Critical)
TBD
FR-6
Make thumbnails clickable to re-access content
P0 (Critical)
TBD
FR-7
Sort items by most recent first
P0 (Critical)
TBD
FR-8
Persist data across sessions
P0 (Critical)
TBD

6.2 Functional Requirements (Nice-to-Have)
ID
Requirement
Priority
Owner
FR-9
Show timestamp ("Viewed 2 days ago")
P1 (Optional)
TBD
FR-10
Add "X" button to remove items from list
P1 (Optional)
TBD
FR-11
Hover effect with preview/description
P2 (If time)
TBD
FR-12
Progress bar showing watch completion
P2 (If time)
TBD

6.3 Technical Requirements
ID
Requirement
Details
TR-1
Data Storage
Use localStorage or simple database (Firebase/Supabase)
TR-2
Frontend Framework
React, Vue, or vanilla JavaScript
TR-3
Styling
Match Netflix design (black background, red accents, grid layout)
TR-4
Responsive Design
Works on desktop (mobile optional)
TR-5
Browser Support
Chrome/Firefox (latest versions)

6.4 Design Requirements
ID
Requirement
Details
DR-1
Section Title
"Recently Viewed" heading above content grid
DR-2
Thumbnail Size
Consistent with Netflix thumbnail dimensions
DR-3
Grid Layout
5 items per row on desktop
DR-4
Placement
Below hero banner, above "Continue Watching" (if exists)
DR-5
Hover State
Slight scale/glow effect on thumbnails


7. User Stories
As a user, I want to...
Story 1:
"As a frequent browser, I want to see my recently viewed titles on the homepage so that I can easily return to content I was interested in without searching again."
Acceptance Criteria:
Recently Viewed section appears on homepage
Shows last 10 items I clicked on
Items are sorted newest to oldest
I can click to re-access the content
Story 2:
"As someone who browses before deciding, I want to quickly revisit shows I looked at yesterday so that I don't have to remember or search for them again."
Acceptance Criteria:
Content I viewed yesterday appears in Recently Viewed
Data persists even after I log out and back in
Thumbnails are clearly visible and clickable
Story 3:
"As a user, I want the Recently Viewed section to look and feel like Netflix so that it feels familiar and professional."
Acceptance Criteria:
Design matches Netflix's black background and grid style
Thumbnails have hover effects
Section blends naturally with homepage layout

8. Out of Scope (Not Building)
❌ What we're NOT doing:
Mobile app version
User authentication/login system (use fake/demo users)
Integration with real Netflix API
"Continue Watching" feature (separate from Recently Viewed)
Recommendations based on viewing history
Social sharing of recently viewed content
Multiple user profiles
Video playback functionality

9. User Flow
Current State (Netflix):
User → Settings Icon → Account → Viewing Activity → Scroll through list → Find content
(6+ clicks, buried in settings)
Our Solution (Netflix Clone):
User → Homepage → Recently Viewed Section → Click thumbnail → Access content
(1 click, prominent placement)

10. Design & Wireframes
10.1 Homepage Layout
┌─────────────────────────────────────────────────────┐
│  NETFLIX CLONE LOGO                    [Profile]    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [HERO BANNER - Featured Content]                   │
│                                                      │
├─────────────────────────────────────────────────────┤
│  Recently Viewed                                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  │               │
│  └────┘ └────┘ └────┘ └────┘ └────┘               │
│  Title1  Title2  Title3  Title4  Title5             │
│                                                      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  │ 6  │ │ 7  │ │ 8  │ │ 9  │ │ 10 │               │
│  └────┘ └────┘ └────┘ └────┘ └────┘               │
│  Title6  Title7  Title8  Title9  Title10            │
├─────────────────────────────────────────────────────┤
│  Trending Now                                        │
│  [More content rows...]                             │
└─────────────────────────────────────────────────────┘
10.2 Recently Viewed Section Detail
┌──────────────────────────────────────────┐
│  Recently Viewed                          │
│                                           │
│  ┌──────────┐  ┌──────────┐             │
│  │          │  │          │             │
│  │  Image   │  │  Image   │   ...       │
│  │          │  │          │             │
│  └──────────┘  └──────────┘             │
│   Stranger      Breaking                 │
│   Things        Bad                      │
│   (Viewed 1hr ago)  (Viewed 3hrs ago)   │  ← Optional timestamp
└──────────────────────────────────────────┘

11. Technical Architecture
11.1 Data Model
javascript
// Recently Viewed Item
{
  id: "unique-item-id",
  userId: "user-123",
  contentId: "show-456",
  title: "Stranger Things",
  thumbnailUrl: "https://image-url.jpg",
  viewedAt: "2026-02-15T14:30:00Z",
  contentType: "series" // or "movie"
}
11.2 Core Functions
javascript
// Track View
function trackView(userId, contentId) {
  // Add to recently viewed list
  // Limit to last 10 items
  // Update timestamp
}

// Get Recently Viewed
function getRecentlyViewed(userId) {
  // Fetch last 10 items for user
  // Sort by timestamp (newest first)
  // Return array of items
}

// Clear Recently Viewed (optional)
function clearRecentlyViewed(userId, contentId) {
  // Remove specific item from list
}
```

### **11.3 Technology Stack**

| **Component** | **Technology** | **Reason** |
|---------------|----------------|------------|
| Frontend | React / HTML+CSS+JS | Fast development, component-based |
| Styling | CSS (Netflix clone) | Match Netflix look and feel |
| Data Storage | localStorage | Simple, no backend needed for demo |
| State Management | React useState | Keep it simple |
| Images | Placeholder or free stock | No copyright issues |

---

## **12. Implementation Plan**

### **Sprint Timeline (4 Days)**

#### **Day 1 - Sunday, Feb 16 (Setup & UI)**
**Owner: TBD by team**
- [ ] Set up project repository
- [ ] Clone Netflix homepage layout (black background, header, grid)
- [ ] Create dummy movie/show data (10-20 items)
- [ ] Build basic thumbnail grid component

**Deliverable:** Static Netflix-looking homepage

---

#### **Day 2 - Monday, Feb 17 (Core Feature)**
**Owner: TBD by team**
- [ ] Implement click tracking on thumbnails
- [ ] Set up localStorage to save viewed items
- [ ] Build "Recently Viewed" section component
- [ ] Display recently viewed items on homepage

**Deliverable:** Working Recently Viewed feature (basic)

---

#### **Day 3 - Tuesday, Feb 18 (Polish & Testing)**
**Owner: TBD by team**
- [ ] Test click → save → display flow
- [ ] Add styling/hover effects
- [ ] Sort items by most recent
- [ ] Limit to last 10 items
- [ ] Fix any bugs

**Deliverable:** Polished, bug-free feature

---

#### **Day 4 - Wednesday, Feb 19 (Demo Prep)**
**Owner: Entire team**
- [ ] Final testing
- [ ] Prepare demo script
- [ ] Practice presentation
- [ ] Deploy (if needed) or run locally

**Deliverable:** Class presentation ready

---

## **13. Prioritization Framework Analysis**

### **13.1 Value vs. Effort Matrix**
```
     HIGH VALUE
         ↑
         │
    [RECENTLY VIEWED]  ← Quick Win!
         │
─────────┼──────────→ HIGH EFFORT
         │
         │
    LOW VALUE
Analysis:
Value: HIGH - Solves real user pain point, reduces friction
Effort: LOW - Simple data tracking + display
Category: QUICK WIN ✅
13.2 KANO Model Classification
Feature Type: Performance Feature 📈
Reasoning:
Not a Must-Have: Users can survive without it (Netflix currently doesn't have it prominently)
Not a Delighter: It's useful but not surprising/innovative
IS a Performance Feature: The better/more accessible we make viewing history, the happier users get
Satisfaction Curve:
Missing it = Minor inconvenience 😐
Basic version = Satisfied 😊
Advanced version (timestamps, remove button) = Very satisfied 😁

14. Risk Assessment
Risk
Likelihood
Impact
Mitigation
Not finishing by Wednesday
Medium
High
Keep scope minimal, focus on core feature only
localStorage data loss
Medium
Low
Accept as limitation for demo; mention in presentation
Team coordination issues
Low
Medium
Clear task division, daily check-ins
Design doesn't match Netflix
Low
Low
Use Netflix screenshots as reference
Bug during demo
Medium
High
Test thoroughly Tuesday, have backup plan


15. Dependencies
Internal Dependencies:
Team agrees on tech stack (React vs vanilla JS)
Repository setup and access for all team members
Task division among Ibrahima, Joshua, Yaasmeen
External Dependencies:
None (fully self-contained project)
Technical Dependencies:
Code editor (VS Code)
Browser for testing (Chrome/Firefox)
GitHub for version control (optional but recommended)
Netflix screenshots for design reference

16. Testing Plan
Test Cases:
Test ID
Test Case
Expected Result
Status
TC-1
Click on a movie thumbnail
Item appears in Recently Viewed
⬜ Not tested
TC-2
Click on 10 different items
All 10 show in Recently Viewed
⬜ Not tested
TC-3
Click on 11th item
Oldest item is removed, new item appears
⬜ Not tested
TC-4
Refresh page
Recently Viewed data persists
⬜ Not tested
TC-5
Close browser, reopen
Recently Viewed data still there
⬜ Not tested
TC-6
Click item in Recently Viewed
Navigate to content page
⬜ Not tested
TC-7
Hover over thumbnail
Hover effect appears
⬜ Not tested


17. Launch Checklist
Pre-Launch (Before Wednesday Demo):
All core features working (FR-1 through FR-8)
No critical bugs
Design matches Netflix aesthetic
Data persists across page refreshes
Team has practiced demo
Backup plan if live demo fails (screenshots/video)
Demo Day:
Project runs locally on demo computer
All team members understand the feature
Prepared answers to expected questions
PRD available if professor asks for documentation

18. Future Enhancements (Post-Launch)
If we had more time, we would add:
Timestamps ("Viewed 2 hours ago")
Remove button (X to clear individual items)
"Clear All" button
Hover preview with description
Watch progress bar
Separate "Recently Viewed" from "Continue Watching"
Cross-device sync
Analytics dashboard showing viewing patterns

19. Questions & Answers
Anticipated Questions:
Q: Why doesn't Netflix already have this? A: Netflix prioritizes content discovery and keeping users watching NEW content. Making old content easy to find doesn't align with their business goal of maximizing engagement with their full catalog. However, from a pure UX perspective, users would benefit from easier access to their viewing history.
Q: How is this different from "Continue Watching"? A: "Continue Watching" shows content you started but didn't finish. "Recently Viewed" shows EVERYTHING you clicked on, even if you just previewed it for 5 seconds or watched the whole thing. It's about access to browsing history, not just incomplete content.
Q: What data privacy concerns exist? A: Since this is a demo/clone, we're only storing viewing data locally in the user's browser. In a real product, we'd need to clearly communicate what viewing data is tracked and give users control to clear it. Netflix already tracks this data; we're just making it more accessible.
Q: How would this scale to millions of users? A: For our demo, we use localStorage (client-side). In production, we'd store this in a database with indexed queries on userId and timestamp. We'd only store the last 50-100 views per user and display the most recent 10 to keep data manageable.

20. Team Roles & Responsibilities
To Be Determined by Team:
Role
Team Member
Responsibilities
Project Lead
TBD (Ibrahima?)
Overall coordination, final decisions
Frontend Developer
TBD (Joshua?)
UI/UX, Netflix clone styling
Backend/Logic Developer
TBD (Yaasmeen?)
Data tracking, localStorage logic
Presenter
All 3
Demo presentation on Wednesday

Note: Roles can overlap. Recommend daily 15-min stand-ups.

21. Appendix
A. Resources
Netflix homepage screenshots for design reference
React documentation (if using React)
localStorage API documentation
CSS Grid/Flexbox guides
B. Glossary
PRD: Product Requirements Document
localStorage: Browser-based storage for saving data client-side
Thumbnail: Small preview image of movie/show
UX: User Experience
P0/P1/P2: Priority levels (0 = critical, 1 = important, 2 = nice-to-have)
C. Document History
Version
Date
Author
Changes
1.0
Feb 15, 2026
Ibrahima
Initial PRD creation


22. Sign-Off
Team Agreement: By signing below, we agree to the scope, timeline, and requirements outlined in this PRD.
Ibrahima: _________________ Date: _______
Joshua: _________________ Date: _______
Yaasmeen: _________________ Date: _______

End of PRD

That's your full PRD, Ibrahima!
This covers everything you need: ✅ Problem statement ✅ Requirements (must-have + nice-to-have) ✅ User stories ✅ Technical specs ✅ Timeline ✅ Risk assessment ✅ Testing plan ✅ Framework analysis (Value vs. Effort + KANO)
You can share this with Joshua and Yaasmeen so everyone's on the same page. Modify the "Team Roles" section once you divvy up tasks.

