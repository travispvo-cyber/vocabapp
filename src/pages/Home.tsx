import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getMockDailyConcept, mockConcepts } from '../lib/mock-data'
import { getDifficultyColor, styles, cn } from '../lib/utils'
import { DIFFICULTY_LABELS } from '../types'

export default function Home() {
  const dailyConcept = getMockDailyConcept()
  const recentConcepts = mockConcepts.slice(0, 5)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
          Concept of the Day
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Learn something new every day
        </p>
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
