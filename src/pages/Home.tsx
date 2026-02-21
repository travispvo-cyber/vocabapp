import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getMockDailyConcept, mockConcepts } from '../lib/mock-data'
import { getDifficultyColor, styles, cn } from '../lib/utils'
import { DIFFICULTY_LABELS } from '../types'

// Mock user stats - will come from Supabase later
const mockUserStats = {
  streak: 7,
  wordsLearnedToday: 3,
  dailyGoal: 5,
  totalWords: 42,
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const dailyConcept = getMockDailyConcept()
  const recentConcepts = mockConcepts.slice(0, 5)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const progressPercent = (mockUserStats.wordsLearnedToday / mockUserStats.dailyGoal) * 100

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Greeting & Stats Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {getGreeting()}
          </p>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            Concept of the Day
          </p>
        </div>

        {/* Stats Cluster */}
        <div className="flex items-center gap-4">
          {/* Streak Counter */}
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{mockUserStats.streak}</span>
          </div>

          {/* Progress Ring */}
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
              <circle
                className="text-gray-200 dark:text-gray-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                r="15.9"
                cx="18"
                cy="18"
              />
              <circle
                className="text-violet-500"
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                r="15.9"
                cx="18"
                cy="18"
                strokeDasharray={`${progressPercent}, 100`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
              {mockUserStats.wordsLearnedToday}/{mockUserStats.dailyGoal}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Concept Card - Hero Style */}
      <Link
        to={`/concept/${dailyConcept.id}`}
        className={cn(styles.cardHover, 'block p-6 border border-gray-100 dark:border-gray-800')}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <h2 className="text-3xl font-serif text-gray-900 dark:text-white">
              {dailyConcept.term}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
              {dailyConcept.definition}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className={cn(styles.badge, 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400')}>
                {dailyConcept.category.replace('_', ' ')}
              </span>
              <span className={cn(styles.badge, getDifficultyColor(dailyConcept.difficulty))}>
                {DIFFICULTY_LABELS[dailyConcept.difficulty]}
              </span>
            </div>
          </div>
          <button
            onClick={handleBookmark}
            className={cn(
              'p-2.5 rounded-full transition-all duration-200',
              isBookmarked
                ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10'
                : 'text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <svg
              className={cn('h-6 w-6 transition-transform duration-200', isBookmarked && 'scale-110')}
              fill={isBookmarked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
        <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
          <span
            className={cn(styles.btnPrimary, 'inline-flex')}
            onClick={(e) => e.stopPropagation()}
          >
            Take Quiz
          </span>
        </div>
      </Link>

      {/* Recent Concepts */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Recent Concepts
        </h3>
        <div className="space-y-3">
          {recentConcepts.map(concept => (
            <Link
              key={concept.id}
              to={`/concept/${concept.id}`}
              className={cn(styles.cardHover, 'flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800')}
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-lg text-gray-900 dark:text-white truncate">
                  {concept.term}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {concept.definition}
                </p>
              </div>
              <svg className="h-5 w-5 text-gray-300 dark:text-gray-600 ml-3 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
