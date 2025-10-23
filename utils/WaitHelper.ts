import { expect, Locator, Page } from "@playwright/test"

export type TPAGE_STATE = 'domcontentloaded' | 'load' | 'networkidle'

export type WaitOptions = {
  timeout?: number
  state?: 'attached' | 'visible' | 'hidden'
}

export type TWAIT = 'forPage' | 'forLocator'

export enum WAIT_STRATEGIES {
  AUTO = 'auto-wait',
  POLLING = 'polling',
  CUSTOM = 'custom'
}

const DEFAULT_TIMEOUT = 30000

/**
 * useWait - A flexible wait utility that supports multiple strategies for waiting on page load or element visibility.
 * @param page | Page, playwright page
 * @param locator | Locator, playwright locator
 * @param strategy | WAIT_STRATEGIES, waiting strategy
 * @param [options] | [OPTIONAL], if using a wait for a page, the wait options are 'domcontentloaded' | 'load' | 'networkidle', Defaults to 'domcontentloaded' , if using a wait for a locator, the wait options that can be overridden are { timeout?: number; state?: 'attached' | 'visible' | 'hidden' }
 * @param waitType | TWAIT, 'forPage' or 'forLocator'
 * @returns  Promise<void>
 * @example for a page:  `await useWait(page, WAIT_STRATEGIES.AUTO, 'forPage', undefined, { state: 'load' })` or leaving the defaults: `await useWait(page, WAIT_STRATEGIES.AUTO, 'forPage')`
 * @example for a locator:  `await useWait(page, WAIT_STRATEGIES.POLLING, 'forLocator', page.locator('selector'), { timeout: 10000, state: 'visible' })`  or leaving the defaults: `await useWait(page, WAIT_STRATEGIES.POLLING, 'forLocator', page.locator('selector'))`
 */
export async function useWait(page: Page, strategy: WAIT_STRATEGIES, waitType: TWAIT, locator?: Locator, options?: WaitOptions & TPAGE_STATE, endpoint?: string) {

    switch (strategy) {
      case WAIT_STRATEGIES.AUTO:
        await autoWait(page, waitType, locator)
        break
      case WAIT_STRATEGIES.POLLING:
        await pollingWait(page, waitType, locator, endpoint, options)
        break
      case WAIT_STRATEGIES.CUSTOM:
        await customWait(page, waitType, locator, options)
        break
      default:
        throw new Error(`Unknown strategy: ${strategy}`)
    }   
  }

  
async function autoWait(page: Page, waitType: TWAIT, locator?: Locator) {
    if(waitType === 'forPage') {
      await page.waitForLoadState('domcontentloaded', { timeout: DEFAULT_TIMEOUT })
      return
    } else {
      await locator.waitFor({
        timeout: DEFAULT_TIMEOUT
      })
    }
  }

async function pollingWait(page: Page, waitType: TWAIT, locator?: Locator, endpoint?: string, options?: WaitOptions) {    
    
    const start = Date.now()

    if (waitType === 'forPage') {
      while (Date.now() - start < DEFAULT_TIMEOUT) {
        if (page.url() !== 'about:blank') return
        await expect.poll(async () => {
          const response = await page.request.get(endpoint)
          return response.status()
        }, {
          // Custom expect message for reporting, optional.
          message: 'make sure API eventually succeeds',
          // Poll for 10 seconds; defaults to 5 seconds. Pass 0 to disable timeout.
          intervals: [1_000, 2_000, 10_000],
          timeout: 10000,
        }).toBe(200);
      }
    } else {
      if (!locator) throw new Error('Locator is required for polling wait')
      while (Date.now() - start < DEFAULT_TIMEOUT) {
        if (await locator.isVisible()) return

        await expect.poll(async () => {
          await locator.waitFor({
            timeout: DEFAULT_TIMEOUT,
            state: options.state ?? 'visible'
          })
        }, {          
          // Poll for 10 seconds; defaults to 5 seconds. Pass 0 to disable timeout.
          intervals: [1_000, 2_000, 10_000],
          timeout: 10000,
        }).toBeTruthy();
      }
      throw new Error(`Timeout waiting for ${locator}`)
    }
  }

async function customWait(page: Page, waitType: TWAIT, locator?: Locator, options?: WaitOptions & TPAGE_STATE) {
    let condition: (page: Page, locator: Locator, options?: WaitOptions) => Promise<boolean>
    const timeout = options.timeout ?? DEFAULT_TIMEOUT
    const start = Date.now()

    if (waitType === 'forPage') {
      while (Date.now() - start < timeout) {
        await page.waitForLoadState(options || 'domcontentloaded', { timeout: options?.timeout ?? DEFAULT_TIMEOUT })
      }
      throw new Error('Custom condition not met')
    } else {
      if (!locator) throw new Error('Locator is required for custom wait')
      while (Date.now() - start < timeout) {
        if (await condition(page, locator, options)) return
        await page.waitForTimeout(100)
      }
    }
  }
