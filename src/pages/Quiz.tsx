import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockConcepts } from '../lib/mock-data'
import { shuffleArray, calculateQuizScore, cn, styles } from '../lib/utils'
import type { Concept } from '../types'

type QuizState = 'setup' | 'playing' | 'result'

interface QuizQuestion {
  concept: Concept
  options: string[]
  correctIndex: number
}

function generateQuestions(concepts: Concept[], count: number): QuizQuestion[] {
  const shuffled = shuffleArray(concepts).slice(0, count)
  return shuffled.map(concept => {
    const wrongOptions = concepts
      .filter(c => c.id !== concept.id)
      .map(c => c.term)
    const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3)
    const allOptions = shuffleArray([concept.term, ...shuffledWrong])
    return {
      concept,
      options: allOptions,
      correctIndex: allOptions.indexOf(concept.term),
    }
  })
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>('setup')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])

  const startQuiz = (count: number) => {
    const q = generateQuestions(mockConcepts, count)
    setQuestions(q)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setAnswers([])
    setState('playing')
  }

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    const isCorrect = index === questions[currentIndex].correctIndex
    setAnswers([...answers, isCorrect])
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    } else {
      setState('result')
    }
  }

  const restart = () => {
    setState('setup')
    setQuestions([])
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setAnswers([])
  }

  if (state === 'setup') {
    return (
      <div className="space-y-8 fade-in">
        <div className="space-y-1">
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            Quiz Mode
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Test your knowledge
          </p>
        </div>

        <div className={cn(styles.card, 'space-y-6 p-6 border border-gray-100 dark:border-gray-800')}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center">
              <svg className="h-8 w-8 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              How many questions?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {mockConcepts.length} concepts available
            </p>
          </div>
          <div className="flex gap-3">
            {[5, 10, 15].map(count => (
              <button
                key={count}
                onClick={() => startQuiz(count)}
                className={cn(styles.btnPrimary, 'flex-1 py-4 text-lg')}
                disabled={mockConcepts.length < count}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const tryDifferentWords = () => {
    startQuiz(questions.length)
  }

  if (state === 'result') {
    const correct = answers.filter(Boolean).length
    const score = calculateQuizScore(correct, answers.length)
    const isGreatScore = score >= 80
    const isGoodScore = score >= 60

    return (
      <div className="space-y-6 fade-in">
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            Quiz Complete
          </p>
        </div>

        {/* Score Card */}
        <div className={cn(styles.card, 'text-center py-10 celebrate border border-gray-100 dark:border-gray-800')}>
          <div className={cn(
            'text-6xl font-bold mb-2',
            isGreatScore ? 'text-emerald-500' : isGoodScore ? 'text-violet-500' : 'text-rose-400'
          )}>
            {score}%
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {correct} out of {answers.length} correct
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {isGreatScore ? 'Excellent work!' : isGoodScore ? 'Good job!' : 'Keep practicing!'}
          </p>
        </div>

        {/* Results Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Results Breakdown
          </h3>
          <div className="space-y-2">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border',
                  answers[idx]
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
                    : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                  answers[idx] ? 'bg-emerald-500' : 'bg-rose-500'
                )}>
                  {answers[idx] ? (
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-gray-900 dark:text-white truncate">
                    {q.concept.term}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {q.concept.definition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <button onClick={restart} className={cn(styles.btnSecondary, 'flex-1 py-3')}>
              Try Same Words
            </button>
            <button onClick={tryDifferentWords} className={cn(styles.btnPrimary, 'flex-1 py-3')}>
              Different Words
            </button>
          </div>
          <Link to="/" className={cn(styles.btnGhost, 'w-full py-3 justify-center')}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const question = questions[currentIndex]

  return (
    <div className="space-y-6 fade-in">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className={cn(styles.card, 'p-6 border border-gray-100 dark:border-gray-800')}>
        <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-3">
          What term matches this definition?
        </p>
        <p className="text-xl text-gray-900 dark:text-white leading-relaxed">
          {question.concept.definition}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correctIndex
          const showResult = selectedAnswer !== null

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={cn(
                'w-full text-left p-4 rounded-2xl border-2 transition-all duration-200',
                showResult && isCorrect && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
                showResult && isSelected && !isCorrect && 'border-rose-500 bg-rose-50 dark:bg-rose-500/10',
                !showResult && 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50/50 dark:hover:bg-violet-500/5 cursor-pointer',
                !showResult && !isSelected && 'active:scale-[0.98]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-gray-900 dark:text-white">
                  {option}
                </span>
                {showResult && isCorrect && (
                  <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {showResult && isSelected && !isCorrect && (
                  <svg className="h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Answer Explanation */}
      {selectedAnswer !== null && (
        <div className="space-y-4 fade-in">
          <div className={cn(
            styles.card,
            'p-4 border',
            selectedAnswer === question.correctIndex
              ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
              : 'border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10'
          )}>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {selectedAnswer === question.correctIndex ? 'Correct!' : `The answer is: ${question.concept.term}`}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {question.concept.explanation || question.concept.definition}
            </p>
          </div>

          {/* Next Button */}
          <button onClick={nextQuestion} className={cn(styles.btnPrimary, 'w-full py-4 text-lg')}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}
