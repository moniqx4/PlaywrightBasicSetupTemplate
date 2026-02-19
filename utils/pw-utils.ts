import test from "@playwright/test"
import { log } from "console"

/**
 * Function decorator to wrap any function in a test.step with logging
 *
 * @param stepName - Name for the step
 * @param fn - The function to wrap
 *
 * @example
 * await functionTestStep('should allow me to edit an item', functionToRun )
 */
export function functionTestStep<T extends any[], R>(
  stepName: string,
  fn: (...args: T) => Promise<R> | R // The function to wrap 
): (...args: T) => Promise<R> {
  // Return a new function with the same signature as the original function
  // But enhanced with step logging and error handling
  return async function (...args: T): Promise<R> {   
    // Can be used when working with standalone functions, not class methods

    // Wrap execution in Playwright's test.step for proper test reporting
    return test.step(stepName, async () => {
      try {
        // Simply call the original function with the provided arguments        
        return await fn(...args)
      } catch (error) {
        // Enhanced error handling with consistent logging
        log(`Step failed: ${stepName} - ${error}`)
        throw error // Re-throw to maintain normal test failure behavior
      }
    })
  }
}