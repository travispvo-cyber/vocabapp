import { test, expect } from '@playwright/test'

test.describe('Settings', () => {
  test('displays settings page', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible()
  })

  test('theme toggle is visible', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.getByText(/dark mode/i)).toBeVisible()
  })

  test('theme toggle works', async ({ page }) => {
    await page.goto('/settings')

    // Get initial theme
    const html = page.locator('html')
    const initialDark = await html.evaluate(el => el.classList.contains('dark'))

    // Toggle theme
    const toggle = page.locator('.card').filter({ hasText: /dark mode/i }).getByRole('button')
    await toggle.click()

    // Check theme changed
    const newDark = await html.evaluate(el => el.classList.contains('dark'))
    expect(newDark).not.toBe(initialDark)
  })

  test('difficulty preference buttons work', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.getByText(/difficulty preference/i)).toBeVisible()
    await page.getByRole('button', { name: /intermediate/i }).click()

    // Button should be selected (has different styling)
    const intermediateBtn = page.getByRole('button', { name: /intermediate/i })
    await expect(intermediateBtn).toHaveClass(/bg-blue/)
  })

  test('category toggles are visible', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.getByText(/categories/i)).toBeVisible()
    await expect(page.getByText(/statistics/i)).toBeVisible()
    await expect(page.getByText(/machine learning/i)).toBeVisible()
  })
})
