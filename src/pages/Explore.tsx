import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { mockConcepts } from '../lib/mock-data'
import { getDifficultyColor, cn, styles } from '../lib/utils'
import { CATEGORIES, DIFFICULTY_LABELS, type Category, type Difficulty } from '../types'

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<Difficulty>>(new Set([1, 2, 3]))

  const filteredConcepts = useMemo(() => {
    return mockConcepts.filter(concept => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTerm = concept.term.toLowerCase().includes(query)
        const matchesDefinition = concept.definition.toLowerCase().includes(query)
        if (!matchesTerm && !matchesDefinition) {
          return false
        }
      }
      // Category filter
      if (selectedCategory !== 'all' && concept.category !== selectedCategory) {
        return false
      }
      // Difficulty filter
      if (!selectedDifficulties.has(concept.difficulty)) {
        return false
      }
      return true
    })
  }, [searchQuery, selectedCategory, selectedDifficulties])

  const toggleDifficulty = (difficulty: Difficulty) => {
    const newSet = new Set(selectedDifficulties)
    if (newSet.has(difficulty)) {
      if (newSet.size > 1) {
        newSet.delete(difficulty)
      }
    } else {
      newSet.add(difficulty)
    }
    setSelectedDifficulties(newSet)
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
          Explore Concepts
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Browse by category and difficulty
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search concepts..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category Pills - Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedCategory === 'all'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
          )}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedCategory === cat.value
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2">
        {([1, 2, 3] as Difficulty[]).map(diff => (
          <button
            key={diff}
            onClick={() => toggleDifficulty(diff)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedDifficulties.has(diff)
                ? getDifficultyColor(diff)
                : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
            )}
          >
            {DIFFICULTY_LABELS[diff]}
          </button>
        ))}
      </div>

      {/* Concept List */}
      <div className="space-y-3">
        {filteredConcepts.length === 0 ? (
          <div className={cn(styles.card, 'text-center py-12')}>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No concepts match your filters
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your category or difficulty selection
            </p>
          </div>
        ) : (
          filteredConcepts.map(concept => (
            <Link
              key={concept.id}
              to={`/concept/${concept.id}`}
              className={cn(styles.cardHover, 'flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800')}
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-lg text-gray-900 dark:text-white truncate">
                  {concept.term}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {concept.definition}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <div className="flex gap-1">
                  {[1, 2, 3].map(d => (
                    <div
                      key={d}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-colors duration-200',
                        d <= concept.difficulty
                          ? 'bg-violet-500 dark:bg-violet-400'
                          : 'bg-gray-200 dark:bg-gray-700'
                      )}
                    />
                  ))}
                </div>
                <svg className="h-5 w-5 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Results count */}
      {filteredConcepts.length > 0 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          {filteredConcepts.length} concept{filteredConcepts.length !== 1 ? 's' : ''} found
        </p>
      )}
    </div>
  )
}
