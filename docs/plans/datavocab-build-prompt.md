# DataVocab Build Prompt

Build a data science vocabulary learning web app modeled after the iOS app "Vocabulary - Learn Words Daily".

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Supabase (Auth, PostgreSQL, REST API)
- **Testing:** Vitest (unit) + Playwright (E2E)

## Project Setup

1. Initialize Vite + React + TypeScript project in `C:/Projects/vocabapp`
2. Install dependencies: tailwindcss, @supabase/supabase-js, react-router-dom
3. Configure Tailwind with custom theme (iOS-like aesthetic)
4. Set up Supabase client (use environment variables for keys)
5. Configure Vitest and Playwright

## Supabase Schema

Create these tables with Row-Level Security:

```sql
-- concepts (public read, admin write)
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  explanation TEXT NOT NULL,
  example TEXT,
  etymology TEXT,
  category TEXT NOT NULL CHECK (category IN ('statistics', 'probability', 'machine_learning', 'deep_learning', 'tools', 'data_engineering')),
  difficulty INT NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- bookmarks (users CRUD own only)
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  concept_id UUID REFERENCES concepts NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, concept_id)
);

-- user_settings (users CRUD own only)
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users,
  difficulty_level INT DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 3),
  categories TEXT[] DEFAULT ARRAY['statistics', 'probability', 'machine_learning', 'deep_learning', 'tools', 'data_engineering'],
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- quiz_progress (users CRUD own only)
CREATE TABLE quiz_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  concept_id UUID REFERENCES concepts NOT NULL,
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  mastery_level INT DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5),
  UNIQUE(user_id, concept_id)
);

-- daily_concepts (public read, admin write)
CREATE TABLE daily_concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id UUID REFERENCES concepts NOT NULL,
  date DATE UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Features to Implement

### 1. Authentication
- Google OAuth sign-in
- GitHub OAuth sign-in
- Sign out functionality
- Protected routes for bookmarks/settings
- Anonymous browsing for concepts

### 2. Home Page (Concept of the Day)
- Display today's featured concept
- Show term, definition, category badge, difficulty indicator
- Bookmark button (heart icon, toggles saved state)
- "Take Quiz" button
- Recent concepts row (last 5)

### 3. Concept Detail Page
- Full concept display: term, definition, explanation, example (code block), etymology
- Category and difficulty badges
- Bookmark toggle
- "Quiz on This" button
- Back navigation

### 4. Explore Page
- Category tabs: All, Statistics, Probability, ML, Deep Learning, Tools, Data Engineering
- Difficulty filter: 1, 2, 3 (can select multiple)
- Scrollable list of concept cards
- Each card shows: term, category, difficulty dots
- Click to view detail

### 5. Quiz Page
- Multiple choice format (4 options)
- Progress indicator (e.g., "3/10")
- Question based on concept definition
- Immediate feedback on answer (correct/incorrect)
- Next button to proceed
- Final score screen with option to retry or return home
- Track progress in quiz_progress table

### 6. Bookmarks Page
- List of saved concepts
- Remove bookmark option
- Empty state if no bookmarks
- Click to view detail

### 7. Settings Page
- Difficulty preference selector
- Category toggles
- Theme toggle (light/dark)
- Sign out button
- User info display

### 8. Navigation
- Bottom tab bar on mobile: Home, Explore, Quiz, Saved, Settings (icons)
- Sidebar on desktop with same sections
- Responsive breakpoint at 768px

## Visual Design Requirements

iOS-like polish:
- **Typography:** Use Inter font, generous line-height (1.6)
- **Colors:**
  - Light: white backgrounds, gray-100 cards, gray-800 text, blue-500 accent
  - Dark: gray-900 backgrounds, gray-800 cards, gray-100 text, blue-400 accent
- **Cards:** rounded-xl (12px), shadow-sm, white/gray-800 backgrounds
- **Spacing:** p-4 minimum on cards, gap-4 between elements
- **Transitions:** transition-all duration-150 on interactive elements
- **Buttons:** rounded-lg, py-2 px-4, hover states

## Seed Data

Generate 60+ concepts across categories:
- Statistics: 15 (5 each difficulty)
- Probability: 10 (4/3/3)
- Machine Learning: 15 (5/5/5)
- Deep Learning: 5 (1/2/2)
- Tools: 10 (4/3/3)
- Data Engineering: 5 (2/2/1)

Each concept needs: term, definition, explanation, example, etymology (if applicable), category, difficulty.

Create a seed script at `scripts/seed-concepts.ts` that can insert via Supabase client.

## Testing Requirements

### Unit Tests (Vitest)
- Test utility functions
- Test data transformations
- Test quiz scoring logic

### E2E Tests (Playwright)
Create these test files:
- `e2e/auth.spec.ts` - OAuth buttons render, protected routes redirect
- `e2e/daily-concept.spec.ts` - Concept of day displays, bookmark toggles
- `e2e/explore.spec.ts` - Browse works, filters function
- `e2e/quiz.spec.ts` - Quiz flow works, score displays
- `e2e/bookmarks.spec.ts` - Save/unsave works
- `e2e/settings.spec.ts` - Theme toggles, preferences save
- `e2e/responsive.spec.ts` - Mobile/desktop layouts render

### Verification Command
Create `npm run verify` that runs:
```bash
npm run lint && npm run typecheck && npm run test && npm run build
```

Note: Skip E2E tests in verify (they require Supabase connection).

## File Structure

```
vocabapp/
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Card, Badge, etc.
│   │   ├── layout/       # Navigation, TabBar, Sidebar
│   │   └── features/     # ConceptCard, QuizQuestion, etc.
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ConceptDetail.tsx
│   │   ├── Explore.tsx
│   │   ├── Quiz.tsx
│   │   ├── Bookmarks.tsx
│   │   ├── Settings.tsx
│   │   └── Auth.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useConcepts.ts
│   │   ├── useBookmarks.ts
│   │   └── useQuiz.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── scripts/
│   └── seed-concepts.ts
├── e2e/
│   └── *.spec.ts
├── public/
├── .env.example
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vitest.config.ts
└── playwright.config.ts
```

## Environment Variables

Create `.env.example`:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Completion Criteria

When ALL of the following are true, output <promise>COMPLETE</promise>:

1. `npm run verify` passes (lint, typecheck, test, build)
2. All pages render without errors
3. Navigation works (routing between all pages)
4. UI matches iOS aesthetic (rounded cards, clean typography, proper spacing)
5. Dark mode toggle works
6. Seed data script exists with 60+ concepts
7. E2E test files exist (they don't need to pass without Supabase)
8. .env.example exists with required variables

## Important Notes

- Use placeholder/mock data if Supabase isn't configured
- Focus on UI polish - this should look like a real iOS app
- Keep components small and focused
- Use TypeScript strictly (no `any` types)
- Commit progress after each major feature

## If Stuck After 15 Iterations

- Document what's blocking progress
- List what was attempted
- Create an issue file at `docs/BLOCKED.md` describing the problem
- Output <promise>COMPLETE</promise> anyway so the loop exits
