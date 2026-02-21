import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('displays auth page with OAuth buttons', async ({ page }) => {
    await page.goto('/auth')

    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /github/i })).toBeVisible()
  })

  test('has continue as guest link', async ({ page }) => {
    await page.goto('/auth')

    const guestLink = page.getByRole('link', { name: /continue as guest/i })
    await expect(guestLink).toBeVisible()
  })

  test('guest link navigates to home', async ({ page }) => {
    await page.goto('/auth')

    await page.getByRole('link', { name: /continue as guest/i }).click()
    await expect(page).toHaveURL('/')
  })
})
