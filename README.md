# 🎓 AptiVerse — Advanced Exam Preparation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748?logo=prisma)](https://www.prisma.io/)

**AptiVerse** is a full-stack, AI-powered aptitude and competitive exam preparation platform designed for high-stakes examinations including **CAT, XAT, GMAT, GRE, Bank PO, and Campus Placement Aptitude Tests**.

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Interactive DILR Engine & Concept Hub
- **Canonical Concept Graph:** Structured syllabus covering Data Interpretation (Tables, Bar/Line/Pie charts, Mixed graphs, Missing Data Reconstruction, Caselets) and Logical Reasoning (Arrangements, Binary Logic, Tournaments, Network Routes, Venn Diagrams, Scheduling).
- **Interactive CAT Set Runner:** Timed 2-column problem runner with dynamic dataset visualizations, clue checklist, TITA (Type In The Answer) input validation, and comprehensive step-by-step deductive explanations with CAT shortcut strategies.
- **Dynamic Visualizations:** Bespoke SVG and canvas rendering for arrangements, tournament trees, network graphs, Venn diagrams, and Recharts-powered statistical charts.

### 2. 🧮 Quantitative Aptitude & Question Engine
- **Procedural Question Generation:** Multi-topic procedural math generators spanning Arithmetic, Algebra, Geometry, Modern Math, and Number Systems.
- **Dynamic Option Randomization:** Cryptographically shuffled MCQ choices and dynamic distractor generation to prevent memorization and ensure true mastery.
- **Concept & Formula Sheets:** Curated canonical notes with quick revision summaries, standard shortcuts, and typical question traps.

### 3. 📖 Verbal Ability & Reading Comprehension (VARC) Studio
- **Dual-Column Reading Studio:** 10 authentic academic passages across Philosophy, Cognitive Science, Digital Economics, and Cultural History with adjustable font sizing, paragraph markers, and pacing telemetry.
- **4-Part Deductive Explanations:** Comprehensive rationale breakdown for every question, covering the correct textual anchor, distractor elimination analysis, CAT strategy tips, and common cognitive traps.
- **Verbal Ability Engines:** Dedicated practice suites for Para-Jumbles (with TITA keypad sequencing), Paragraph Summaries, Odd-Sentence-Out, and Sentence Completion.
- **12 Pedagogical Concept Guides:** In-depth masterclasses spanning Central Thesis, Critical Inference, Tone & Attitude Spectrum, and Structural Rhetoric with interactive worked examples.

### 4. 🎯 Multi-Exam Switcher & Adaptive Practice
- Seamless switching between target exams (**CAT, XAT, GMAT, GRE, GATE, Banking, Placements**).
- Adaptive question filtering based on target exam weightage and syllabus alignment.
- Custom practice sessions, timed mock tests, previous year papers, and speed-drill modes.

### 5. 📈 Performance Analytics & Mistake Notebook
- **Mistake Notebook:** Automatic tracking of incorrect attempts with diagnostic categorization (conceptual error, calculation mistake, time pressure).
- **Speed & Accuracy Analytics:** Detailed sectional velocity breakdown and percentile projections.
- **Gamified Progress:** Streak trackers, milestones, and achievements to sustain preparation consistency.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| **Animations & UI** | Framer Motion, Lucide Icons, Canvas Confetti |
| **Data Visualizations** | Recharts, Custom SVG Venn/Network/Arrangement renderers |
| **Forms & Validation** | React Hook Form, Zod |
| **Database & ORM** | Prisma ORM, SQLite (`better-sqlite3`) |

---

## 📁 Repository Structure

```
AptiVerse/
├── docs/                 # Architectural specifications, route maps, and syllabus taxonomy
├── prisma/               # Prisma database schema and database seed scripts
├── public/               # Static assets and icons
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   │   ├── analytics/    # Speed, accuracy, and section performance breakdown
│   │   ├── exams/        # Target exam hub and syllabus viewers
│   │   ├── learn/        # Canonical concept graphs, DILR & VARC learning hub
│   │   │   ├── dilr/     # Interactive DILR set runner & solvers
│   │   │   └── varc/     # RC dual-column reading studio & VA drills
│   │   ├── mocks/        # Full-length exam simulation interface
│   │   ├── practice/     # Topic-wise practice runners and question generation
│   │   └── quiz/         # Rapid assessment & quiz results
│   ├── components/       # Reusable UI widgets & specialized DILR visualizers
│   │   ├── dilr/         # SVG/Chart components (Venn, Tournament, Network, Tables)
│   │   ├── layout/       # AppShell, Topbar, Sidebar, ExamSwitcherModal
│   │   └── ui/           # Buttons, Badges, Cards, Modals, Progress bars
│   └── lib/              # Core business logic & mathematical generators
│       ├── dilr/         # DILR generators, constraints solver, and registry
│       ├── quant/        # Quant problem engines (Algebra, Arithmetic, Geometry, etc.)
│       ├── varc/         # VARC passages, VA question bank, validator & adapter
│       └── question-engine.ts # Question shuffler and procedural test engine
└── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.18 or higher)
- `npm` or `pnpm`

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/btwhiya/aptiverse-v2.git
   cd aptiverse-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📜 License

This project is private and proprietary. Developed for advanced aptitude and competitive exam preparation.
