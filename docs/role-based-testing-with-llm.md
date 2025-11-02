# Role-Based Business Rules Documentation for LLMs

The approach involves two main steps:
Define the Roles and Rules in Structured Data (JSON/YAML).
Integrate the Data into a Test Factory and the LLM Prompt.

1. Define Rules in Structured Data (The "Source of Truth")

The key is to present the LLM with the rules in a format that is both easily readable by a human and parsable by a machine (and the LLM itself). JSON is typically the best choice in a JavaScript/TypeScript ecosystem.

$\text{A. Role Definition File (e.g., rbac-rules.json)**

Create a central file that maps each user role to the specific UI elements and behaviors they should experience on the page being tested.
Example of rbac-rules.json for a "Product Management" page:

JSON

{
  "page": "Product Management Dashboard",
  "roles": {
    "Admin": {
      "permissions": {
        "visual_elements": [
          "Product Creation Button",
          "Delete Product Button",
          "Price Edit Field",
          "User Audit Log"
        ],
        "interactions": [
          "click('Product Creation Button')",
          "fill('Price Edit Field')",
          "click('Delete Product Button')"
        ],
        "default_view_state": "All Products (Drafts, Published, Archived)"
      }
    },
    "Editor": {
      "permissions": {
        "visual_elements": [
          "Product Creation Button",
          "Price Edit Field"
        ],
        "interactions": [
          "click('Product Creation Button')",
          "fill('Price Edit Field')"
        ],
        "default_view_state": "All Products (Drafts, Published)"
      }
    },
    "Viewer": {
      "permissions": {
        "visual_elements": [
          "Product List Table"
        ],
        "interactions": [],
        "default_view_state": "Only Published Products"
      }
    }
  }
}

B. Benefits of this Structure:

Clarity for LLM: The LLM can easily read this JSON object and understand that when a user has the 'Admin' role, the test must verify the presence of the "Delete Product Button."
Test Data Source: This file becomes the direct input for your Playwright Test Factory to programmatically check for element existence.
Single Source of Truth: Any change to the business rules is made in one place, instantly updating both the LLM's context and your test code's expectations.

2. Integration into the Playwright Test Framework

Now, you integrate this structured data into your Playwright tests.

A. Test User Factory (Data Setup)

Use a dedicated module to provide authenticated users for each role.

TypeScript

// users.ts
export const testUsers = {
  admin: { username: 'admin_user', password: 'password123', role: 'Admin' },
  editor: { username: 'editor_user', password: 'password456', role: 'Editor' },
  viewer: { username: 'viewer_user', password: 'password789', role: 'Viewer' },
};

B. Test Function with Data-Driven Expectations

Your test logic can dynamically load the rules and iterate through them for a given role.

TypeScript

// rbac.spec.ts (Playwright Test)

import { test, expect } from '@playwright/test';
import { testUsers } from './users';
// Assuming rbacRules is imported from the JSON file above
import * as rbacRules from './rbac-rules.json';

// Use the JSON data to drive the test logic
const pageRules = rbacRules.roles;

test.describe('Role-Based Access Control on Product Dashboard', () => {

    for (const [roleName, userData] of Object.entries(testUsers)) {

        test(`Verify UI elements for ${userData.role} role`, async ({ page }) => {
            
            // 1. Setup: Log in with the specific user
            // (You'd have a custom login function here)
            await login(page, userData.username, userData.password); 
            await page.goto('/product-management');

            const expectedElements = pageRules[userData.role].permissions.visual_elements;
            const allElements = Object.values(rbacRules.roles).flatMap(r => r.permissions.visual_elements);
            
            // 2. Verification Loop (Checks for Presence)
            for (const element of expectedElements) {
                // Assuming you have a way to map element names to Playwright selectors
                const selector = getSelectorForElement(element); 
                // This is the primary verification: element MUST be visible
                await expect(page.locator(selector)).toBeVisible(); 
            }
            
            // 3. Verification Loop (Checks for Absence/Forbidden Elements)
            const forbiddenElements = allElements.filter(e => !expectedElements.includes(e));

            for (const element of forbiddenElements) {
                const selector = getSelectorForElement(element); 
                // This is critical: element MUST NOT be visible
                await expect(page.locator(selector)).not.toBeVisible(); 
                // Optionally: check for interaction (e.g., button is disabled)
            }
            
            // 4. Verification for Default State
            const expectedViewState = pageRules[userData.role].permissions.default_view_state;
            // Test that the initial data displayed matches the rule (e.g., check table content)
            await expect(page.locator('.data-filter-summary')).toContainText(expectedViewState);

        });
    }
});

3. Communicating the Rules to the LLM

When prompting the LLM to generate a new test, you provide it with the full context of the rules as part of your prompt.
Prompt Template to the LLM:
"I need a new Playwright test for the 'Product Management Dashboard'. I will be testing the 'Editor' role.
The business rules for the 'Editor' are defined by the following JSON object. Please use this to define all assertions for element visibility and interaction:

JSON

{
  // Paste the relevant JSON snippet here, or link to the file.
}

Task: Write a Playwright test that logs in as the 'Editor' and verifies that the 'Product Creation Button' is visible and clickable, but the 'Delete Product Button' is not visible. Also, ensure their initial table view state is set to 'All Products (Drafts, Published)'."
By providing the LLM with the structured, documented rules directly, you ensure it has the necessary factual ground truth for the RBAC constraints, leading to accurate and predictable test generation.
