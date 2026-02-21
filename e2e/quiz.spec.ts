import { test, expect } from '@playwright/test'

test.describe('Quiz', () => {
  test('displays quiz setup page', async ({ page }) => {
    await page.goto('/quiz')

    await expect(page.getByRole('heading', { name: /quiz mode/i })).toBeVisible()
    await expect(page.getByRole('button', { name: '5' })).toBeVisible()
    await expect(page.getByRole('button', { name: '10' })).toBeVisible()
  })

  test('starting quiz shows first question', async ({ page }) => {
    await page.goto('/quiz')

    await page.getByRole('button', { name: '5' }).click()

    await expect(page.getByText(/1 \/ 5/)).toBeVisible()
    await expect(page.getByText(/what term matches/i)).toBeVisible()
  })

  test('selecting answer shows feedback', async ({ page }) => {
    await page.goto('/quiz')
    await page.getByRole('button', { name: '5' }).click()

    // Click first option
    const options = page.locator('.card').filter({ hasText: /^(?!.*what term)/ })
    await options.first().click()

    // Next button should appear
    await expect(page.getByRole('button', { name: /next/i })).toBeVisible()
  })

  test('completing quiz shows score', async ({ page }) => {
    await page.goto('/quiz')
    await page.getByRole('button', { name: '5' }).click()

    // Answer all 5 questions
    for (let i = 0; i < 5; i++) {
      const options = page.locator('.card').filter({ hasText: /^(?!.*what term)/ })
      await options.first().click()

      const buttonText = i < 4 ? /next/i : /see results/i
      await page.getByRole('button', { name: buttonText }).click()
    }

    // Should show results
    await expect(page.getByText(/quiz complete/i)).toBeVisible()
    await expect(page.getByText(/%/)).toBeVisible()
  })
})
