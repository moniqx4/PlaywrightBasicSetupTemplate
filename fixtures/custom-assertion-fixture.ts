import { APIResponse, expect as baseExpect, Locator } from "@playwright/test"
import { APIUtils } from "@utils/APIUtils"
import { ZodType } from "zod"


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