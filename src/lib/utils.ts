import type { Difficulty } from '../types'

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case 1:
      return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
    case 2:
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
    case 3:
      return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
  }
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    statistics: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    probability: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    machine_learning: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400',
    deep_learning: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400',
    tools: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    data_engineering: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400',
  }
  return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function calculateQuizScore(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

// Common UI class strings - iOS-inspired polish
export const styles = {
  // Cards with premium feel
  card: 'bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-5 transition-all duration-200',
  cardHover: 'bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',

  // Buttons with iOS feel
  btn: 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95',
  btnPrimary: 'inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500',
  btnSecondary: 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 active:scale-95 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  btnGhost: 'inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50',

  // Pill badges
  badge: 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',

  // Input fields
  input: 'block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500',
}
