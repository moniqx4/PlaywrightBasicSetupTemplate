import { mergeTests, test as base, Locator, request, type Page, mergeExpects } from '@playwright/test'
import { APIUtils } from '@utils/APIUtils'
import { customAssertionFixture } from './custom-assertion-fixture'



// The main fixture is used to import and merge any other fixtures you may have
// In your test, only need to import in this main fixture and you'll get access to all the other fixtures
// code below shows example of using this with a typical page object class and a functional factory class
// notice the difference is in the use line, one is instantiated, the other is not, both will work the same in the test
// and be called the same way when used through the fixture

type MainFixture = {
  apiUtils: typeof APIUtils  
}

const mainFixture = base.extend<MainFixture>({
  apiUtils: async ({  }, use) => {
      await use(APIUtils)
    }, 
   
})

export { type Locator, type Page, request }
export const test = mergeTests(mainFixture) 
export const expect = mergeExpects(customAssertionFixture)


