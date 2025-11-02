
import { test, expect, type Page } from '@playwright/test'
import { testUsers } from '@constants/users'
import { adminPagePermissions } from '@sharedtypes/test-types'

// Assuming rbacRules is imported from the JSON file above
import * as rbacRules from '.claude/commands/rbac-rules.json'

function getSelectorForElement(elementName: string): string {
  // This function maps element names to actual selectors used in your application
  const mapping: Record<string, string> = {
    header: 'header',
    footer: 'footer',
    mainContent: '#main-content',
    adminPanel: '#admin-panel',
    charts: '.chart',
    tables: '.data-table',
    filters: '.filter-section'
  }
  return mapping[elementName] || ''
}

// this could be in a fixture, page object, or helper file and imported into the test file as a reuseable, usually added into a before each or all, in test as an example
async function login(page: Page, username: string, password: string) {
  // Implement your login logic here
  await page.goto('/login')
  await page.fill('#username', username)
  await page.fill('#password', password)
  await page.click('button[type="submit"]')
}


test.describe('Role-Based Access Control on Product Dashboard', () => {

  for (const [roleName, userData] of Object.entries(testUsers)) {

    test(`Verify UI elements for ${userData.role} role`, async ({ page }) => {

      // 1. Setup: Log in with the specific user
      // (You'd have a custom login function here)
      await login(page, userData.username, userData.password)
      await page.goto('/product-management')

      const expectedElements = adminPagePermissions[userData.role].visualElements
      const allElements = Object.values(adminPagePermissions).flatMap(r => r.visualElements)

      // 2. Verification Loop (Checks for Presence)
      for (const element of expectedElements) {
        // Assuming you have a way to map element names to Playwright selectors
        const selector = getSelectorForElement(element)
        // This is the primary verification: element MUST be visible
        await expect(page.locator(selector)).toBeVisible()
      }

      // 3. Verification Loop (Checks for Absence/Forbidden Elements)
      const forbiddenElements = allElements.filter(e => !expectedElements.includes(e))

      for (const element of forbiddenElements) {
        const selector = getSelectorForElement(element)
        // This is critical: element MUST NOT be visible
        await expect(page.locator(selector)).not.toBeVisible()
        // Optionally: check for interaction (e.g., button is disabled)
      }

      // 4. Verification for Default State
      const expectedViewState = pageRules[userData.role].permissions.default_view_state
      // Test that the initial data displayed matches the rule (e.g., check table content)
      await expect(page.locator('.data-filter-summary')).toContainText(expectedViewState)

    })
  }
})

// Use the JSON data to drive the test logic
const pageRules = rbacRules.roles

test.describe('Role-Based Access Control on Product Dashboard - original', () => {

  for (const [roleName, userData] of Object.entries(testUsers)) {

    test(`Verify UI elements for ${roleName} role`, async ({ page }) => {

      // 1. Setup: Log in with the specific user
      // (You'd have a custom login function here)
      await login(page, userData.username, userData.password)
      await page.goto('/product-management')

      const expectedElements = pageRules[userData.role].permissions.visual_elements
      const allElements = Object.values(rbacRules.roles).flatMap(r => r.permissions.visual_elements)

      // 2. Verification Loop (Checks for Presence)
      for (const element of expectedElements) {
        // Assuming you have a way to map element names to Playwright selectors
        const selector = getSelectorForElement(element)
        // This is the primary verification: element MUST be visible
        await expect(page.locator(selector)).toBeVisible()
      }

      // 3. Verification Loop (Checks for Absence/Forbidden Elements)
      const forbiddenElements = allElements.filter(e => !expectedElements.includes(e))

      for (const element of forbiddenElements) {
        const selector = getSelectorForElement(element)
        // This is critical: element MUST NOT be visible
        await expect(page.locator(selector)).not.toBeVisible()
        // Optionally: check for interaction (e.g., button is disabled)
      }

      // 4. Verification for Default State
      const expectedViewState = pageRules[userData.role].permissions.default_view_state
      // Test that the initial data displayed matches the rule (e.g., check table content)
      await expect(page.locator('.data-filter-summary')).toContainText(expectedViewState)

    })
  }
})