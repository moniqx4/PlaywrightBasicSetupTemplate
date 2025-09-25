import type { PlaywrightTestConfig } from '@playwright/test'


const config: PlaywrightTestConfig = {	
	testDir: './api-tests',
	outputDir: '../test-artifacts/',
	testMatch: 'tests/api/**/*.spec.ts', // Only run API tests for this project
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Maximum time one test can run for. */
	timeout: 20 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 2000
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 1 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */	
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: '',
		headless: true,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',
		video: 'retain-on-failure',
		screenshot: 'only-on-failure',
		ignoreHTTPSErrors: true,
		storageState: 'state.json',
		launchOptions: {
			headless: false,
			// tracesDir: '../test-artifacts/api-trace'
		}
	},
	/* Configure projects for API tests */
	projects: [
		{
			name: 'API Testing',
			use: {
				baseURL: '',
				extraHTTPHeaders: {
					'Accept': 'application/json',
					// 'X-Custom-Header': 'my-api-key', // Example for API key in header
				},
			}
		}
	]
}

export default config
