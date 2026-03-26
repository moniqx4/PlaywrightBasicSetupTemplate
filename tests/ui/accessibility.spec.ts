import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('should pass accessibility scan', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://www.wikipedia.org/')

    // Run axe-core accessibility scan
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'section508']) 
      .analyze()

    // Log violations for debugging
    if (results.violations.length > 0) {
      console.log('Accessibility violations:', results.violations)
    }

    // Assert no violations
    expect(results.violations).toEqual([])
  })
})


test('should analyze accessibility of the form and exclude the ad banner', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  const results = new AxeBuilder({ page })
    .include('form')        // Only analyze elements within the 'form'
    .exclude('.Google-Ad')
    .analyze()  // Skip elements with .Google-Ad class    .analyze();

  // Log the violations for debugging/reporting
  if ((await results).violations.length > 0) {
    console.log('Accessibility Violations found:');
    (await results).violations.forEach(violation => {
      console.log(`- ${violation.id}: ${violation.description}`);
      console.log(`  Help: ${violation.helpUrl}`);
      console.log('  Nodes:', violation.nodes.map(node => node.html).join('\n'));
      console.log('---');
    })
  }

  // If violations are found, this test will fail and list them.
  expect((await results).violations).toEqual([])
})


test('should not have accessibility violations on the page', async ({ page }) => {
  await page.goto('https://www.google.com');

  const results = await new AxeBuilder({ page })
    // Only check for these two specific accessibility rules:
    .withRules(['color-contrast', 'image-alt'])
    .analyze();

  // You can also log the violations for more detailed 
  // debugging if needed

  // Assert that there are no violations. 
  expect(results.violations).toEqual([]);
});
