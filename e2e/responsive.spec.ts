import { test, expect } from '@playwright/test'

test.describe('Responsive Layout', () => {
  test('mobile shows bottom tab bar', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Tab bar should be visible
    const tabBar = page.locator('nav').filter({ has: page.getByText('Home') })
    await expect(tabBar).toBeVisible()

    // Sidebar should be hidden
    const sidebar = page.locator('aside')
    await expect(sidebar).not.toBeVisible()
  })

  test('desktop shows sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    // Sidebar should be visible
    const sidebar = page.locator('aside')
    await expect(sidebar).toBeVisible()
  })

  test('navigation works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Navigate using tab bar
    await page.getByRole('link', { name: /explore/i }).click()
    await expect(page).toHaveURL('/explore')

    await page.getByRole('link', { name: /quiz/i }).click()
    await expect(page).toHaveURL('/quiz')
  })

  test('navigation works on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    // Navigate using sidebar
    const sidebar = page.locator('aside')
    await sidebar.getByRole('link', { name: /explore/i }).click()
    await expect(page).toHaveURL('/explore')
  })

  test('cards are readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const card = page.locator('.card').first()
    const box = await card.boundingBox()

    // Card should not be wider than viewport
    expect(box?.width).toBeLessThanOrEqual(375)
  })
})
