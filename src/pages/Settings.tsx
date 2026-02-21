import { useState } from 'react'
import { CATEGORIES, DIFFICULTY_LABELS, type Category, type Difficulty, type Theme } from '../types'
import { cn } from '../lib/utils'

interface SettingsProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Settings({ theme, onToggleTheme }: SettingsProps) {
  const [difficultyLevel, setDifficultyLevel] = useState<Difficulty>(1)
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(
    new Set(CATEGORIES.map(c => c.value))
  )

  const toggleCategory = (category: Category) => {
    const newSet = new Set(selectedCategories)
    if (newSet.has(category)) {
      if (newSet.size > 1) {
        newSet.delete(category)
      }
    } else {
      newSet.add(category)
    }
    setSelectedCategories(newSet)
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
          Settings
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Customize your learning experience
        </p>
      </div>

      {/* Appearance Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
          Appearance
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                {theme === 'dark' ? (
                  <svg className="h-5 w-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? 'On' : 'Off'}
                </p>
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              className={cn(
                'relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200',
                theme === 'dark' ? 'bg-violet-500' : 'bg-gray-300 dark:bg-gray-600'
              )}
            >
              <span
                className={cn(
                  'inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Difficulty Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
          Difficulty Preference
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 space-y-3 border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Set your default difficulty level for quizzes
          </p>
          <div className="flex gap-2">
            {([1, 2, 3] as Difficulty[]).map(level => (
              <button
                key={level}
                onClick={() => setDifficultyLevel(level)}
                className={cn(
                  'flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                  difficultyLevel === level
                    ? 'bg-violet-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                )}
              >
                {DIFFICULTY_LABELS[level]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
          Categories
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => toggleCategory(cat.value)}
              className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {cat.label}
              </span>
              <div
                className={cn(
                  'w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200',
                  selectedCategories.has(cat.value)
                    ? 'bg-violet-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                )}
              >
                {selectedCategories.has(cat.value) && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
          Account
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <button className="flex items-center justify-center w-full p-4 text-rose-500 font-semibold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="text-center pt-4">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          DataVocab v1.0.0
        </p>
      </div>
    </div>
  )
}
