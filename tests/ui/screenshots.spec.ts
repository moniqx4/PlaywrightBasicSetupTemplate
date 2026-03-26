import { test, expect } from '@playwright/test';

test('take a simple screenshot for debugging', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Take a screenshot and save it as 'playwright_homepage.png'
  await page.screenshot({ 
    path: 'test-results/playwright_homepage.png' 
  });
})

test('take a simple screenshot of header', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Take a screenshot of the entire page
  await page.screenshot({ 
    path: 'test-results/playwright_homepage.png', 
    fullPage: true 
  })
})

test('take a simple screenshot of header 2', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Take a screenshot of just the header element
  const element = page.locator('header');
  await element.screenshot({ 
    path: 'test-results/element-screenshot.png' 
  })
})

test('Homepage should look the same', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // This is the magic line!
  await expect(page).toHaveScreenshot('homepage.png');
})

// npx playwright test --update-snapshots

// masking screenshots
// await expect(page).toHaveScreenshot('homepage.png', {

//   Pass an array of locators to mask
//   mask: [page.locator('.dynamic-timestamp'), 
//          page.locator('.user-avatar')]
// })

//customizing thresholds

// await expect(page).toHaveScreenshot('submit-button.png', {
//   threshold: 0.2,       // Allow 20% difference ratio
//   maxDiffPixels: 100    // Or allow up to 100 differing pixels
// })