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

# Initialize npm and install Playwright
npm init -y
npm install -D @playwright/test
npx	 playwright install

echo "📁 Creating project structure..."

# Create directories
mkdir -p base-pages
mkdir -p components/ui
mkdir -p components/common  
mkdir -p components/layouts
mkdir -p convex
mkdir -p data
mkdir -p utils
mkdir -p tests
mkdir -p styles
mkdir -p features
mkdir -p features/configuration
mkdir -p features/dashboard

echo "📝 Installing additional dependencies..."

# Install dependencies
yarn add @clerk/nextjs @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot convex embla-carousel-react next-themes react-hook-form react-icons react-wrap-balancer sonner tailwindcss-animate zod

yarn add -D @playwright/test @tailwindcss/forms @tailwindcss/postcss @tailwindcss/typography class-variance-authority clsx dayjs prettier prettier-plugin-tailwindcss tailwind-merge

# Install Playwright browsers
yarn playwright install

echo "🔧 Creating configuration files..."

# add yarn nodelinker yaml file
cat > .yarnrc.yml << 'EOL'
nodeLinker: node-modules
EOL

# Create routes.ts
cat > data/routes.ts << 'EOL'
// data/routes.ts
export const ROUTES = {
	HOME: '/',
	CONFIGURATION: '/configuration',
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = typeof ROUTES[RouteKey]
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
      "@components/*": [
        "components/*"
      ],
      "@data/*": [
        "data/*"
      ],
      "@hooks/*": [
        "hooks/*"
      ],
      "@utils/*": [
        "utils/*"
      ],
      "@ui/*": [
        "components/ui/*"
      ],
      "@elements/*": [
        "components/elements/*"
      ],
      "@pages/*": [
        "base-pages/*"
      ],
      "@layouts/*": [
        "components/layouts/*"
      ],
      "@common/*": [
        "components/common/*"
      ],
      "@convex/*": [
        "convex/*"
      ],
      "@features/*": [
        "features/*"
      ]
    },
    "types": [],
    "typeRoots": [
      "./node_modules/@types"
    ],
    "target": "esnext"
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "tailwind.config.ts"
  ]
}
EOL

# Update tailwind.config.ts
cat > tailwind.config.ts << 'EOL'
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"

