# Mobile testing  snippets

```typescript


const context = await browser.newContext({
  ...devices['iPhone 12'],
  screen: {
    width: 390,  // Portrait width
    height: 844  // Portrait height
  }
})

const context = await browser.newContext({
  ...devices['iPhone 12'],
  screen: {
    width: 844,  // Landscape width
    height: 390  // Landscape height
  }
})

```

Dealing with mobile popups and dialog

```typescript

await page.locator('#cookie-consent-accept').waitFor({ state: 'visible' });
await page.touchscreen.tap('#cookie-consent-accept');

await page.touchscreen.tap(10, 10); // Taps near the top-left corner

```

System level Permissions

```typescript

const context = await browser.newContext({
  ...devices['iPhone 13'],
  permissions: { 'geolocation': 'grant', 'notifications': 'deny' },
});

```
