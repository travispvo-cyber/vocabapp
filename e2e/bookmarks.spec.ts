import { test, expect } from '@playwright/test'

test.describe('Bookmarks', () => {
  test('displays bookmarks page', async ({ page }) => {
    await page.goto('/bookmarks')

    await expect(page.getByRole('heading', { name: /saved concepts/i })).toBeVisible()
  })

  test('shows saved concepts count', async ({ page }) => {
    await page.goto('/bookmarks')

    await expect(page.getByText(/concepts saved/i)).toBeVisible()
  })

  test('bookmarked concepts are clickable', async ({ page }) => {
    await page.goto('/bookmarks')

    const firstBookmark = page.locator('.card').first()
    if (await firstBookmark.isVisible()) {
      await firstBookmark.click()
      await expect(page).toHaveURL(/\/concept\//)
    }
  })

  test('remove bookmark button works', async ({ page }) => {
    await page.goto('/bookmarks')

    const removeButton = page.getByRole('button', { name: /remove bookmark/i })
    if (await removeButton.first().isVisible()) {
      const initialCount = await page.locator('.card').count()
      await removeButton.first().click()
      const newCount = await page.locator('.card').count()
      expect(newCount).toBeLessThan(initialCount)
    }
  })
})
