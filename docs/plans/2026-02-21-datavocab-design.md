# DataVocab Design Document

**Date:** 2026-02-21
**Status:** Approved
**Author:** Travis + Claude

---

## Overview

DataVocab is a web app that replicates the "Vocabulary - Learn Words Daily" iOS app experience for data science concepts and terminology. Users learn one concept per day, browse by category and difficulty, take quizzes, and bookmark concepts for review.

**Reference:** [Vocabulary - Learn Words Daily](https://apps.apple.com/us/app/vocabulary-learn-words-daily/id1084540807)

---

## Goals

- Daily learning loop for data science vocabulary
- Serve both beginners and practitioners via difficulty tiers
- iOS-like polish and feel
- Low friction: OAuth sign-in, no account required to browse

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Supabase (Auth, PostgreSQL, REST API) |
| Hosting | Render (static site) |
| Testing | Vitest (unit) + Playwright (E2E) |

---

## Architecture

```
+-----------------------------------------------+
|              React + Vite SPA                 |
|         (Tailwind CSS, Render hosting)        |
+------------------------+----------------------+
                         |
                         v
+-----------------------------------------------+
|                   Supabase                    |
|  +------------+  +------------+  +----------+ |
|  |    Auth    |  | PostgreSQL |  | REST API | |
|  | (Google/GH)|  |   (data)   |  | (auto)   | |
|  +------------+  +------------+  +----------+ |
+-----------------------------------------------+
```

No custom backend code. All logic lives in the frontend or as PostgreSQL RLS policies.

---

## Data Model

### concepts
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| term | text | The concept name |
| definition | text | Concise definition |
| explanation | text | Longer explanation with context |
| example | text | Code snippet or real-world usage |
| etymology | text | Origin/history (nullable) |
| category | text | statistics, machine_learning, tools, etc. |
| difficulty | int (1-3) | 1=beginner, 2=intermediate, 3=advanced |
| created_at | timestamp | |
| updated_at | timestamp | |

### bookmarks
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to auth.users |
| concept_id | uuid | FK to concepts |
| created_at | timestamp | |
| UNIQUE | | (user_id, concept_id) |

### user_settings
| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | PK, FK to auth.users |
| difficulty_level | int (1-3) | Filter preference |
| categories | text[] | Selected categories |
| theme | text | 'light' or 'dark' |
| updated_at | timestamp | |

### quiz_progress
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to auth.users |
| concept_id | uuid | FK to concepts |
| correct_count | int | |
| incorrect_count | int | |
| last_seen | timestamp | |
| mastery_level | int (0-5) | Spaced repetition indicator |
| UNIQUE | | (user_id, concept_id) |

### daily_concepts
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| concept_id | uuid | FK to concepts |
| date | date | UNIQUE |
| created_at | timestamp | |

### Row-Level Security

- `concepts`: Public read, admin-only write
- `bookmarks`: Users CRUD their own only
- `user_settings`: Users CRUD their own only
- `quiz_progress`: Users CRUD their own only
- `daily_concepts`: Public read, admin-only write

---

## Categories

| Category | Examples |
|----------|----------|
| statistics | p-value, confidence interval, standard deviation |
| probability | Bayes' theorem, conditional probability, distributions |
| machine_learning | overfitting, gradient descent, cross-validation |
| deep_learning | backpropagation, attention, dropout |
| tools | pandas, scikit-learn, SQL joins |
| data_engineering | ETL, data lake, schema design |

---

## Features (v1)

### Core
- **Concept of the Day** - Featured concept on home screen
- **Browse/Explore** - Filter by category and difficulty
- **Concept Detail** - Definition, explanation, example, etymology
- **Bookmarks** - Save concepts for later review
- **Quiz Mode** - Multiple choice questions on concepts
- **Settings** - Difficulty preference, categories, theme

### Auth
- Google OAuth
- GitHub OAuth
- Anonymous browsing (no account required to view concepts)

### UI/UX
- iOS-like aesthetic: clean typography, rounded cards, subtle shadows
- Light and dark theme support
- Responsive: mobile-first, desktop-friendly
- Smooth transitions (150-200ms)

---

## Screens

### Home
- Concept of the day card (term, definition, bookmark button, quiz button)
- Recent concepts row

### Concept Detail
- Full concept info: definition, explanation, example, etymology
- Category and difficulty badges
- Bookmark toggle
- "Take Quiz" button

### Explore
- Category tabs
- Difficulty filter
- Scrollable concept list

### Quiz
- Progress indicator (3/10)
- Question with 4 answer options
- Immediate feedback on selection
- Final score screen

### Bookmarks
- List of saved concepts
- Quick access to detail view

### Settings
- Difficulty preference
- Category preferences
- Theme toggle
- Sign out

### Navigation
- Bottom tab bar (mobile): Home, Explore, Quiz, Saved, Settings
- Sidebar (desktop): Same sections

---

## Visual Direction

Mirroring the reference iOS app:
- **Typography:** Inter or SF Pro, generous line height
- **Colors:** Muted palette, soft grays, single accent (blue or teal)
- **Cards:** 12-16px border radius, subtle shadows, white/dark backgrounds
- **Spacing:** Generous padding throughout
- **Animations:** Subtle, 150-200ms transitions

---

## Content Seeding

AI-generated seed data, curated over time.

### Targets
| Category | Count | Difficulty (1/2/3) |
|----------|-------|---------------------|
| Statistics | 15 | 5/5/5 |
| Probability | 10 | 4/3/3 |
| Machine Learning | 15 | 5/5/5 |
| Deep Learning | 5 | 1/2/2 |
| Tools | 10 | 4/3/3 |
| Data Engineering | 5 | 2/2/1 |
| **Total** | **60** | |

### Content Format
```json
{
  "term": "p-value",
  "definition": "The probability of observing results at least as extreme as the measured results, assuming the null hypothesis is true.",
  "explanation": "A p-value helps you determine the significance of your results...",
  "example": "# Testing if a coin is fair\n# p-value = 0.02 → reject null",
  "etymology": "From 'probability value', introduced by Karl Pearson.",
  "category": "statistics",
  "difficulty": 1
}
```

---

## Testing Strategy

### Stack
- **Vitest** - Unit tests
- **Playwright** - E2E tests
- **ESLint + Prettier** - Code quality

### Verification Command
```bash
npm run verify
# Runs: lint, typecheck, test, test:e2e, build
```

### E2E Test Coverage
| Test | Verifies |
|------|----------|
| auth.spec.ts | OAuth flow, landing on home |
| daily-concept.spec.ts | Concept displays, bookmark works |
| explore.spec.ts | Browse, filter by category/difficulty |
| quiz.spec.ts | Quiz loads, answers register, score shows |
| bookmarks.spec.ts | Save/unsave, persistence |
| settings.spec.ts | Theme toggle, preferences save |
| responsive.spec.ts | Mobile and desktop layouts |

---

## Development Approach

Ralph loop with autonomous iteration.

### Process
1. Scaffold project with test infrastructure
2. Run Ralph loop with comprehensive prompt
3. Claude iterates until completion criteria met
4. Review and deploy

### Completion Criteria
- `npm run verify` passes
- 60+ seed concepts across all categories
- UI matches wireframes
- OAuth works with test credentials

---

## Future Phases

- **Phase 2:** PWA support (installable, offline-capable)
- **Phase 3:** Native iOS app (Swift, uses same Supabase backend)
- **Phase 4:** Spaced repetition algorithm, personalized daily concepts

---

## Open Questions

None at this time.
