import { expect, request, test } from "@fixtures/main-fixture"

// A DELETE endpoint is typically used to remove a resource from the server. In this case, we are testing a DELETE endpoint for a specific resource identified by an itemId.


test.describe('DELETE - API/Endpoint Name, v1 tests', () => {

  test.afterAll(async ({ request }) => {
    request.dispose()
  })

  test('DELETE - valid request', async ({ request }) => {

    // validate the following: 
    // status code to be 204
    // response body, in most cases an empty [] is returned, but check the API documentation to determine what is expected
    // status code should not be 500, it can be assumed if it returns 204, then its valid, but if not for some reason want to be sure it never returns 500

    
    // create the item to delete, this is to ensure the item exists before trying to delete it, and to get the itemId to use in the delete request, this is important because if the item does not exist, the delete request will return a 404 error, which is not what we want to test in this case, we want to test a valid delete request, so we need to ensure the item exists before trying to delete it
    const itemId = await request.post('**/api/v1/create-item', {
      data: {
        name: 'Test Item',
        description: 'This is a test item'
      },
      headers: {
        'Authorization': 'Basic credentials',
        'Accept': 'application/json'
      }
    }).then(response => response.json()).then(data => data.id)


    const endpoint = `**/api/v1/validate-endpoint-name/${itemId}` // generally an item id is required to delete a single item, a test like this, should create the item first, then delete it, to ensure the endpoint is working as expected, create via another endpoint, or insertion into a database


    const response = await request.delete(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically (ideally, create a for generating this), can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      }
    })

    expect(response.status()).toBe(204)    

    /* expect(response).toMatchSchema('responseSchemaName')
    - this is how to validate the response body against a schema, that utilizes a custom fixture for validating responses against zod schemas, this is a much more robust way to validate response bodies, especially when the response body is complex, or has many properties, or when the values of the properties can vary, as long as they match the expected type defined in the schema
    you will need to create the zod schema and import to use this method. The easiest way to create a schema is provide to an ai chat the response and ask it to create a zod schema. Be sure  you have the zod package installed in your project
   */
  })

  test('DELETE - negative request - invalid itemId', async ({ request }) => {

    //validate when the values necessary are invalid, ex. a employeeId, it should return 400, or 404, or 406
    // depedning on the endpoint, if it requires authentication,  need to provide in the header the api key or token, and those usually are generated, see the api documentation to determine what is exactly required authenticate to endpoint and apply accordingly

    const endpoint = '**/api/v1/validate-endpoint-name/invalid-item-id'
   
    const response = await request.delete(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically, can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
      }
    })

    expect(response.status()).toBe(404) // or 404, or 406 depending on the API design
    expect(response.statusText()).toBe('Not Found') // or 'Not Found', or 'Not Acceptable' depending on the API design   

  })

  test('invalid request - missing itemId', async ({ request }) => {

    const endpoint = '**/api/v1/validate-endpoint-name'
   
    const response = await request.delete(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint
      headers: {
        'Authorization': 'Basic credentials', // credentials are using encoded, username|password in base 64 typically, can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'
        'Accept': 'application/json'
      }
    })

    expect(response.status()).toBe(400) // or 404, or 406 depending on the API design
    expect(response.statusText()).toBe('Bad Request') // or 'Not Found', or 'Not Acceptable' depending on the API design
  })

  test('DELETE - negative request - authentication - invalid credentials', async ({ request }) => {

    // validate when the authentication is invalid, example, wrong username or password, it should return a 401 error
    const endpoint = '**/api/v1/validate-endpoint-name/' + 'itemId' // must use valid itemId here
   
    const response = await request.delete(endpoint, {
      params: {
        endpointName: 'test-endpoint'
      },
      headers: {
        'Authorization': 'Basic invalid-credentials',
        'Accept': 'application/json'
      }
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Unauthorized')
  })

  test('DELETE - negative request - authentication - missing credentials', async ({ request }) => {

    // validate when the authentication is not provided, it should return a 401 error
    // validate when the authentication is invalid, example, wrong username or password, it should return a 401 error
    const endpoint = '**/api/v1/validate-endpoint-name/' + 'itemId' // must use valid itemId here
   
    const response = await request.delete(endpoint, {
      params: {
        endpointName: 'test-endpoint'
      },
      headers: {
        'Authorization': '',
        'Accept': 'application/json'
      }
    })
    expect(response.status()).toBe(401)
    expect(response.statusText()).toBe('Unauthorized')
  })

  test('DELETE - negative request - authentication - credentials without proper permissions to access resource', async ({ request }) => {
    // validate when the authentication is valid, but does not have permissions to access resource, it should return a 403 error (forbidden)
    const endpoint = '**/api/v1/validate-endpoint-name/' + 'itemId' // must use valid itemId here
    const response = await request.delete(endpoint, {
      params: {
        endpointName: 'test-endpoint'
      },
      headers: {
        'Authorization': '',
        'Accept': 'application/json'
      }
    })
    expect(response.status()).toBe(403)
    expect(response.statusText()).toBe('Forbidden')
  })


})
