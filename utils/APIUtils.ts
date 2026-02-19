import { APIResponse, Page } from "@playwright/test"
import { ZodType } from "zod/v4"
import { TokenObject } from "@sharedtypes/api-types"

// NOTE:

/**
 * Customs schema matcher for validatins API responses against Zod schemas, can be used in conjunction with Playwright's API testing capabilities or as a standalone utility for validating API responses in any context.
 * NOTE: Thisis availablein the fixtures. Use when writing tests that don't use the fixture
 * @param schema - A Zod schema object that defines the expected structure of the API response.
 * @param response - The APIResponse object returned from a Playwright API request, which contains the actual response data to be validated against the schema.
 * @returns An object containing the result of the validation, including success status and any errors if the validation fails.
 **/
async function customSchemaMatcher(schema: ZodType, response: APIResponse) {
  const responseBody = await response.json()
  return schema.safeParse(responseBody)
}


function getHeader(token: TokenObject) {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token.token}`,
  }
}

function getTokenObject() {
  return {
    token: process.env.TOKEN,
    cookie: process.env.COOKIE
  }
}

/**
 * Intercepts API request, call this method BEFORE the action that triggers the API call, and provide the endpoint to intercept, the mock data to return, and optionally a status code. This is useful for testing how the UI handles different API responses without relying on the actual backend.
 * NOTE: This is available in the fixtures. Use when writing tests that don't use the fixture
 * @param page | Page
 * @param endpoint | string
 * @param mockData | any data object {}, or [{}, {}] array of objects, or stringified JSON
 * @param [statusCode] | number
 */
async function interceptAPIRequest(page: Page, endpoint: string, mockData: any, statusCode?: number) {
  console.log(`Intercepting request to ${endpoint}`)
  // You can modify the request here if needed
  await page.route(endpoint, async (route, req) => {
    route.fulfill({
      status: statusCode ? statusCode : 200,
      contentType: 'application/json',
      body: mockData
    })
  })
}

export const APIUtils = {
  customSchemaMatcher,
  getHeader,
  getTokenObject,
  interceptAPIRequest
}