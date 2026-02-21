import { test, expect } from '@playwright/test'

test.describe('Explore', () => {
  test('displays explore page with category tabs', async ({ page }) => {
    await page.goto('/explore')

    await expect(page.getByRole('heading', { name: /explore concepts/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /all/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /statistics/i })).toBeVisible()
  })

  test('difficulty filters are visible', async ({ page }) => {
    await page.goto('/explore')

    await expect(page.getByRole('button', { name: /beginner/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /intermediate/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /advanced/i })).toBeVisible()
  })

  test('clicking category filters concepts', async ({ page }) => {
    await page.goto('/explore')

    await page.getByRole('button', { name: /statistics/i }).click()

    // Should show statistics concepts
    const cards = page.locator('.card')
    await expect(cards.first()).toBeVisible()
  })

  test('concept cards link to detail page', async ({ page }) => {
    await page.goto('/explore')

    const firstCard = page.locator('.card').first()
    await firstCard.click()

    await expect(page).toHaveURL(/\/concept\//)
  })
})
