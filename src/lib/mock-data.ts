import type { Concept } from '../types'

// Mock data for development when Supabase isn't configured
export const mockConcepts: Concept[] = [
  {
    id: '1',
    term: 'p-value',
    definition: 'The probability of observing results at least as extreme as the measured results, assuming the null hypothesis is true.',
    explanation: 'A p-value helps determine statistical significance. A small p-value (typically < 0.05) suggests that the observed data is unlikely under the null hypothesis, leading to its rejection. It does NOT measure the probability that the hypothesis is true or the size of an effect.',
    example: `# Testing if a coin is fair
# We flip 100 times, get 60 heads
from scipy import stats
result = stats.binomtest(60, 100, 0.5)
print(f"p-value: {result.pvalue:.4f}")
# p-value: 0.0569 → borderline significant`,
    etymology: 'From "probability value", introduced by Karl Pearson in the early 20th century as part of his work on statistical hypothesis testing.',
    category: 'statistics',
    difficulty: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    term: 'Overfitting',
    definition: 'When a model learns the training data too well, including noise and outliers, resulting in poor generalization to new data.',
    explanation: 'Overfitting occurs when a model is too complex relative to the amount of training data. Signs include high training accuracy but low test accuracy. Solutions include regularization, cross-validation, early stopping, and gathering more data.',
    example: `# Detecting overfitting
from sklearn.model_selection import cross_val_score

# High variance in CV scores suggests overfitting
scores = cross_val_score(model, X, y, cv=5)
print(f"CV scores: {scores}")
print(f"Mean: {scores.mean():.2f}, Std: {scores.std():.2f}")`,
    etymology: 'Term emerged in the 1970s-80s as machine learning formalized. "Over" refers to excessive adaptation to training data at the expense of generalization.',
    category: 'machine_learning',
    difficulty: 1,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    term: 'Gradient Descent',
    definition: 'An optimization algorithm that iteratively adjusts parameters in the direction of steepest decrease of a loss function.',
    explanation: 'Gradient descent is foundational to training neural networks. It computes the gradient (partial derivatives) of the loss function with respect to each parameter, then updates parameters in the opposite direction. Learning rate controls step size.',
    example: `# Simple gradient descent
def gradient_descent(X, y, lr=0.01, epochs=100):
    w = np.zeros(X.shape[1])
    for _ in range(epochs):
        gradient = -2 * X.T @ (y - X @ w) / len(y)
        w = w - lr * gradient
    return w`,
    etymology: 'Developed by Cauchy in 1847 as "méthode du gradient". Became central to ML through backpropagation work in the 1980s.',
    category: 'machine_learning',
    difficulty: 2,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    term: 'Bayes\' Theorem',
    definition: 'A formula for calculating conditional probability: P(A|B) = P(B|A) × P(A) / P(B).',
    explanation: 'Bayes\' theorem allows updating beliefs based on new evidence. The prior P(A) represents initial belief, likelihood P(B|A) is evidence probability given the hypothesis, and posterior P(A|B) is the updated belief.',
    example: `# Medical test example
# Prior: 1% of population has disease
# Test: 90% true positive, 5% false positive

P_disease = 0.01
P_positive_given_disease = 0.90
P_positive_given_healthy = 0.05

P_positive = P_positive_given_disease * P_disease + P_positive_given_healthy * (1 - P_disease)
P_disease_given_positive = (P_positive_given_disease * P_disease) / P_positive
# Result: ~15.4% (not 90%!)`,
    etymology: 'Named after Thomas Bayes (1701-1761), an English statistician and Presbyterian minister who first formulated the theorem.',
    category: 'probability',
    difficulty: 2,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    term: 'Standard Deviation',
    definition: 'A measure of the amount of variation or dispersion in a set of values, calculated as the square root of the variance.',
    explanation: 'Standard deviation quantifies how spread out data points are from the mean. A low SD indicates data points cluster near the mean; high SD means they are spread over a wider range. In a normal distribution, ~68% of data falls within 1 SD of the mean.',
    example: `import numpy as np

data = [2, 4, 4, 4, 5, 5, 7, 9]
std = np.std(data, ddof=1)  # ddof=1 for sample SD
print(f"Standard Deviation: {std:.2f}")  # ~2.14`,
    etymology: 'Introduced by Karl Pearson in 1894. "Standard" refers to a standardized measure; "deviation" from Latin deviare (to turn aside).',
    category: 'statistics',
    difficulty: 1,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
  },
]

export function getMockDailyConcept(): Concept {
  const today = new Date().toDateString()
  const index = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % mockConcepts.length
  return mockConcepts[index]
}

export function getMockConceptById(id: string): Concept | undefined {
  return mockConcepts.find(c => c.id === id)
}
