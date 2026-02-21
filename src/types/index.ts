export type Category =
  | 'statistics'
  | 'probability'
  | 'machine_learning'
  | 'deep_learning'
  | 'tools'
  | 'data_engineering'

export type Difficulty = 1 | 2 | 3

export type Theme = 'light' | 'dark'

export interface Concept {
  id: string
  term: string
  definition: string
  explanation: string
  example: string | null
  etymology: string | null
  category: Category
  difficulty: Difficulty
  created_at: string
  updated_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  concept_id: string
  created_at: string
}

export interface UserSettings {
  user_id: string
  difficulty_level: Difficulty
  categories: Category[]
  theme: Theme
  updated_at: string
}

export interface QuizProgress {
  id: string
  user_id: string
  concept_id: string
  correct_count: number
  incorrect_count: number
  last_seen: string
  mastery_level: number
}

export interface DailyConcept {
  id: string
  concept_id: string
  date: string
  created_at: string
}

export interface User {
  id: string
  email: string | null
  user_metadata: {
    avatar_url?: string
    full_name?: string
    name?: string
  }
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'statistics', label: 'Statistics' },
  { value: 'probability', label: 'Probability' },
  { value: 'machine_learning', label: 'Machine Learning' },
  { value: 'deep_learning', label: 'Deep Learning' },
  { value: 'tools', label: 'Tools' },
  { value: 'data_engineering', label: 'Data Engineering' },
]

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
}
