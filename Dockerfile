# Use the official Playwright image with Node.js
# This image comes with Playwright browsers and dependencies pre-installed.
FROM mcr.microsoft.com/playwright:latest

LABEL author="Your Name or Team Name"

WORKDIR /app/e2e

# Copy package.json and package-lock.json (or yarn.lock)
# to leverage Docker's caching and install dependencies efficiently.
COPY package.json package-lock.json* ./

COPY . /app/e2e


# Install Playwright dependencies
RUN npm install
RUN npx playwright install --with-deps

# Runs tests, from a script in package.json, example: 'npm run test:regression'
CMD [ "npm", "run" ]

# or can run a test directly like this:  npx playwright test nameoftest.spec -c config/base-playwright.config.ts
#CMD [ "npx", "playwright", "test" ]

# or can do a run line like below
# RUN npx playwright test TC001_crossbrowsers.spec.js --config=docker.config.js --project=DesktopChromium

# The testing suite can be executed running the Docker image and passing any env variables (i.e. URL of the application).

# docker build -t custom-playwright .
# docker run -it --rm -e URL=http://myapp.com --name customplaywright custom-playwright