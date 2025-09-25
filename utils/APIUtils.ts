import { APIResponse, Page } from "@playwright/test"
import { ZodType } from "zod/v4"
import { TokenObject } from "@sharedtypes/api-types"


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

// this method would not be for normal api calls, but for when  you have non-generate token and or cookie and instead can set here and use
function getTokenObject() {
  return {
    token: process.env.TOKEN,
    cookie: process.env.COOKIE
  }
}

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