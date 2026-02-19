import { expect, test } from "@fixtures/main-fixture"

// A PUT request is used to update an existing resource or create a new resource if it does not exist. 
// - PUT requests are idempotent, meaning that making the same request multiple times will produce the same result. 
// - PUT request replaces the entire resource with the new data provided in the request body.
// - PUT request requires the request body to contain the full representation of the resource, including any fields that are not being changed.

//NOTE: these tests are a starting point a collection of the most common scenarios, and can be expanded upon as needed, and should be updated as the API changes.

test.describe('PUT - API/Endpoint Name, v1 tests', () => {

  test.afterAll(async ({ request }) => {
    request.dispose()
  })

  test('PUT - valid request', async ({ request }) => {

    // validate the following: 
    // status code to be 200
    // response body, matches schema
    // status code should not be 500, it can be assumed if it returns 200, then its valid, but if not for some reason want to be sure it never returns 500

    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const payload = {
      "value1": "new-value",
      "value2": "another-new-value",
      "value3": "value-not-changes",
      "value4": "value-not-changes",
      "value5": "value-not-changes"
    }

    const response = await request.put(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint      
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })

    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    // this is how to check individual properties of the response body, when the expected response data is known, or a consistent valud
    expect(responseBody).toHaveProperty('value', 'new-value')
    expect(response.statusText()).toBe('OK') // optional, check your api documentation to what it should return for status text if any is returned
    // assuming the response body is the entire response object, could validate the response body against a schema, if the schema is known, or can be inferred from the API documentaion
  
    /* expect(response).toMatchSchema('responseSchemaName')
    - this is how to validate the response body against a schema, that utilizes a custom fixture for validating responses against zod schemas, this is a much more robust way to validate response bodies, especially when the response body is complex, or has many properties, or when the values of the properties can vary, as long as they match the expected type defined in the schema
    you will need to create the zod schema and import to use this method. The easiest way to create a schema is provide to an ai chat the response and ask it to create a zod schema. Be sure  you have the zod package installed in your project
   */
  })

  test('PUT - negative request - invalid payload ( data - missing values required from original responseBody )', async ({ request }) => {

    //validate when the payload ( the body ) required for a request is invalid , ex incomplete of necessary fields, it should return a 400 series error, and never a 500 error

    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    // be sure and to not include all the values that are required in the payload, to simulate an invalid request
    const payload = {
      "value1": "new-value",
      "value2": "another-new-value",
      "value3": "value-not-changes",
      "value4": "value-not-changes",
    }

    const response = await request.put(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint      
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Bad Request')
  })

  test('PUT - negative request - invalid payload ( data - incorrect structure )', async ({ request }) => {

    //validate when the payload ( the body ) required for a request is invalid , ex incomplete of necessary fields, it should return a 400 series error, and never a 500 error

    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const payload = 'bad-string'

    const response = await request.put(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint      
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Bad Request')
  })

  test('PUT - negative request - invalid payload ( data - additional values included not part of payload )', async ({ request }) => {

    //validate when the payload ( the body ) required for a request is invalid , ex incomplete of necessary fields, it should return a 400 series error, and never a 500 error

    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const payload = {
      "value1": "new-value",
      "value2": "another-new-value",
      "value3": "value-not-changes",
      "value4": "value-not-changes",
      "extraValue": "extravalue"
    }

    const response = await request.put(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint      
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Bad Request')
  })

  test('PUT - negative request - missing payload', async ({ request }) => {

    //validate when the payload ( the body ) required for a request is not provided, it should return a 400 series error, and never a 500 error

    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const response = await request.put(endpoint, {
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      // data: {}
    })

    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Bad Request')
  })

  test('PUT - negative request - authentication - invalid credentials', async ({ request }) => {

    // validate when the authentication is invalid, example, wrong username or password, it should return a 401 error
    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const payload = {
      "value1": "new-value",
      "value2": "another-new-value",
      "value3": "value-not-changes",
      "value4": "value-not-changes",
      "value5": "value-not-changes"
    }

    const response = await request.put(endpoint, {
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Unauthorized')
  })

  test('PUT - negative request - authentication - missing credentials', async ({ request }) => {

    // validate when the authentication is not provided, it should return a 401 error
    // validate when the authentication is invalid, example, wrong username or password, it should return a 401 error
    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const payload = {
      "value1": "new-value",
      "value2": "another-new-value",
      "value3": "value-not-changes",
      "value4": "value-not-changes",
      "value5": "value-not-changes"
    }

    const response = await request.put(endpoint, {
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })
    expect(response.status()).toBe(401)
    expect(response.statusText()).toBe('Unauthorized')
  })

  test('PUT - negative request - authentication - credentials without proper permissions to access resource', async ({ request }) => {
    // validate when the authentication is valid, but does not have permissions to access resource, it should return a 403 error (forbidden)

    const itemId = 'itemId' // replace with actual itemId, for test should generate a valid one and then test updating it, and delete after test is done, or could use a pre-existing one, and be sure and update it back to original value after test is done

    const endpoint = '**/api/v1/validate-endpoint-name' + itemId// params are optional, only add if needed

    const payload = {
      "value1": "new-value",
      "value2": "another-new-value",
      "value3": "value-not-changes",
      "value4": "value-not-changes",
      "value5": "value-not-changes"
    }

    const response = await request.put(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint      
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      },
      data: payload
    })
    expect(response.status()).toBe(403)
    expect(response.statusText()).toBe('Forbidden')
  })
})