export default {
	important: true,
	content: [
		'./features/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./base-pages/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
} satisfies Config
EOL

# Update package.json scripts
cat > package.json << 'EOL'
{
	"name": "pw-test-runner-webapp",
	"version": "1.0.0",
	"private": true,
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "next lint",
		"test": "playwright test",
		"test:headed": "playwright test --headed",
		"test:ui": "playwright test --ui"
	},
	"dependencies": {
		"@clerk/nextjs": "^6.30.0",
		"@hookform/resolvers": "^5.2.1",
		"@radix-ui/react-accordion": "^1.2.11",
		"@radix-ui/react-avatar": "^1.1.10",
		"@radix-ui/react-checkbox": "^1.3.2",
		"@radix-ui/react-collapsible": "^1.1.11",
		"@radix-ui/react-dialog": "^1.1.14",
		"@radix-ui/react-dropdown-menu": "^2.1.15",
		"@radix-ui/react-hover-card": "^1.1.14",
		"@radix-ui/react-label": "^2.1.7",
		"@radix-ui/react-select": "^2.2.5",
		"@radix-ui/react-slot": "^1.2.3",
		"convex": "^1.25.4",
		"embla-carousel-react": "^8.6.0",
		"next": "^15.4.6",
		"next-themes": "^0.4.6",
		"react": "^19.1.1",
		"react-dom": "^19.1.1",
		"react-hook-form": "^7.61.1",
		"react-icons": "^5.5.0",
		"react-wrap-balancer": "^1.1.1",
		"sonner": "^2.0.6",
		"tailwindcss-animate": "^1.0.7",
		"zod": "^4.0.14"
	},
	"devDependencies": {
		"@playwright/test": "^1.54.2",
		"@tailwindcss/forms": "^0.5.10",
		"@tailwindcss/postcss": "^4.1.11",
		"@tailwindcss/typography": "^0.5.16",
		"@types/node": "^24.2.0",
		"@types/react": "^19.1.9",
		"@types/react-dom": "^19.1.7",
		"autoprefixer": "^10.4.21",
		"class-variance-authority": "^0.7.1",
		"clsx": "^2.1.1",
		"dayjs": "^1.11.13",
		"eslint": "^9.32.0",
		"eslint-config-next": "^15.4.6",
		"postcss": "^8.5.6",
		"prettier": "^3.6.2",
		"prettier-plugin-tailwindcss": "^0.6.14",
		"tailwind-merge": "^3.3.1",
		"tailwindcss": "^4.1.11",
		"typescript": "^5.9.2"
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

# Create/update global styles
cat > app/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--background: 0 0% 100%;
		--foreground: 222.2 84% 4.9%;
		--card: 0 0% 100%;
		--card-foreground: 222.2 84% 4.9%;
		--popover: 0 0% 100%;
		--popover-foreground: 222.2 84% 4.9%;
		--primary: 222.2 47.4% 11.2%;
		--primary-foreground: 210 40% 98%;
		--secondary: 210 40% 96%;
		--secondary-foreground: 222.2 84% 4.9%;
		--muted: 210 40% 96%;
		--muted-foreground: 215.4 16.3% 46.9%;
		--accent: 210 40% 96%;
		--accent-foreground: 222.2 84% 4.9%;
		--destructive: 0 84.2% 60.2%;
		--destructive-foreground: 210 40% 98%;
		--border: 214.3 31.8% 91.4%;
		--input: 214.3 31.8% 91.4%;
		--ring: 222.2 84% 4.9%;
		--radius: 0.5rem;
	}

	.dark {
		--background: 222.2 84% 4.9%;
		--foreground: 210 40% 98%;
		--card: 222.2 84% 4.9%;
		--card-foreground: 210 40% 98%;
		--popover: 222.2 84% 4.9%;
		--popover-foreground: 210 40% 98%;
		--primary: 210 40% 98%;
		--primary-foreground: 222.2 47.4% 11.2%;
		--secondary: 217.2 32.6% 17.5%;
		--secondary-foreground: 210 40% 98%;
		--muted: 217.2 32.6% 17.5%;
		--muted-foreground: 215 20.2% 65.1%;
		--accent: 217.2 32.6% 17.5%;
		--accent-foreground: 210 40% 98%;
		--destructive: 0 62.8% 30.6%;
		--destructive-foreground: 210 40% 98%;
		--border: 217.2 32.6% 17.5%;
		--input: 217.2 32.6% 17.5%;
		--ring: 212.7 26.8% 83.9%;
	}
}

@layer base {
	* {
		@apply border-border;
	}
	body {
		@apply bg-background text-foreground;
	}
}
EOL

# Create .prettierrc
cat > .prettierrc << 'EOL'
{
  "tabWidth": 2,
  "useTabs": true,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "pluginSearchDirs": false,
  "plugins": ["prettier-plugin-tailwind"],
  "tailwindConfig": "./tailwind.config.js",
  "tailwindFunctions": ["clsx"]
}
EOL

# Update app/layout.tsx
cat > app/layout.tsx << 'EOL'
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'My NextJS App',
	description: 'A modern NextJS application built with TypeScript and Tailwind CSS',
}

const RootLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<html lang='en'>
			<body className={inter.className}>
				{children}
			</body>
		</html>
	)
}

export default RootLayout
EOL

# Update app/page.tsx
cat > app/page.tsx << 'EOL'
// app/page.tsx
import HomePage from '@/base-pages/HomePage'

const Page = () => {
	return <HomePage />
}

export default Page
EOL

# Create HomePage component
cat > base-pages/HomePage.tsx << 'EOL'
// base-pages/HomePage.tsx
import { FC } from 'react'
import { ROUTES } from '@/data/routes'

const HomePage: FC = () => {
	return (
		<>
		</>
	)
}

export default HomePage
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
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local

echo "# Production environment variables" > .env

# Create utils index file
touch utils/index.ts

echo ""
echo "✅ Project setup complete!"
echo ""
echo "📂 Project created at: $(pwd)"
echo ""
echo "🚀 Next steps:"
echo "1. cd my-nextjs-app"
echo "2. yarn install (if dependencies weren't installed properly)"
echo "3. yarn dev (to start development server)"
echo "4. yarn test:headed (to run tests)"
echo ""
echo "🎉 Happy coding!"