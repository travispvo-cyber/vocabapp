import { test, expect } from '@playwright/test'

test.describe('Daily Concept', () => {
  test('displays concept of the day on home page', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /concept of the day/i })).toBeVisible()
  })

  test('daily concept card is clickable', async ({ page }) => {
    await page.goto('/')

    const card = page.locator('.card').first()
    await card.click()

    await expect(page).toHaveURL(/\/concept\//)
  })

  test('bookmark button exists on daily concept', async ({ page }) => {
    await page.goto('/')

    const bookmarkButton = page.getByRole('button', { name: /bookmark/i })
    await expect(bookmarkButton).toBeVisible()
  })

  test('take quiz button navigates to quiz', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /take quiz/i }).click()
    await expect(page).toHaveURL('/quiz')
  })
})
