import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getMockConceptById } from '../lib/mock-data'
import { getDifficultyColor, cn, styles } from '../lib/utils'
import { DIFFICULTY_LABELS } from '../types'

export default function ConceptDetail() {
  const { id } = useParams<{ id: string }>()
  const concept = id ? getMockConceptById(id) : null
  const [isBookmarked, setIsBookmarked] = useState(false)

  if (!concept) {
    return (
      <div className="space-y-6 fade-in">
        <Link to="/" className={cn(styles.btnGhost, 'inline-flex items-center gap-2')}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>
        <div className={cn(styles.card, 'text-center py-16')}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Concept not found
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            This concept doesn't exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Back Button */}
      <Link to="/" className={cn(styles.btnGhost, 'inline-flex items-center gap-2 -ml-2')}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
      </Link>

      {/* Hero Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-4xl font-serif text-gray-900 dark:text-white">
            {concept.term}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className={cn(styles.badge, 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400')}>
              {concept.category.replace('_', ' ')}
            </span>
            <span className={cn(styles.badge, getDifficultyColor(concept.difficulty))}>
              {DIFFICULTY_LABELS[concept.difficulty]}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
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

      {/* Definition */}
      <div className={cn(styles.card, 'space-y-2')}>
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Definition
        </h2>
        <p className="text-gray-900 dark:text-white text-lg leading-relaxed">
          {concept.definition}
        </p>
      </div>

      {/* Explanation */}
      <div className={cn(styles.card, 'space-y-2')}>
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Explanation
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {concept.explanation}
        </p>
      </div>

      {/* Example */}
      {concept.example && (
        <div className={cn(styles.card, 'space-y-3')}>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Example
          </h2>
          <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed">
            <code>{concept.example}</code>
          </pre>
        </div>
      )}

      {/* Etymology */}
      {concept.etymology && (
        <div className={cn(styles.card, 'space-y-2')}>
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Etymology
          </h2>
          <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
            {concept.etymology}
          </p>
        </div>
      )}

      {/* Quiz Button - Sticky on mobile */}
      <div className="pt-2">
        <Link to="/quiz" className={cn(styles.btnPrimary, 'w-full justify-center')}>
          Quiz on This Concept
        </Link>
      </div>
    </div>
  )
}
