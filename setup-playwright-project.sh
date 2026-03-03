#!/bin/bash

# Playwright Test Automation Project Setup Script
# Save this as setup-playwright-project.sh and run it

echo "🚀 Starting Playwright Test Automation Project Setup..."

# Navigate to the projects directory
cd "C:\Projects\TestAutomation" || { echo "❌ Could not navigate to C:\Projects\TestAutomation"; exit 1; }

# Create Playwright project
echo "📦 Creating Playwright project..."
mkdir playwright-project
cd playwright-project || { echo "❌ Failed to create project"; exit 1; }


echo "📁 Creating project structure..."

# Create directories
mkdir -p pages
mkdir -p fixtures
mkdir -p constants  
mkdir -p docs
mkdir -p shared-types
mkdir -p data
mkdir -p utils
mkdir -p tests
mkdir -p tests/api
mkdir -p tests/ui
mkdir -p tests/e2e
mkdir -p tests/integration
mkdir -p templates
mkdir -p configuration

echo "📝 Installing additional dependencies..."

# Initialize npm and install Playwright
yarn init -y

# Install dependencies ( if this is in monorepo, you may want to move these to the devDependencies section of the root package.json and run yarn install from the root )
yarn add @playwright/test playwright-cli

yarn add -D @zod @types/node dotenv eslint eslint-plugin-playwright typescript @faker-js/faker

# Install Playwright browsers
npx	playwright install

echo "🔧 Creating configuration files..."

# add yarn nodelinker yaml file
cat > .yarnrc.yml << 'EOL'
nodeLinker: node-modules
EOL


# Create main fixture
cat > fixtures/main-fixture.ts << 'EOL'
// fixtures/main-fixture.ts

import { mergeTests, test as base, Locator, request, type Page, mergeExpects } from '@playwright/test'
import { APIUtils } from '@utils/APIUtils'
import { customAssertionFixture } from './custom-assertion-fixture'


type MainFixture = {
  apiUtils: typeof APIUtils  
}

const mainFixture = base.extend<MainFixture>({
  apiUtils: async ({  }, use) => {
      await use(APIUtils)
    }, 
   
})

export { type Locator, type Page, request }
export const test = mergeTests(mainFixture) 
export const expect = mergeExpects(customAssertionFixture)
EOL

# Create custom.assertion-fixture.ts
cat > fixtures/custom-assertion-fixture.ts << 'EOL'
// fixtures/custom-assertion-fixture.ts
import { APIResponse, expect as baseExpect, Locator } from "@playwright/test"
import { ZodType } from "zod"
import { APIUtils } from "@utils/APIUtils"


export type CustomAssertionFixture = {
  toMatchSchema: (recieved: APIResponse, schema: ZodType) => Promise<any>
  toBeWithinDateRange: (locator: Locator, startDate: Date, endDate: Date) => Promise<{ message: () => string; pass: boolean }>   
}

export const customAssertionFixture = baseExpect.extend<CustomAssertionFixture>({
    async toMatchSchema(received: APIResponse, schema: ZodType) {
      return APIUtils.customSchemaMatcher(schema, received)           
    },
    async toBeWithinDateRange(locator, startDate, endDate) {

    const dateValue = await locator.getAttribute('value')
    if (!dateValue) {
      return {
        message: () => 'Date value is null or empty',
        pass: false,
      }
    }
    const dateToCheck = new Date(dateValue)
    const isWithinRange = (dateToCheck.getTime() >= startDate.getTime()
      && dateToCheck.getTime() <= endDate.getTime())
    if (isWithinRange) {
      return {
        message: () => 'passed',
        pass: true,
      }
    } else {
      return {
        message: () => 'failed',
        pass: false,
      }
    }
  },
})
EOL

# Update tsconfig.json
cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@pages/*": [
        "pages/*"
      ],
      "@fixtures/*": [
        "fixtures/*"
      ],
      "@types/*": [
        "shared-types/*"
      ],
      "@utils/*": [
        "utils/*"
      ],
      "@docs/*": [
        "docs/*"
      ],
      "@constants/*": [
        "constants/*"
      ],
      "@pages/*": [
        "base-pages/*"
      ],
      "@configuration/*": [
        "configuration/*"
      ],
      "@templates/*": [
        "templates/*"
      ],     
    },
    "types": [],
    "typeRoots": [
      "./node_modules/@types"
    ],
    "target": "esnext"
  },
  "include": [   
    "**/*.ts",
    "**/*.tsx",
  ],
  "exclude": [
    "node_modules",
  ]
}
EOL

# Update package.json scripts
cat > package.json << 'EOL'
{
	"name": "pw-test-automation",
	"version": "1.0.0",
	"private": true,
	"scripts": {		
		"test": "playwright test",
		"test:headed": "playwright test --headed",
		"test:ui": "playwright test --ui"
	},
	"dependencies": {
		"@playwright/test": "^1.58.2",		
		
	},
	"devDependencies": {
		"zod": "^4.0.14"	
		"@types/node": "^24.2.0",
		"eslint": "^9.32.0",
		"prettier": "^3.6.2",
		"typescript": "^5.9.3"
	}
}
EOL

# Create playwright.config.ts
cat > playwright.config.ts << 'EOL'
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	webServer: {
		command: 'yarn dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
	},
})
EOL


# Create .prettierrc
cat > .prettierrc << 'EOL'
{
  "tabWidth": 2,
  "useTabs": true,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none"
}
EOL

# Create sample test
cat > tests/home.spec.ts << 'EOL'
// tests/home.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
	test('should display welcome message', async ({ page }) => {
		await page.goto('/')
		
		await expect(page).toHaveTitle(/My NextJS App/)
		
		const heading = page.locator('h1')
		await expect(heading).toContainText('Welcome to Your NextJS App')
		
		const getStartedButton = page.locator('a', { hasText: 'Get started' })
		await expect(getStartedButton).toBeVisible()
		
		const learnMoreButton = page.locator('a', { hasText: 'Learn more' })
		await expect(learnMoreButton).toBeVisible()
	})
	
	test('should navigate to about page when clicking get started', async ({ page }) => {
		await page.goto('/')
		
		const getStartedButton = page.locator('a', { hasText: 'Get started' })
		await getStartedButton.click()
		
		await expect(page).toHaveURL('/about')
	})
})
EOL

# Create environment files
echo "# Add your environment variables here" > .env.local
echo "ENVIRONMENT_URL=http://localhost:3000" >> .env.local

echo "# Production environment variables" > .env

# Create utils index file
touch utils/index.ts

echo ""
echo "✅ Project setup complete!"
echo ""
echo "📂 Project created at: $(pwd)"
echo ""
echo "🎉 Happy testing!"