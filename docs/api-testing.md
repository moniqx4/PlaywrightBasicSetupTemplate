# API Testing Information

For API Testing, I have installed the ZOD package. Zod is a TypeScript-first validation library. It allows the building of Schemas, that can make easy work of validating API Responses. Basic items for API testing to get you started.

I've also added a fixture for validating Schemas, that all you to simply pass a schema to it, in a custom matcher, that is available as a method on the Expect library as a custom assertion, ex:

``` expect(yourschema).toMatchSchema(your-zod-schema) ```

Why ZOD?, it is easy to use, developers typically are familiar with it, so they will understand how it works if they are involved in writing tests for your team.
['<https://zod.dev>'](Zod)

## List of API file additions:

- custom-assertion-fixture - addition of the custom api assertion method for expect, added and merged into the main-fixture
- api-types.ts - common api types
- API.UTILS: some basic API utils
- templates/api/ - Templates for the basic methods, with lots of comments for beginners of API testing, just in case you not sure of all the items to test here
- configuration/pw-configs/api.config.ts - a configuration file specific for api tests
