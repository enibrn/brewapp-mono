import { test, expect } from '@nuxt/test-utils/playwright'

test.describe('Authentication', () => {

  const fillForm = async (page, id, text) => {
    await page.locator(`[id="${id}"]`).fill('')
    await page.locator(`[id="${id}"]`).pressSequentially(text)
    await page.locator(`[id="${id}"]`).blur()
  }

  test('user can register', async ({ page, goto }) => {
    await goto('/register', { waitUntil: 'networkidle' })
    await fillForm(page, '#/properties/name-input', 'New User')
    await fillForm(page, '#/properties/email-input', 'newuser@example.com')
    await fillForm(page, '#/properties/password-input', 'password123')
    await fillForm(page, '#/properties/confirmPassword-input', 'password123')
    
    await page.locator('[data-testid="reg-btn"]').click()
    
    await page.waitForURL('/')
    await expect(page).toHaveURL('/')
  })

  test('user can login', async ({ page, goto }) => {
    await goto('/login', { waitUntil: 'networkidle' })
    await fillForm(page, '#/properties/email-input', 'test@example.com')
    await fillForm(page, '#/properties/password-input', 'password')
    await page.locator('[data-testid="login-btn"]').click()
    
    await page.waitForURL('/')
    await expect(page).toHaveURL('/')
  })

  test('user can logout', async ({ page, goto }) => {
    await goto('/login', { waitUntil: 'networkidle' })
    await fillForm(page, '#/properties/email-input', 'test@example.com')
    await fillForm(page, '#/properties/password-input', 'password')
    await page.locator('[data-testid="login-btn"]').click()
    
    await page.waitForURL('/')

    await page.locator('.mdi-account').click()
    await page.locator('text=Logout').click()

    await page.waitForURL('/login')
    await expect(page).toHaveURL('/login')
  })

  test('user gets validation error on empty login fields', async ({ page, goto }) => {
    await goto('/login', { waitUntil: 'networkidle' })
    // Clear default values
    await page.locator('[id="#/properties/email-input"]').fill('')
    await page.locator('[id="#/properties/password-input"]').fill('')
    
    // Focus out to trigger validation
    await page.locator('[id="#/properties/password-input"]').blur()
    await page.waitForTimeout(500)
    
    // Check if error message is shown by JSON forms
    await expect(page.locator('text=is a required property').first()).toBeVisible()
    
    await page.locator('[data-testid="login-btn"]').click()
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="login-error"]')).toContainText('Please fix the errors before submitting')
  })

  test('user gets validation error on invalid email format', async ({ page, goto }) => {
    await goto('/login', { waitUntil: 'networkidle' })
    await fillForm(page, '#/properties/email-input', 'invalid-email')
    await fillForm(page, '#/properties/password-input', 'password')
    
    // Focus out to trigger validation
    await page.locator('[id="#/properties/password-input"]').blur()
    await page.waitForTimeout(500)
    
    // JSON schema format: email error
    await expect(page.locator('text=must match format "email"').first()).toBeVisible()
  })

  test('user gets general error on wrong credentials', async ({ page, goto }) => {
    await goto('/login', { waitUntil: 'networkidle' })
    await fillForm(page, '#/properties/email-input', 'wrong@example.com')
    await fillForm(page, '#/properties/password-input', 'wrongpass')
    await page.locator('[data-testid="login-btn"]').click()
    
    // Mock should return "Invalid credentials"
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="login-error"]')).toContainText('Invalid credentials')
  })

  test('user gets validation error on register empty fields', async ({ page, goto }) => {
    await goto('/register', { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    await page.locator('[data-testid="reg-btn"]').click()
    
    // Form should prevent submission or show error
    await expect(page.locator('[data-testid="reg-error"]')).toBeVisible()
  })
})
