import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { getMockConceptById } from '../lib/mock-data'
import { getDifficultyColor, cn, styles } from '../lib/utils'
import { DIFFICULTY_LABELS } from '../types'

// iOS-style back button component
function BackButton({ label = 'Home' }: { label?: string }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors -ml-1 group"
    >
      <svg
        className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      <span className="font-medium">{label}</span>
    </button>
  )
}

export default function ConceptDetail() {
  const { id } = useParams<{ id: string }>()
  const concept = id ? getMockConceptById(id) : null
  const [isBookmarked, setIsBookmarked] = useState(false)

  if (!concept) {
    return (
      <div className="space-y-6 fade-in">
        <BackButton />
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
      {/* iOS-style Back Button */}
      <BackButton />

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
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${concept.term}: ${concept.definition}`)
            }}
            className="p-2.5 rounded-full text-gray-400 hover:text-violet-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Copy to clipboard"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: concept.term,
                  text: concept.definition,
                  url: window.location.href,
                })
              }
            }}
            className="p-2.5 rounded-full text-gray-400 hover:text-violet-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Share"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
          {/* Bookmark Button */}
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
              className={cn('h-5 w-5 transition-transform duration-200', isBookmarked && 'scale-110')}
              fill={isBookmarked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
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
