import { test, expect } from '@nuxt/test-utils/playwright'

test('user can register', async ({ page, goto }) => {
  await goto('/register', { waitUntil: 'networkidle' })
  await page.getByLabel('Email').fill('newuser@example.com')
  await page.getByLabel('Password').fill('password123')
  await page.locator('[data-testid="reg-btn"]').click()
  
  await page.waitForURL('/')
  await expect(page).toHaveURL('/')
})

test('user can login', async ({ page, goto }) => {
  await goto('/login', { waitUntil: 'networkidle' })
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Password').fill('password')
  await page.locator('[data-testid="login-btn"]').click()
  
  await page.waitForURL('/')
  await expect(page).toHaveURL('/')
})

test('user can logout', async ({ page, goto }) => {
  await goto('/login', { waitUntil: 'networkidle' })
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByLabel('Password').fill('password')
  await page.locator('[data-testid="login-btn"]').click()
  
  await page.waitForURL('/')

  await page.locator('.mdi-account').click()
  await page.locator('text=Logout').click()

  await page.waitForURL('/login')
  await expect(page).toHaveURL('/login')
})
