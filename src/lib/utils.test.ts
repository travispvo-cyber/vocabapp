import { describe, it, expect } from 'vitest'
import { cn, formatDate, shuffleArray, calculateQuizScore, getDifficultyColor, getCategoryColor } from './utils'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('filters falsy values', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })
})

describe('formatDate', () => {
  it('formats date string', () => {
    const result = formatDate('2024-01-15T12:00:00Z')
    expect(result).toContain('Jan')
    expect(result).toContain('2024')
  })
})

describe('shuffleArray', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled.length).toBe(arr.length)
  })

  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })

  it('does not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const original = [...arr]
    shuffleArray(arr)
    expect(arr).toEqual(original)
  })
})

describe('calculateQuizScore', () => {
  it('returns 0 for 0 correct', () => {
    expect(calculateQuizScore(0, 10)).toBe(0)
  })

  it('returns 100 for all correct', () => {
    expect(calculateQuizScore(10, 10)).toBe(100)
  })

  it('returns 50 for half correct', () => {
    expect(calculateQuizScore(5, 10)).toBe(50)
  })

  it('handles 0 total', () => {
    expect(calculateQuizScore(0, 0)).toBe(0)
  })

  it('rounds to nearest integer', () => {
    expect(calculateQuizScore(1, 3)).toBe(33)
  })
})

describe('getDifficultyColor', () => {
  it('returns green for difficulty 1', () => {
    expect(getDifficultyColor(1)).toContain('green')
  })

  it('returns amber for difficulty 2', () => {
    expect(getDifficultyColor(2)).toContain('amber')
  })

  it('returns red for difficulty 3', () => {
    expect(getDifficultyColor(3)).toContain('red')
  })
})

describe('getCategoryColor', () => {
  it('returns blue for statistics', () => {
    expect(getCategoryColor('statistics')).toContain('blue')
  })

  it('returns gray for unknown category', () => {
    expect(getCategoryColor('unknown')).toContain('gray')
  })
})
