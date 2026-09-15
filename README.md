# InternAtlas — Quizzes & Skill Assessment Module (MVP)

> **Live MVP Prototype for [internatlas.in](http://internatlas.in/)**  
> **Author / Lead Developer:** Surendra G (@surendra)  
> **Module:** Quizzes & Technical Evaluations

---

## 🌟 Overview & Product Vision

This module is designed to **solve the friction and poor UX of existing platforms like Internshala and Unstop**, delivering a 10x simpler, faster, and visually stunning student assessment experience.

### Key Objectives Achieved:
1. **Frictionless Discovery:** Filter assessments by category (*Full Stack, DSA, Frontend, Backend, Aptitude, GenAI*), difficulty, and status (*Live, Practice, Upcoming*).
2. **Interactive Test Runner (Live Quiz Arena):**
   - High-focus fullscreen testing environment.
   - Real-time countdown timer with critical-time visual warnings.
   - Comprehensive question palette (Answered, Marked for Review, Skipped).
   - Code snippet highlighting for technical engineering challenges.
3. **Instant Results & National Leaderboard:**
   - Real-time scorecard, accuracy percentage, time taken, and percentile calculations.
   - Live ranked leaderboard featuring top performers across colleges (IITs, BITS, NITs).
   - Detailed question-by-question breakdown with deep technical explanations.
4. **Host / Create Quiz (Full Stack Readiness):**
   - Organizers and recruiters can create and publish timed challenges with custom questions and prize pools.
   - Data persists across browser sessions using an asynchronous client-side store that seamlessly maps to backend REST/GraphQL APIs.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (v4), Plus Jakarta Sans typography
- **Icons & Animation:** Lucide React, Canvas Confetti
- **Storage & State:** Modular Service Layer (`quizService.ts`) with typed schemas and localStorage persistence

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to the project directory
cd C:\Users\SURENDRA.G\.gemini\antigravity\scratch\internatlas-quizzes

# 2. Run the development server
npm run dev

# 3. Open in browser:
http://localhost:5173
```

---

## 📦 Project Structure

```
internatlas-quizzes/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # InternAtlas global navigation bar
│   │   ├── Hero.tsx               # High-converting assessment hero with metrics
│   │   ├── QuizFilters.tsx        # Search, categories, and difficulty filtering
│   │   ├── QuizCard.tsx           # Modern assessment cards with prize tags
│   │   ├── QuizDetailsModal.tsx   # Detailed syllabus & guidelines modal
│   │   ├── LiveQuizArena.tsx      # Proctored test-taking player
│   │   ├── QuizResultsView.tsx    # Scorecard, confetti, solutions & leaderboard
│   │   └── CreateQuizModal.tsx    # Employer/Organizer quiz creator
│   ├── data/
│   │   └── mockQuizzes.ts         # High-yield assessments across multiple domains
│   ├── services/
│   │   └── quizService.ts         # Mock REST API service with persistence & scoring
│   ├── types/
│   │   └── quiz.ts                # Strict TypeScript domain models
│   ├── App.tsx                    # Main state machine and screen router
│   ├── index.css                  # Tailwind CSS styling
│   └── main.tsx                   # React root entrypoint
├── index.html
├── vite.config.ts
└── package.json
```
