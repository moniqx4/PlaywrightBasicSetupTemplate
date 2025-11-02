// spec: specs/basic-operations.md
// seed: tests/seed.spec.ts

import { test, expect } from '@fixtures/main-fixture'

test.describe('Adding New Todos', () => {
  // Helper to add a todo by typing into the input and pressing Enter
  const addTodo = async (page, text: string) => {
    // 1. Click in the "What needs to be done?" input field
    await page.click('input.new-todo, input[placeholder="What needs to be done?"]')
    // 2. Type the todo text
    await page.fill('input.new-todo, input[placeholder="What needs to be done?"]', text)
    // 3. Press Enter key
    await page.press('input.new-todo, input[placeholder="What needs to be done?"]', 'Enter')
  }

  test('Add Valid Todo', async ({ page }) => {
    // Arrange: go to the app root (playwright.config.ts baseURL is used if configured)
    await page.goto('/')

    // 1. Click in the "What needs to be done?" input field
    // 2. Type "Buy groceries"
    // 3. Press Enter key
    await addTodo(page, 'Buy groceries')

    // Expected Results:
    // - Todo appears in the list with unchecked checkbox
    const todoItems = page.locator('.todo-list li')
    await expect(todoItems).toHaveCount(1)
    await expect(todoItems.locator('input.toggle')).toBeVisible()
    await expect(todoItems.locator('input.toggle')).not.toBeChecked()

    // - Counter shows "1 item left"
    await expect(page.locator('.todo-count')).toContainText('1 item left')

    // - Input field is cleared and ready for next entry
    await expect(page.locator('input.new-todo, input[placeholder="What needs to be done?"]')).toHaveValue('')

    // - Todo list controls become visible (Mark all as complete checkbox)
    await expect(page.locator('input.toggle-all, .toggle-all')).toBeVisible()
  })

  test('Add Multiple Todos', async ({ page }) => {
    // Arrange
    await page.goto('/')

    // Steps: add multiple todos
    // 1. Click in the "What needs to be done?" input field
    // 2. Type and press Enter for each item
    await addTodo(page, 'Buy groceries')
    await addTodo(page, 'Walk the dog')
    await addTodo(page, 'Read a book')

    // Verifications
    // - All todos appear in the list
    const todoItems = page.locator('.todo-list li')
    await expect(todoItems).toHaveCount(3)

    // - Counter shows "3 items left"
    await expect(page.locator('.todo-count')).toContainText('3 items left')

    // - Input field is cleared
    await expect(page.locator('input.new-todo, input[placeholder="What needs to be done?"]')).toHaveValue('')

    // - Each item text is present (best-effort check)
    await expect(todoItems.nth(0)).toContainText('Buy groceries')
    await expect(todoItems.nth(1)).toContainText('Walk the dog')
    await expect(todoItems.nth(2)).toContainText('Read a book')
  })
})
