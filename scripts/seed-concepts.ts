/**
 * Seed script for DataVocab concepts
 *
 * Run with: npx tsx scripts/seed-concepts.ts
 *
 * Note: Requires VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY
 * environment variables to be set.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface Concept {
  term: string
  definition: string
  explanation: string
  example: string | null
  etymology: string | null
  category: string
  difficulty: number
}

const concepts: Concept[] = [
  // Statistics - Beginner (5)
  {
    term: 'Mean',
    definition: 'The average of a set of numbers, calculated by summing all values and dividing by the count.',
    explanation: 'The mean is the most common measure of central tendency. It represents the "center" of the data but can be heavily influenced by outliers. For example, a single billionaire in a room of average earners would dramatically increase the mean income.',
    example: `import numpy as np\n\ndata = [10, 20, 30, 40, 50]\nmean = np.mean(data)\nprint(f"Mean: {mean}")  # Output: 30.0`,
    etymology: 'From Old French "meien" meaning middle, derived from Latin "medianus".',
    category: 'statistics',
    difficulty: 1,
  },
  {
    term: 'Median',
    definition: 'The middle value in a sorted dataset, separating the higher half from the lower half.',
    explanation: 'Unlike the mean, the median is robust to outliers. For an odd number of values, it is the middle number. For an even number, it is the average of the two middle values. Median is often preferred when data is skewed.',
    example: `import numpy as np\n\ndata = [1, 3, 5, 7, 100]  # Note the outlier\nmedian = np.median(data)\nmean = np.mean(data)\nprint(f"Median: {median}, Mean: {mean}")\n# Median: 5.0, Mean: 23.2`,
    etymology: 'From Latin "medianus" meaning "of the middle".',
    category: 'statistics',
    difficulty: 1,
  },
  {
    term: 'Standard Deviation',
    definition: 'A measure of the amount of variation or dispersion in a set of values.',
    explanation: 'Standard deviation quantifies how spread out data points are from the mean. A low SD indicates data points cluster near the mean; high SD means they are spread over a wider range. In a normal distribution, ~68% of data falls within 1 SD of the mean.',
    example: `import numpy as np\n\ndata = [2, 4, 4, 4, 5, 5, 7, 9]\nstd = np.std(data, ddof=1)  # ddof=1 for sample SD\nprint(f"Standard Deviation: {std:.2f}")  # ~2.14`,
    etymology: 'Introduced by Karl Pearson in 1894. "Standard" refers to a standardized measure; "deviation" from Latin "deviare" meaning to turn aside.',
    category: 'statistics',
    difficulty: 1,
  },
  {
    term: 'Variance',
    definition: 'The average of the squared differences from the mean, measuring how far values spread from the average.',
    explanation: 'Variance is the square of standard deviation. While it provides useful mathematical properties (always positive, additive for independent variables), its units are squared, making it less interpretable than standard deviation for practical purposes.',
    example: `import numpy as np\n\ndata = [2, 4, 4, 4, 5, 5, 7, 9]\nvariance = np.var(data, ddof=1)\nprint(f"Variance: {variance:.2f}")  # ~4.57`,
    etymology: 'From Latin "variantia" meaning difference or diversity.',
    category: 'statistics',
    difficulty: 1,
  },
  {
    term: 'Histogram',
    definition: 'A graphical representation showing the distribution of numerical data using bars of different heights.',
    explanation: 'Histograms divide data into bins and show the frequency of values in each bin. They help visualize the shape of a distribution (normal, skewed, bimodal), identify outliers, and understand data spread. Bin size significantly affects the visual interpretation.',
    example: `import matplotlib.pyplot as plt\nimport numpy as np\n\ndata = np.random.normal(0, 1, 1000)\nplt.hist(data, bins=30, edgecolor='black')\nplt.xlabel('Value')\nplt.ylabel('Frequency')\nplt.show()`,
    etymology: 'From Greek "histos" (mast, web) + "gramma" (drawing), coined by Karl Pearson in 1891.',
    category: 'statistics',
    difficulty: 1,
  },

  // Statistics - Intermediate (5)
  {
    term: 'p-value',
    definition: 'The probability of observing results at least as extreme as the measured results, assuming the null hypothesis is true.',
    explanation: 'A p-value helps determine statistical significance. A small p-value (typically < 0.05) suggests that the observed data is unlikely under the null hypothesis, leading to its rejection. It does NOT measure the probability that the hypothesis is true or the size of an effect.',
    example: `from scipy import stats\n\n# Testing if a coin is fair (60 heads out of 100 flips)\nresult = stats.binomtest(60, 100, 0.5)\nprint(f"p-value: {result.pvalue:.4f}")  # ~0.0569`,
    etymology: 'From "probability value", introduced by Karl Pearson in the early 20th century.',
    category: 'statistics',
    difficulty: 2,
  },
  {
    term: 'Confidence Interval',
    definition: 'A range of values that is likely to contain the true population parameter with a specified level of confidence.',
    explanation: 'A 95% confidence interval means that if we repeated the experiment many times, 95% of the calculated intervals would contain the true parameter. It reflects uncertainty in estimation, not the probability that the true value lies within the interval.',
    example: `import scipy.stats as stats\nimport numpy as np\n\ndata = [23, 25, 28, 30, 32, 35, 38]\nci = stats.t.interval(0.95, len(data)-1, loc=np.mean(data), scale=stats.sem(data))\nprint(f"95% CI: ({ci[0]:.2f}, {ci[1]:.2f})")`,
    etymology: 'Developed by Jerzy Neyman in 1937 as part of the Neyman-Pearson framework.',
    category: 'statistics',
    difficulty: 2,
  },
  {
    term: 'Correlation',
    definition: 'A statistical measure expressing the extent to which two variables are linearly related.',
    explanation: 'Correlation ranges from -1 to 1. A value of 1 indicates perfect positive correlation, -1 indicates perfect negative correlation, and 0 indicates no linear relationship. Importantly, correlation does not imply causation.',
    example: `import numpy as np\nfrom scipy.stats import pearsonr\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 5, 4, 5]\nr, p = pearsonr(x, y)\nprint(f"Correlation: {r:.2f}, p-value: {p:.4f}")`,
    etymology: 'From Latin "correlatio", meaning mutual relation, used statistically since the 1880s by Francis Galton.',
    category: 'statistics',
    difficulty: 2,
  },
  {
    term: 'Hypothesis Testing',
    definition: 'A formal procedure for investigating ideas about the world using statistics to determine if there is enough evidence to reject a null hypothesis.',
    explanation: 'Hypothesis testing involves stating a null hypothesis (H0) and alternative hypothesis (H1), collecting data, and calculating the probability of observing the data if H0 were true. If this probability (p-value) is below a threshold, we reject H0.',
    example: `from scipy import stats\n\n# Test if sample mean differs from 50\ndata = [52, 48, 55, 51, 49, 53, 50, 47]\nt_stat, p_value = stats.ttest_1samp(data, 50)\nprint(f"t-statistic: {t_stat:.2f}, p-value: {p_value:.4f}")`,
    etymology: 'Formalized by Neyman and Pearson in the 1930s, building on Fisher\'s significance testing.',
    category: 'statistics',
    difficulty: 2,
  },
  {
    term: 'Normal Distribution',
    definition: 'A symmetric, bell-shaped probability distribution where most observations cluster around the mean.',
    explanation: 'Also called the Gaussian distribution, it is defined by mean (μ) and standard deviation (σ). Many natural phenomena follow this distribution due to the Central Limit Theorem. About 68% of data falls within 1σ, 95% within 2σ, and 99.7% within 3σ of the mean.',
    example: `import numpy as np\nimport scipy.stats as stats\n\n# Generate and analyze normal data\ndata = np.random.normal(loc=100, scale=15, size=1000)\nprint(f"Mean: {np.mean(data):.1f}, Std: {np.std(data):.1f}")\nprint(f"Shapiro-Wilk test p-value: {stats.shapiro(data[:100])[1]:.4f}")`,
    etymology: 'Named "normal" by Karl Pearson, as it was thought to represent the "norm" of natural variation.',
    category: 'statistics',
    difficulty: 2,
  },

  // Statistics - Advanced (5)
  {
    term: 'Central Limit Theorem',
    definition: 'The theorem stating that the sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of the population distribution.',
    explanation: 'CLT is foundational to inferential statistics. It allows us to make probabilistic statements about sample means even when the underlying population is not normally distributed. Generally, n ≥ 30 is considered sufficient for the approximation.',
    example: `import numpy as np\nimport matplotlib.pyplot as plt\n\n# Sample from exponential distribution\nsampling_means = [np.mean(np.random.exponential(1, 50)) for _ in range(1000)]\nplt.hist(sampling_means, bins=30)\nplt.title("Sampling Distribution (n=50)")`,
    etymology: 'First stated by Abraham de Moivre in 1733 and later expanded by Laplace.',
    category: 'statistics',
    difficulty: 3,
  },
  {
    term: 'Maximum Likelihood Estimation',
    definition: 'A method for estimating parameters of a probability distribution by maximizing a likelihood function.',
    explanation: 'MLE finds parameter values that make the observed data most probable. It is the foundation for many statistical methods and machine learning algorithms. MLE estimators are often consistent and asymptotically efficient.',
    example: `from scipy.stats import norm\nfrom scipy.optimize import minimize\nimport numpy as np\n\ndata = np.random.normal(5, 2, 100)\nneg_log_likelihood = lambda params: -np.sum(norm.logpdf(data, params[0], params[1]))\nresult = minimize(neg_log_likelihood, [0, 1], method='Nelder-Mead')\nprint(f"MLE: mu={result.x[0]:.2f}, sigma={result.x[1]:.2f}")`,
    etymology: 'Developed by R.A. Fisher in the 1920s as an alternative to method of moments.',
    category: 'statistics',
    difficulty: 3,
  },
  {
    term: 'Bayesian Inference',
    definition: 'A method of statistical inference that updates probability estimates as new evidence is acquired using Bayes\' theorem.',
    explanation: 'Unlike frequentist statistics, Bayesian inference treats parameters as random variables with probability distributions. It combines prior beliefs with observed data to produce posterior distributions, allowing for intuitive probability statements about parameters.',
    example: `import pymc as pm\nimport numpy as np\n\ndata = np.random.normal(5, 2, 100)\nwith pm.Model() as model:\n    mu = pm.Normal('mu', mu=0, sigma=10)\n    sigma = pm.HalfNormal('sigma', sigma=5)\n    y = pm.Normal('y', mu=mu, sigma=sigma, observed=data)\n    trace = pm.sample(1000)`,
    etymology: 'Named after Thomas Bayes (1701-1761), whose theorem was published posthumously in 1763.',
    category: 'statistics',
    difficulty: 3,
  },
  {
    term: 'ANOVA',
    definition: 'Analysis of Variance - a statistical method for comparing means across three or more groups.',
    explanation: 'ANOVA tests whether there are significant differences between group means by analyzing variance within and between groups. The F-statistic measures the ratio of between-group variance to within-group variance. Significant results require post-hoc tests to identify which groups differ.',
    example: `from scipy import stats\n\ngroup1 = [23, 25, 28, 30, 32]\ngroup2 = [30, 32, 35, 38, 40]\ngroup3 = [25, 27, 29, 31, 33]\n\nf_stat, p_value = stats.f_oneway(group1, group2, group3)\nprint(f"F-statistic: {f_stat:.2f}, p-value: {p_value:.4f}")`,
    etymology: 'Developed by R.A. Fisher in the 1920s for agricultural experiments.',
    category: 'statistics',
    difficulty: 3,
  },
  {
    term: 'Bootstrapping',
    definition: 'A resampling technique that involves repeatedly sampling from the observed data with replacement to estimate statistics.',
    explanation: 'Bootstrapping allows estimation of sampling distributions without assuming a specific parametric form. It is useful for calculating confidence intervals, standard errors, and bias when analytical solutions are difficult or assumptions are questionable.',
    example: `import numpy as np\n\ndata = [23, 25, 28, 30, 32, 35, 38]\nn_bootstrap = 10000\nmeans = [np.mean(np.random.choice(data, len(data), replace=True)) for _ in range(n_bootstrap)]\nci = np.percentile(means, [2.5, 97.5])\nprint(f"95% Bootstrap CI: ({ci[0]:.2f}, {ci[1]:.2f})")`,
    etymology: 'Named after the phrase "pulling oneself up by one\'s bootstraps", introduced by Bradley Efron in 1979.',
    category: 'statistics',
    difficulty: 3,
  },

  // Probability - Beginner (4)
  {
    term: 'Probability',
    definition: 'A measure of the likelihood that an event will occur, expressed as a number between 0 and 1.',
    explanation: 'Probability of 0 means the event will never occur, and 1 means it will certainly occur. Probabilities can be theoretical (based on logic), empirical (based on data), or subjective (based on beliefs).',
    example: `# Probability of rolling a 6 on a fair die\np_six = 1/6\nprint(f"P(6) = {p_six:.4f}")  # 0.1667\n\n# Probability of heads on a fair coin\np_heads = 0.5`,
    etymology: 'From Latin "probabilitas" meaning "worthiness of belief".',
    category: 'probability',
    difficulty: 1,
  },
  {
    term: 'Random Variable',
    definition: 'A variable whose value is determined by the outcome of a random phenomenon.',
    explanation: 'Random variables can be discrete (countable outcomes like dice rolls) or continuous (infinite outcomes like heights). They are characterized by probability distributions that describe the likelihood of different values.',
    example: `import numpy as np\n\n# Discrete: number of heads in 10 coin flips\nflips = np.random.binomial(10, 0.5, size=1000)\nprint(f"Mean heads: {np.mean(flips):.2f}")\n\n# Continuous: normally distributed values\nvalues = np.random.normal(0, 1, 1000)`,
    etymology: 'Formalized in probability theory during the 20th century by mathematicians like Kolmogorov.',
    category: 'probability',
    difficulty: 1,
  },
  {
    term: 'Expected Value',
    definition: 'The long-run average value of a random variable over many repetitions of an experiment.',
    explanation: 'Expected value is calculated by multiplying each outcome by its probability and summing. It represents the "center" of a probability distribution. For fair games, the expected value of winnings should be zero.',
    example: `# Expected value of a fair die roll\noutcomes = [1, 2, 3, 4, 5, 6]\nprobabilities = [1/6] * 6\nE_X = sum(x * p for x, p in zip(outcomes, probabilities))\nprint(f"E[X] = {E_X:.2f}")  # 3.5`,
    etymology: 'Concept developed by Pascal and Fermat in the 17th century while studying gambling problems.',
    category: 'probability',
    difficulty: 1,
  },
  {
    term: 'Independent Events',
    definition: 'Events where the occurrence of one does not affect the probability of the other.',
    explanation: 'For independent events A and B: P(A and B) = P(A) × P(B). Coin flips are independent - previous flips don\'t influence future ones. Many real-world events are not truly independent, which has important implications for analysis.',
    example: `# Probability of getting heads twice in a row\np_heads = 0.5\np_two_heads = p_heads * p_heads\nprint(f"P(HH) = {p_two_heads:.4f}")  # 0.25\n\n# Each flip is independent - no "hot streaks"`,
    etymology: 'Concept formalized by probability theorists in the 17th-18th centuries.',
    category: 'probability',
    difficulty: 1,
  },

  // Probability - Intermediate (3)
  {
    term: 'Bayes\' Theorem',
    definition: 'A formula for calculating conditional probability: P(A|B) = P(B|A) × P(A) / P(B).',
    explanation: 'Bayes\' theorem allows updating beliefs based on new evidence. The prior P(A) represents initial belief, likelihood P(B|A) is evidence probability given the hypothesis, and posterior P(A|B) is the updated belief.',
    example: `# Medical test: 1% have disease, 90% true positive, 5% false positive\nP_disease = 0.01\nP_positive_given_disease = 0.90\nP_positive_given_healthy = 0.05\n\nP_positive = P_positive_given_disease * P_disease + P_positive_given_healthy * (1 - P_disease)\nP_disease_given_positive = (P_positive_given_disease * P_disease) / P_positive\nprint(f"P(Disease|Positive) = {P_disease_given_positive:.4f}")  # ~0.154`,
    etymology: 'Named after Thomas Bayes (1701-1761), an English statistician and minister.',
    category: 'probability',
    difficulty: 2,
  },
  {
    term: 'Conditional Probability',
    definition: 'The probability of an event occurring given that another event has already occurred.',
    explanation: 'Written as P(A|B), read as "probability of A given B". It differs from joint probability P(A and B) by focusing on a restricted sample space where B has occurred. Conditional probability is fundamental to Bayes\' theorem.',
    example: `# Drawing cards: P(King | Face card)\n# 4 kings out of 12 face cards\np_king_given_face = 4/12\nprint(f"P(King|Face) = {p_king_given_face:.4f}")  # 0.333\n\n# Compare to unconditional: P(King) = 4/52 = 0.077`,
    etymology: 'Formalized by Bayes and Laplace in the 18th century.',
    category: 'probability',
    difficulty: 2,
  },
  {
    term: 'Law of Large Numbers',
    definition: 'The theorem stating that as sample size increases, the sample mean converges to the expected value.',
    explanation: 'LLN explains why casinos always win in the long run and why larger samples give more reliable estimates. It comes in two forms: weak (convergence in probability) and strong (almost sure convergence).',
    example: `import numpy as np\nimport matplotlib.pyplot as plt\n\n# Demonstrate convergence of sample mean to true mean\ntrue_mean = 0.5\nn_samples = 10000\nsamples = np.random.binomial(1, true_mean, n_samples)\nrunning_mean = np.cumsum(samples) / np.arange(1, n_samples + 1)\nplt.plot(running_mean)\nplt.axhline(y=true_mean, color='r', linestyle='--')`,
    etymology: 'First proven by Jakob Bernoulli in 1713.',
    category: 'probability',
    difficulty: 2,
  },

  // Probability - Advanced (3)
  {
    term: 'Monte Carlo Simulation',
    definition: 'A computational technique using random sampling to obtain numerical results for problems that may be deterministic in principle.',
    explanation: 'Monte Carlo methods are used when analytical solutions are intractable. Applications include option pricing, risk analysis, and integral approximation. The accuracy typically improves with more samples at a rate of 1/√n.',
    example: `import numpy as np\n\n# Estimate pi using random sampling\nn_points = 100000\nx = np.random.uniform(-1, 1, n_points)\ny = np.random.uniform(-1, 1, n_points)\ninside_circle = np.sum(x**2 + y**2 <= 1)\npi_estimate = 4 * inside_circle / n_points\nprint(f"Pi estimate: {pi_estimate:.4f}")`,
    etymology: 'Named after the Monte Carlo casino, coined by Stanislaw Ulam and John von Neumann in the 1940s.',
    category: 'probability',
    difficulty: 3,
  },
  {
    term: 'Markov Chain',
    definition: 'A stochastic process where the probability of each event depends only on the state attained in the previous event.',
    explanation: 'Markov chains have the "memoryless" property - the future depends only on the present, not the past. They are used in weather modeling, PageRank, speech recognition, and MCMC sampling. Key properties include stationary distributions and convergence.',
    example: `import numpy as np\n\n# Weather Markov chain: Sunny->Sunny: 0.8, Sunny->Rainy: 0.2\ntransition = np.array([[0.8, 0.2], [0.4, 0.6]])\nstate = np.array([1, 0])  # Start sunny\nfor _ in range(100):\n    state = state @ transition\nprint(f"Long-run: Sunny={state[0]:.2f}, Rainy={state[1]:.2f}")`,
    etymology: 'Named after Russian mathematician Andrey Markov who studied them in 1906.',
    category: 'probability',
    difficulty: 3,
  },
  {
    term: 'Poisson Distribution',
    definition: 'A discrete probability distribution expressing the probability of a given number of events occurring in a fixed interval of time or space.',
    explanation: 'The Poisson distribution models rare, independent events: customer arrivals, radioactive decay, typos per page. It is characterized by λ (lambda), the average rate. When n is large and p is small, binomial approximates Poisson.',
    example: `from scipy.stats import poisson\nimport matplotlib.pyplot as plt\n\n# Emails per hour (avg 5)\nlambda_rate = 5\nx = range(15)\nprobabilities = poisson.pmf(x, lambda_rate)\nplt.bar(x, probabilities)\nprint(f"P(X=3) = {poisson.pmf(3, lambda_rate):.4f}")`,
    etymology: 'Named after French mathematician Siméon Denis Poisson who published it in 1837.',
    category: 'probability',
    difficulty: 3,
  },

  // Machine Learning - Beginner (5)
  {
    term: 'Overfitting',
    definition: 'When a model learns the training data too well, including noise and outliers, resulting in poor generalization to new data.',
    explanation: 'Overfitting occurs when a model is too complex relative to the amount of training data. Signs include high training accuracy but low test accuracy. Solutions include regularization, cross-validation, early stopping, and gathering more data.',
    example: `from sklearn.model_selection import cross_val_score\nfrom sklearn.tree import DecisionTreeClassifier\n\n# Detecting overfitting with CV\nmodel = DecisionTreeClassifier(max_depth=None)  # Can overfit\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV scores: {scores}")\nprint(f"Mean: {scores.mean():.2f}, Std: {scores.std():.2f}")`,
    etymology: 'Term emerged in the 1970s-80s as machine learning formalized.',
    category: 'machine_learning',
    difficulty: 1,
  },
  {
    term: 'Training Set',
    definition: 'The subset of data used to train a machine learning model by learning patterns and relationships.',
    explanation: 'The training set is used to fit model parameters. It should be representative of the data the model will encounter. Typically 60-80% of available data is used for training, with the rest reserved for validation and testing.',
    example: `from sklearn.model_selection import train_test_split\n\n# Split data: 70% train, 15% validation, 15% test\nX_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)\nX_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)`,
    etymology: 'Standard terminology in machine learning since the field\'s inception.',
    category: 'machine_learning',
    difficulty: 1,
  },
  {
    term: 'Feature',
    definition: 'An individual measurable property or characteristic of a phenomenon being observed, used as input to a machine learning model.',
    explanation: 'Features are the variables that models use to make predictions. Good features capture relevant information about the target variable. Feature engineering - creating and selecting effective features - is often the most important step in building successful models.',
    example: `import pandas as pd\n\n# Features for house price prediction\ndf = pd.DataFrame({\n    'sqft': [1500, 2000, 2500],        # Feature 1\n    'bedrooms': [3, 4, 4],              # Feature 2\n    'age_years': [10, 5, 2],            # Feature 3\n    'price': [300000, 450000, 550000]   # Target\n})`,
    etymology: 'From Latin "factura" meaning formation or creation.',
    category: 'machine_learning',
    difficulty: 1,
  },
  {
    term: 'Supervised Learning',
    definition: 'A type of machine learning where the model learns from labeled data, with both input features and corresponding output labels.',
    explanation: 'In supervised learning, we have examples with known answers (labels) that the model learns to predict. Common tasks include classification (predicting categories) and regression (predicting continuous values). The model is "supervised" by the correct answers.',
    example: `from sklearn.linear_model import LogisticRegression\n\n# Supervised: we have labels (y)\nX = [[1, 2], [2, 3], [3, 4], [4, 5]]\ny = [0, 0, 1, 1]  # Labels\n\nmodel = LogisticRegression()\nmodel.fit(X, y)  # Learn from labeled examples\nprint(model.predict([[2.5, 3.5]]))`,
    etymology: 'Named for the analogy to a teacher supervising a student\'s learning.',
    category: 'machine_learning',
    difficulty: 1,
  },
  {
    term: 'Classification',
    definition: 'A supervised learning task where the model predicts which category or class an input belongs to.',
    explanation: 'Classification can be binary (two classes) or multi-class (more than two). Common algorithms include logistic regression, decision trees, random forests, and neural networks. Performance is measured using metrics like accuracy, precision, recall, and F1-score.',
    example: `from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Binary classification: spam detection\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\npredictions = model.predict(X_test)\nprint(f"Accuracy: {accuracy_score(y_test, predictions):.2f}")`,
    etymology: 'From Latin "classis" (class) + "facere" (to make).',
    category: 'machine_learning',
    difficulty: 1,
  },

  // Machine Learning - Intermediate (5)
  {
    term: 'Cross-Validation',
    definition: 'A technique for assessing model performance by training and testing on different subsets of the data.',
    explanation: 'K-fold cross-validation splits data into k parts, trains on k-1, and tests on the remaining fold, rotating through all combinations. This provides a more reliable performance estimate than a single train/test split and helps detect overfitting.',
    example: `from sklearn.model_selection import cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\n\nmodel = RandomForestClassifier(n_estimators=100)\nscores = cross_val_score(model, X, y, cv=5, scoring='accuracy')\nprint(f"CV Scores: {scores}")\nprint(f"Mean: {scores.mean():.3f} (+/- {scores.std()*2:.3f})")`,
    etymology: 'Term coined in statistics for validating models across multiple data subsets.',
    category: 'machine_learning',
    difficulty: 2,
  },
  {
    term: 'Gradient Descent',
    definition: 'An optimization algorithm that iteratively adjusts parameters in the direction of steepest decrease of a loss function.',
    explanation: 'Gradient descent is foundational to training neural networks. It computes the gradient (partial derivatives) of the loss function with respect to each parameter, then updates parameters in the opposite direction. Learning rate controls step size.',
    example: `import numpy as np\n\n# Simple gradient descent for linear regression\ndef gradient_descent(X, y, lr=0.01, epochs=100):\n    w = np.zeros(X.shape[1])\n    for _ in range(epochs):\n        gradient = -2 * X.T @ (y - X @ w) / len(y)\n        w = w - lr * gradient\n    return w`,
    etymology: 'Developed by Cauchy in 1847 as "méthode du gradient".',
    category: 'machine_learning',
    difficulty: 2,
  },
  {
    term: 'Regularization',
    definition: 'A technique that adds a penalty term to the loss function to prevent overfitting by discouraging complex models.',
    explanation: 'L1 regularization (Lasso) adds the absolute value of weights, promoting sparsity. L2 regularization (Ridge) adds squared weights, keeping weights small. Elastic Net combines both. Regularization trades some training accuracy for better generalization.',
    example: `from sklearn.linear_model import Ridge, Lasso, ElasticNet\n\n# L2 regularization\nridge = Ridge(alpha=1.0)\nridge.fit(X_train, y_train)\n\n# L1 regularization (produces sparse weights)\nlasso = Lasso(alpha=0.1)\nlasso.fit(X_train, y_train)`,
    etymology: 'From Latin "regula" meaning rule, referring to constraints on model complexity.',
    category: 'machine_learning',
    difficulty: 2,
  },
  {
    term: 'Decision Tree',
    definition: 'A model that makes predictions by learning simple decision rules inferred from data features, represented as a tree structure.',
    explanation: 'Decision trees split data based on feature values that best separate classes. They are interpretable, handle non-linear relationships, and require little preprocessing. However, they are prone to overfitting unless constrained with max depth or minimum samples.',
    example: `from sklearn.tree import DecisionTreeClassifier, plot_tree\nimport matplotlib.pyplot as plt\n\nmodel = DecisionTreeClassifier(max_depth=3)\nmodel.fit(X_train, y_train)\n\nplt.figure(figsize=(20, 10))\nplot_tree(model, feature_names=feature_names, filled=True)\nplt.show()`,
    etymology: 'Named for its tree-like structure of branching decisions.',
    category: 'machine_learning',
    difficulty: 2,
  },
  {
    term: 'Precision and Recall',
    definition: 'Precision is the ratio of true positives to predicted positives; Recall is the ratio of true positives to actual positives.',
    explanation: 'Precision answers "of predictions I made, how many were correct?" Recall answers "of actual positives, how many did I find?" The F1 score is their harmonic mean. These metrics are essential when classes are imbalanced.',
    example: `from sklearn.metrics import precision_score, recall_score, f1_score\n\ny_true = [1, 1, 1, 0, 0, 0, 1, 1]\ny_pred = [1, 0, 1, 0, 0, 1, 1, 1]\n\nprint(f"Precision: {precision_score(y_true, y_pred):.2f}")\nprint(f"Recall: {recall_score(y_true, y_pred):.2f}")\nprint(f"F1: {f1_score(y_true, y_pred):.2f}")`,
    etymology: 'Terms from information retrieval, measuring relevance of retrieved documents.',
    category: 'machine_learning',
    difficulty: 2,
  },

  // Machine Learning - Advanced (5)
  {
    term: 'Ensemble Methods',
    definition: 'Techniques that combine multiple models to produce better predictions than any individual model.',
    explanation: 'Bagging (e.g., Random Forest) reduces variance by averaging independent models. Boosting (e.g., XGBoost) reduces bias by sequentially correcting errors. Stacking combines different model types. Ensembles often win ML competitions.',
    example: `from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.ensemble import VotingClassifier\n\nrf = RandomForestClassifier(n_estimators=100)\ngb = GradientBoostingClassifier(n_estimators=100)\n\n# Voting ensemble\nensemble = VotingClassifier([('rf', rf), ('gb', gb)], voting='soft')\nensemble.fit(X_train, y_train)`,
    etymology: 'From French "ensemble" meaning together.',
    category: 'machine_learning',
    difficulty: 3,
  },
  {
    term: 'Feature Importance',
    definition: 'A measure of how much each feature contributes to a model\'s predictions.',
    explanation: 'Understanding feature importance helps interpret models, identify useful features, and detect potential issues. Methods include permutation importance, tree-based importance, SHAP values, and coefficient magnitudes in linear models.',
    example: `from sklearn.ensemble import RandomForestClassifier\nimport matplotlib.pyplot as plt\n\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\nimportances = model.feature_importances_\nplt.barh(feature_names, importances)\nplt.xlabel('Importance')\nplt.title('Feature Importance')`,
    etymology: 'Term developed as interpretability became crucial in ML.',
    category: 'machine_learning',
    difficulty: 3,
  },
  {
    term: 'Hyperparameter Tuning',
    definition: 'The process of finding optimal values for model settings that are not learned from data but set before training.',
    explanation: 'Hyperparameters like learning rate, tree depth, and regularization strength affect model performance. Common search methods include grid search, random search, and Bayesian optimization. Always tune on validation data, not test data.',
    example: `from sklearn.model_selection import GridSearchCV\nfrom sklearn.ensemble import RandomForestClassifier\n\nparam_grid = {\n    'n_estimators': [50, 100, 200],\n    'max_depth': [None, 10, 20],\n    'min_samples_split': [2, 5, 10]\n}\n\ngrid = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)\ngrid.fit(X_train, y_train)\nprint(f"Best params: {grid.best_params_}")`,
    etymology: '"Hyper" from Greek meaning "over" or "beyond", as these are set above the learning process.',
    category: 'machine_learning',
    difficulty: 3,
  },
  {
    term: 'Dimensionality Reduction',
    definition: 'Techniques for reducing the number of input variables in a dataset while preserving important information.',
    explanation: 'High-dimensional data can cause overfitting, slow training, and difficulty in visualization. PCA finds directions of maximum variance, t-SNE preserves local structure for visualization, and UMAP balances local and global structure.',
    example: `from sklearn.decomposition import PCA\nfrom sklearn.manifold import TSNE\nimport matplotlib.pyplot as plt\n\n# Reduce to 2D for visualization\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X)\n\ntsne = TSNE(n_components=2, perplexity=30)\nX_tsne = tsne.fit_transform(X)`,
    etymology: 'Refers to reducing the dimensionality (number of features) of data.',
    category: 'machine_learning',
    difficulty: 3,
  },
  {
    term: 'Model Selection',
    definition: 'The process of choosing the best model among multiple candidates based on performance metrics and constraints.',
    explanation: 'Model selection considers accuracy, interpretability, training time, inference speed, and deployment requirements. It involves comparing algorithms, architectures, and hyperparameter configurations. Use validation data for selection, test data for final evaluation.',
    example: `from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\n\nmodels = [\n    ('Logistic', LogisticRegression()),\n    ('RF', RandomForestClassifier()),\n    ('GB', GradientBoostingClassifier())\n]\n\nfor name, model in models:\n    scores = cross_val_score(model, X, y, cv=5)\n    print(f"{name}: {scores.mean():.3f} (+/- {scores.std()*2:.3f})")`,
    etymology: 'Standard terminology in machine learning for choosing optimal models.',
    category: 'machine_learning',
    difficulty: 3,
  },

  // Deep Learning (5)
  {
    term: 'Neural Network',
    definition: 'A computing system inspired by biological neural networks, consisting of interconnected nodes that process information using connectionist approaches.',
    explanation: 'Neural networks have input, hidden, and output layers. Each connection has a weight that is learned during training. They can learn complex non-linear patterns but require significant data and compute. Deep networks have many hidden layers.',
    example: `import torch\nimport torch.nn as nn\n\nclass SimpleNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.layers = nn.Sequential(\n            nn.Linear(10, 64),\n            nn.ReLU(),\n            nn.Linear(64, 32),\n            nn.ReLU(),\n            nn.Linear(32, 1)\n        )\n    \n    def forward(self, x):\n        return self.layers(x)`,
    etymology: 'Named for analogy to neurons in the brain, though the connection is loose.',
    category: 'deep_learning',
    difficulty: 1,
  },
  {
    term: 'Backpropagation',
    definition: 'An algorithm for efficiently calculating gradients in neural networks by propagating errors backward from output to input.',
    explanation: 'Backpropagation uses the chain rule to compute how each weight contributes to the error. This enables gradient descent optimization of deep networks. It revolutionized neural network training in the 1980s.',
    example: `import torch\nimport torch.nn as nn\n\n# Automatic backpropagation in PyTorch\nmodel = nn.Linear(10, 1)\ncriterion = nn.MSELoss()\noptimizer = torch.optim.SGD(model.parameters(), lr=0.01)\n\n# Forward pass\noutput = model(x)\nloss = criterion(output, y)\n\n# Backward pass (computes gradients)\nloss.backward()\noptimizer.step()`,
    etymology: 'Short for "backward propagation of errors", formalized by Rumelhart et al. in 1986.',
    category: 'deep_learning',
    difficulty: 2,
  },
  {
    term: 'Dropout',
    definition: 'A regularization technique where random neurons are temporarily ignored during training to prevent overfitting.',
    explanation: 'Dropout forces the network to learn redundant representations by randomly "dropping" neurons with a given probability. This prevents co-adaptation of neurons and acts as an ensemble method. Dropout is disabled during inference.',
    example: `import torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Linear(100, 256),\n    nn.ReLU(),\n    nn.Dropout(p=0.5),  # 50% dropout\n    nn.Linear(256, 64),\n    nn.ReLU(),\n    nn.Dropout(p=0.3),  # 30% dropout\n    nn.Linear(64, 10)\n)`,
    etymology: 'Named for "dropping out" neurons, introduced by Hinton et al. in 2012.',
    category: 'deep_learning',
    difficulty: 2,
  },
  {
    term: 'Attention Mechanism',
    definition: 'A component that allows models to focus on relevant parts of the input when producing output, weighted by learned importance scores.',
    explanation: 'Attention computes compatibility scores between query and key vectors, then uses these to weight value vectors. Self-attention relates different positions in a sequence. Transformers use multi-head attention for parallel attention computations.',
    example: `import torch\nimport torch.nn as nn\nimport math\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n    weights = torch.softmax(scores, dim=-1)\n    return torch.matmul(weights, V)`,
    etymology: 'Named for the cognitive concept of selective attention, introduced in NLP by Bahdanau et al. in 2014.',
    category: 'deep_learning',
    difficulty: 2,
  },
  {
    term: 'Transformer',
    definition: 'A neural network architecture based entirely on attention mechanisms, without recurrence or convolution.',
    explanation: 'Transformers process sequences in parallel using self-attention, making them faster than RNNs. They power modern LLMs like GPT and BERT. Key components include multi-head attention, positional encoding, and layer normalization.',
    example: `import torch.nn as nn\n\nclass TransformerBlock(nn.Module):\n    def __init__(self, d_model, n_heads):\n        super().__init__()\n        self.attention = nn.MultiheadAttention(d_model, n_heads)\n        self.norm1 = nn.LayerNorm(d_model)\n        self.ff = nn.Sequential(\n            nn.Linear(d_model, d_model * 4),\n            nn.GELU(),\n            nn.Linear(d_model * 4, d_model)\n        )\n        self.norm2 = nn.LayerNorm(d_model)`,
    etymology: 'Named for its ability to transform sequential data, introduced in "Attention Is All You Need" (2017).',
    category: 'deep_learning',
    difficulty: 3,
  },

  // Tools - Beginner (4)
  {
    term: 'pandas',
    definition: 'A Python library providing data structures and tools for data manipulation and analysis.',
    explanation: 'pandas provides DataFrame and Series objects for handling structured data. It excels at data cleaning, transformation, merging, and time series operations. Essential for data science workflows, it integrates well with NumPy and scikit-learn.',
    example: `import pandas as pd\n\ndf = pd.read_csv('data.csv')\n\n# Common operations\ndf.head()               # First 5 rows\ndf.describe()           # Statistics\ndf.groupby('category').mean()\ndf[df['age'] > 30]      # Filtering\ndf['new_col'] = df['a'] + df['b']  # New column`,
    etymology: 'Named from "Panel Data", a term in econometrics for multi-dimensional structured data.',
    category: 'tools',
    difficulty: 1,
  },
  {
    term: 'NumPy',
    definition: 'The fundamental Python library for numerical computing, providing support for large, multi-dimensional arrays and matrices.',
    explanation: 'NumPy is the foundation for scientific computing in Python. It provides efficient array operations, broadcasting, linear algebra, random number generation, and FFT. Most data science libraries build on NumPy arrays.',
    example: `import numpy as np\n\n# Array operations\narr = np.array([1, 2, 3, 4, 5])\nprint(arr.mean(), arr.std())    # Statistics\nprint(arr * 2)                  # Broadcasting\n\nmatrix = np.random.randn(3, 3)  # Random matrix\neigenvalues = np.linalg.eigvals(matrix)`,
    etymology: 'Short for "Numerical Python", created by Travis Oliphant in 2005.',
    category: 'tools',
    difficulty: 1,
  },
  {
    term: 'Jupyter Notebook',
    definition: 'An interactive web-based environment for creating and sharing documents with live code, equations, visualizations, and narrative text.',
    explanation: 'Jupyter Notebooks combine code execution with rich documentation. They are ideal for exploratory data analysis, prototyping, and communication. Code runs in cells that can be executed independently, enabling iterative development.',
    example: `# In a Jupyter cell:\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf = pd.read_csv('data.csv')\ndf['value'].plot(kind='hist')\nplt.title('Distribution')\nplt.show()\n\n# Results appear inline below the cell`,
    etymology: 'Name combines Julia, Python, and R - the three original supported languages.',
    category: 'tools',
    difficulty: 1,
  },
  {
    term: 'matplotlib',
    definition: 'A comprehensive Python library for creating static, animated, and interactive visualizations.',
    explanation: 'matplotlib provides MATLAB-like plotting functionality in Python. It can produce publication-quality figures and integrates with Jupyter Notebooks. While powerful, seaborn and plotly often provide easier APIs for specific visualization types.',
    example: `import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\nplt.figure(figsize=(10, 6))\nplt.plot(x, y, label='sin(x)')\nplt.xlabel('x')\nplt.ylabel('y')\nplt.title('Sine Wave')\nplt.legend()\nplt.grid(True)\nplt.show()`,
    etymology: 'Originally created to emulate MATLAB plotting, "mat" for MATLAB-like, "plot" for plotting, "lib" for library.',
    category: 'tools',
    difficulty: 1,
  },

  // Tools - Intermediate (3)
  {
    term: 'scikit-learn',
    definition: 'A Python machine learning library providing simple and efficient tools for data mining and analysis.',
    explanation: 'scikit-learn offers consistent APIs for classification, regression, clustering, and dimensionality reduction. It includes preprocessing, model selection, and evaluation tools. Most algorithms follow the fit/predict pattern.',
    example: `from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\nX_train, X_test, y_train, y_test = train_test_split(X, y)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\nprint(f"Accuracy: {accuracy_score(y_test, model.predict(X_test))}")`,
    etymology: 'Originally named "scikits.learn" as part of SciPy Toolkits.',
    category: 'tools',
    difficulty: 2,
  },
  {
    term: 'SQL',
    definition: 'Structured Query Language - a standard language for storing, manipulating, and retrieving data in relational databases.',
    explanation: 'SQL is essential for working with structured data at scale. Key operations include SELECT, JOIN, GROUP BY, and aggregate functions. Understanding SQL is crucial even when using pandas, as many data sources are databases.',
    example: `-- Common SQL patterns\nSELECT category, COUNT(*) as count, AVG(price) as avg_price\nFROM products\nWHERE status = 'active'\nGROUP BY category\nHAVING COUNT(*) > 10\nORDER BY avg_price DESC\nLIMIT 5;`,
    etymology: 'Originally called SEQUEL (Structured English Query Language), developed at IBM in the 1970s.',
    category: 'tools',
    difficulty: 2,
  },
  {
    term: 'Git',
    definition: 'A distributed version control system for tracking changes in source code during software development.',
    explanation: 'Git tracks file changes, enables collaboration, and maintains project history. Key concepts include commits, branches, merges, and remotes. GitHub/GitLab provide hosting and collaboration features. Essential for reproducible data science.',
    example: `# Common git workflow\ngit init\ngit add .\ngit commit -m "Initial commit"\n\ngit checkout -b feature/analysis\n# ... make changes ...\ngit add analysis.py\ngit commit -m "Add exploratory analysis"\ngit push origin feature/analysis`,
    etymology: 'Created by Linus Torvalds in 2005. Name may mean "unpleasant person" in British slang or be an acronym.',
    category: 'tools',
    difficulty: 2,
  },

  // Tools - Advanced (3)
  {
    term: 'Docker',
    definition: 'A platform for developing, shipping, and running applications in isolated containers.',
    explanation: 'Docker packages applications with their dependencies into containers that run consistently across environments. This solves "works on my machine" problems. Data science workflows benefit from reproducible environments and easier deployment.',
    example: `# Dockerfile for data science\nFROM python:3.10-slim\n\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\nCOPY . .\nCMD ["python", "train.py"]\n\n# Build and run\n# docker build -t my-model .\n# docker run my-model`,
    etymology: 'Named after the shipping container concept - standardized containers for any cargo.',
    category: 'tools',
    difficulty: 3,
  },
  {
    term: 'Apache Spark',
    definition: 'A unified analytics engine for large-scale data processing, supporting SQL, streaming, machine learning, and graph processing.',
    explanation: 'Spark processes data in memory, making it much faster than Hadoop MapReduce. PySpark provides Python APIs. Spark is essential for big data that doesn\'t fit in pandas. It supports distributed computing across clusters.',
    example: `from pyspark.sql import SparkSession\n\nspark = SparkSession.builder.appName("Analysis").getOrCreate()\n\ndf = spark.read.parquet("s3://bucket/data/")\nresult = df.filter(df.value > 100)\\\n           .groupBy("category")\\\n           .agg({"amount": "sum"})\\\n           .orderBy("sum(amount)", ascending=False)\n\nresult.show()`,
    etymology: 'Named for its speed - sparking fast data processing.',
    category: 'tools',
    difficulty: 3,
  },
  {
    term: 'MLflow',
    definition: 'An open-source platform for managing the end-to-end machine learning lifecycle.',
    explanation: 'MLflow provides experiment tracking, model packaging, registry, and deployment. It helps organize experiments, compare runs, and reproduce results. Platform-agnostic and integrates with major ML libraries.',
    example: `import mlflow\nfrom sklearn.ensemble import RandomForestClassifier\n\nwith mlflow.start_run():\n    model = RandomForestClassifier(n_estimators=100)\n    model.fit(X_train, y_train)\n    \n    accuracy = model.score(X_test, y_test)\n    mlflow.log_param("n_estimators", 100)\n    mlflow.log_metric("accuracy", accuracy)\n    mlflow.sklearn.log_model(model, "model")`,
    etymology: 'ML for Machine Learning + flow for workflow management.',
    category: 'tools',
    difficulty: 3,
  },

  // Data Engineering (5)
  {
    term: 'ETL',
    definition: 'Extract, Transform, Load - a process for collecting data from various sources, transforming it, and loading it into a destination system.',
    explanation: 'ETL pipelines are fundamental to data warehousing. Extract reads from sources (databases, APIs, files). Transform cleans, validates, and restructures data. Load writes to the destination. Modern approaches often use ELT (load first, transform later).',
    example: `# Simplified ETL with Python\nimport pandas as pd\nfrom sqlalchemy import create_engine\n\n# Extract\ndf = pd.read_csv('source.csv')\n\n# Transform\ndf['date'] = pd.to_datetime(df['date'])\ndf = df.dropna()\ndf['amount'] = df['amount'].round(2)\n\n# Load\nengine = create_engine('postgresql://user:pass@host/db')\ndf.to_sql('target_table', engine, if_exists='append')`,
    etymology: 'Acronym for the three phases of data pipeline processing.',
    category: 'data_engineering',
    difficulty: 2,
  },
  {
    term: 'Data Lake',
    definition: 'A centralized repository that stores all structured and unstructured data at any scale in its raw format.',
    explanation: 'Unlike data warehouses that require predefined schemas, data lakes store raw data and apply schema on read. They support diverse analytics from dashboarding to machine learning. Cloud services like S3, ADLS, and GCS are common data lake storage.',
    example: `# Data lake organization example (S3)\n# s3://company-data-lake/\n#   ├── raw/\n#   │   ├── sales/2024/01/data.parquet\n#   │   └── logs/2024/01/events.json\n#   ├── processed/\n#   │   └── sales_cleaned/\n#   └── curated/\n#       └── sales_analytics/`,
    etymology: 'Analogy to a natural lake - data flows in and can be extracted for various purposes.',
    category: 'data_engineering',
    difficulty: 2,
  },
  {
    term: 'Data Pipeline',
    definition: 'A series of data processing steps that move and transform data from source systems to destination systems.',
    explanation: 'Pipelines automate data workflows with scheduled or event-triggered execution. They handle extraction, validation, transformation, and loading. Tools like Airflow, Prefect, and Dagster orchestrate complex pipeline DAGs with dependency management.',
    example: `# Airflow DAG example\nfrom airflow import DAG\nfrom airflow.operators.python import PythonOperator\nfrom datetime import datetime\n\ndag = DAG('daily_etl', start_date=datetime(2024, 1, 1), schedule_interval='@daily')\n\nextract = PythonOperator(task_id='extract', python_callable=extract_data, dag=dag)\ntransform = PythonOperator(task_id='transform', python_callable=transform_data, dag=dag)\nload = PythonOperator(task_id='load', python_callable=load_data, dag=dag)\n\nextract >> transform >> load`,
    etymology: 'Analogy to physical pipelines that transport materials from one place to another.',
    category: 'data_engineering',
    difficulty: 2,
  },
  {
    term: 'Schema',
    definition: 'The structure that defines how data is organized, including tables, columns, data types, and relationships.',
    explanation: 'Schemas ensure data consistency and enable efficient querying. Schema design involves normalization (reducing redundancy), denormalization (for query performance), and choosing appropriate data types. Schema evolution handles changes over time.',
    example: `-- Example schema for e-commerce\nCREATE TABLE customers (\n    customer_id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE orders (\n    order_id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(customer_id),\n    total DECIMAL(10, 2),\n    status VARCHAR(50)\n);`,
    etymology: 'From Greek "skhema" meaning form or figure.',
    category: 'data_engineering',
    difficulty: 1,
  },
  {
    term: 'Batch Processing',
    definition: 'Processing data in groups or batches at scheduled intervals, rather than processing each item as it arrives.',
    explanation: 'Batch processing is efficient for large volumes when real-time results aren\'t required. It allows optimization of resources and complex transformations. Common for nightly ETL jobs, model training, and report generation. Contrast with stream processing.',
    example: `# Batch processing with Spark\nfrom pyspark.sql import SparkSession\n\nspark = SparkSession.builder.getOrCreate()\n\n# Process yesterday's data\ndf = spark.read.parquet("s3://bucket/data/dt=2024-01-15/")\nresult = df.groupBy("category").agg({"sales": "sum"})\nresult.write.parquet("s3://bucket/aggregates/dt=2024-01-15/")`,
    etymology: 'From computing concept of grouping jobs for efficient processing.',
    category: 'data_engineering',
    difficulty: 3,
  },
]

async function seedConcepts() {
  console.log(`Seeding ${concepts.length} concepts...`)

  const { data, error } = await supabase
    .from('concepts')
    .insert(concepts)
    .select()

  if (error) {
    console.error('Error seeding concepts:', error)
    process.exit(1)
  }

  console.log(`Successfully seeded ${data.length} concepts`)

  // Create daily concept for today
  if (data.length > 0) {
    const today = new Date().toISOString().split('T')[0]
    const randomConcept = data[Math.floor(Math.random() * data.length)]

    const { error: dailyError } = await supabase
      .from('daily_concepts')
      .upsert({ concept_id: randomConcept.id, date: today })

    if (dailyError) {
      console.error('Error creating daily concept:', dailyError)
    } else {
      console.log(`Set "${randomConcept.term}" as today's concept`)
    }
  }
}

seedConcepts()
