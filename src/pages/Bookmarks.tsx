import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockConcepts } from '../lib/mock-data'
import { getCategoryColor, getDifficultyColor, cn, styles } from '../lib/utils'
import { DIFFICULTY_LABELS } from '../types'

export default function Bookmarks() {
  // Mock bookmarks - in real app would come from Supabase
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['1', '3']))

  const bookmarkedConcepts = mockConcepts.filter(c => bookmarkedIds.has(c.id))

  const removeBookmark = (id: string) => {
    const newSet = new Set(bookmarkedIds)
    newSet.delete(id)
    setBookmarkedIds(newSet)
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Saved Concepts
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {bookmarkedConcepts.length} concept{bookmarkedConcepts.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {/* Bookmarks List */}
      {bookmarkedConcepts.length === 0 ? (
        <div className={cn(styles.card, 'text-center py-16')}>
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            No saved concepts
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
            Save concepts you want to review later by tapping the heart icon
          </p>
          <Link to="/explore" className={cn(styles.btnPrimary, 'mt-6 inline-flex')}>
            Explore Concepts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedConcepts.map(concept => (
            <div key={concept.id} className={cn(styles.cardHover, 'flex items-start gap-4 p-4')}>
              <Link
                to={`/concept/${concept.id}`}
                className="flex-1 min-w-0"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {concept.term}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {concept.definition}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={cn(styles.badge, getCategoryColor(concept.category))}>
                    {concept.category.replace('_', ' ')}
                  </span>
                  <span className={cn(styles.badge, getDifficultyColor(concept.difficulty))}>
                    {DIFFICULTY_LABELS[concept.difficulty]}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => removeBookmark(concept.id)}
                className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all duration-200 active:scale-95"
                aria-label="Remove bookmark"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
