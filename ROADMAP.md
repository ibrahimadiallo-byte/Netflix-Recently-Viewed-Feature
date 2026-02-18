# NETFLIX CLONE: TASK BREAKDOWN & WORKFLOW

## 4-Day Sprint: February 16-19, 2026

| Day | Ibrahima (Lead) | Joshua (Frontend) | Yaasameen (Logic) | Team Coordination | Daily Goal |
|-----|-----------------|-------------------|-------------------|-------------------|------------|
| **Sun Feb 16** | ✅ Project setup<br>✅ Netflix UI complete<br>✅ Basic structure | ✅ UI components<br>✅ Styling system<br>✅ Layout structure | ✅ Environment setup<br>✅ Understanding codebase<br>✅ Planning data structure | ✅ Team sync<br>✅ Role confirmation<br>✅ Timeline review | ✅ **Foundation Complete**<br>Netflix-style UI ready for features |
| **Mon Feb 17** | 🔥 TMDB API integration<br>🔥 Get API key + setup<br>🔥 Fetch movie/show data<br>🔥 Replace placeholder images | 🔥 Recently Viewed UI<br>🔥 Thumbnail grid layout<br>🔥 Section positioning<br>🔥 Netflix-style hover effects | 🔥 localStorage helpers<br>🔥 trackView() function<br>🔥 getRecentlyViewed()<br>🔥 Data persistence logic | 🔄 Morning standup<br>🔄 Integration sync<br>🔄 Data format alignment<br>🔄 Evening check-in | 🎯 **Core Feature Working**<br>Real movie data + Recently Viewed section displays data |
| **Tue Feb 18** | 🔧 Integration testing<br>🔧 TMDB data validation<br>🔧 Performance optimization<br>🔧 Demo environment prep | 🔧 UI polish & testing<br>🔧 Hover states<br>🔧 Empty state handling<br>🔧 Responsive layout | 🔧 Click tracking integration<br>🔧 Data persistence testing<br>🔧 Edge case handling<br>🔧 Browser compatibility | 🧪 Full team testing<br>🧪 Bug identification<br>🧪 Feature completion<br>🧪 Demo script prep | ✅ **Feature Complete**<br>Bug-free, tested, demo-ready |
| **Wed Feb 19** | 🎬 Demo coordination<br>🎬 Technical presentation<br>🎬 Q&A preparation<br>🎬 Backup plan ready | 🎬 UI demonstration<br>🎬 Feature walkthrough<br>🎬 Design decisions<br>🎬 Visual presentation | 🎬 Logic explanation<br>🎬 Technical implementation<br>🎬 Data flow overview<br>🎬 Architecture discussion | 🎯 Final testing<br>🎯 Demo rehearsal<br>🎯 Presentation delivery<br>🎯 Success celebration | 🏆 **Demo Success**<br>Class presentation delivered |

---

## 🔥 CRITICAL PATH ITEMS

| Day | Owner | Priority | Critical Deliverable |
|-----|-------|----------|---------------------|
| Monday | Yaasameen | **P0 - BLOCKER** | localStorage functions must work before UI integration. Without this, nothing else can proceed. |
| Monday | Ibrahima | **P0 - CRITICAL** | TMDB API data must be ready for Joshua's UI components. Demo quality depends on real movie posters. |
| Tuesday | Team | **P0 - DEMO** | All integration testing must be complete. No new features after Tuesday. Demo day is for presentation only. |

---

## 🔄 INTEGRATION CHECKPOINTS

| Checkpoint | Required Components | Success Criteria |
|------------|---------------------|------------------|
| **Monday 12pm** | Data structure agreed<br>API endpoints defined | All team members know: Recently Viewed item structure, localStorage key names, function signatures |
| **Monday 6pm** | Yaasameen's storage + Ibrahima's TMDB data | Can store real movie data in localStorage and retrieve it. Console.log shows correct data flow. |
| **Tuesday 12pm** | Joshua's UI + storage integration | Recently Viewed section displays real data from localStorage. Clicking thumbnails adds to storage. |
| **Tuesday 8pm** | Complete feature testing | All test cases pass. Feature works on all team members' machines. Demo script ready. |

---

## ⚠️ RISK MITIGATION

| Risk | Owner | Prevention | Backup Plan |
|------|-------|------------|-------------|
| **TMDB API fails** | Ibrahima | Test API thoroughly Monday morning. Cache successful responses in JSON file. | Use curated list of movie data with placeholder images. Focus on functionality over real data. |
| **localStorage issues** | Yaasameen | Test across different browsers Monday. Implement error handling for quota exceeded. | Use in-memory storage (resets on refresh) but feature still demos the core functionality. |
| **Integration problems** | Team | Daily standups. Shared data contracts. Early integration testing Monday evening. | Simplify to basic version: click tracking + display. Remove advanced features like timestamps. |
| **Demo day bugs** | Team | No new code Wednesday. Test on demo machine. Practice run Tuesday night. | Screen recording + screenshots ready. Code walkthrough if live demo fails. Clear explanation of what would work. |

---

## Team Members

- **Ibrahima** - Lead / API Integration
- **Joshua** - Frontend / UI Components  
- **Yaasameen** - Logic / Data Persistence
