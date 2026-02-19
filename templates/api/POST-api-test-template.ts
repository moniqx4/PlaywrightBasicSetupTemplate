import { expect, test } from "@fixtures/main-fixture"


const basicCreds = 'your-credentials' // credentials are using encoded, username|password in base 64 typically, can also be a token, or a key, when its a key, its usually a specific key for the endpoint, ex. 'Name-Api-Key': 'some-api-key'

test.describe('POST - API/Endpoint Name, v1 tests', () => {

  test.afterAll(async ({ request }) => {
    request.dispose()
  })

  test('POST - valid request', async ({ request }) => {

    // validate the following: 
    // status code to be 200
    // response body, matches schema
    // status code should not be 500, it can be assumed if it returns 200, then its valid, but if not for some reason want to be sure it never returns 500
    const endpoint = '**/api/v1/validate-endpoint-name' + '&something=invalidparam' // params are optional, 

    const payload = {
      "item1": "value1",
      "item2": "value2"
    }

    const response = await request.post(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint
      headers: {
        'Authorization': `Basic ${basicCreds}`,
        'Accept': 'application/json'
        // made be other header values required, see the api documentation to determine what is exactly required in the header and apply accordingly
      }, 
      data: payload // optional, only if required, this is where the payload ( body ) would be added, see the api documentation to determine if a payload is required, and what the expected structure of the payload should be, and apply accordingly  
    })

    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    // this is how to check individual properties of the response body, when the expected response data is known, or a consistent value
    expect(responseBody).toHaveProperty('valid', true)
    expect(responseBody).toHaveProperty('message', 'Endpoint name is valid')

    /* expect(response).toMatchSchema('responseSchemaName') 
    - this is how to validate the response body against a schema, that utilizes a custom fixture for validating responses against zod schemas, this is a much more robust way to validate response bodies, especially when the response body is complex, or has many properties, or when the values of the properties can vary, as long as they match the expected type defined in the schema
    you will need to create the zod schema and import to use this method. The easiest way to create a schema is provide to an ai chat the response and ask it to create a zod schema. Be sure  you have the zod package installed in your project
   */
  })

  test('POST - invalid request - invalid params', async ({ request }) => {

    //validate when the values necessary are invalid, ex. a employeeId, it should return 400, or 404, or 406

    const endpoint = '**/api/v1/validate-endpoint-name' + '&something=invalidparam' 

    const response = await request.post(endpoint, {
      // params: {
      //   parm1Name: 'some-value'
      // }, - can added here instead of appending to the endpoint
      headers: {
        'Authorization': `Basic ${basicCreds}`,
        'Accept': 'application/json'
      }
    })

    expect(response.status()).toBe(404) // or 404, or 406 depending on the API design
    expect(response.statusText()).toBe('Not Found') // or 'Not Found', or 'Not Acceptable' depending on the API design   

  })

  test('POST - negative request - missing params', async ({ request }) => {

    //validate when the values necessary are invalid, ex. a employeeId, it should return 400, or 404, or 406
    // depending on the endpoint, if it requires authentication,  need to provide in the header the api key or token, and those usually are generated, see  the api documentation to determine what is exactly required authenticate to endpoing and apply accordingly

    const endpoint = '**/api/v1/validate-endpoint-name'


    const response = await request.get(endpoint, {
      params: {
        parm1Name: 'some-value'
      },
      headers: {
        'Accept': 'application/json'
      }
    })

    expect(response.status()).toBe(404) // or 404, or 406 depending on the API design
    expect(response.statusText()).toBe('Not Found') // or 'Not Found', or 'Not Acceptable' depending on the API design  

  })

  test('negative request - invalid payload ( body )', async ({ request }) => {

    //validate when the payload ( the body ) required for a request is invalid , ex incomplete of necessary fields, it should return a 400 series error, and never a 500 error

    const endpoint = '**/api/v1/endpoint-name'

    const payload = {
      "item1": "value1",
      "item2": "value2"
    }

    const response = await request.get(endpoint, {
      params: {
        param1: ' ' // optional, only if required
      },
      data: payload,
      headers: {
        'Authorization': `Basic ${basicCreds}`,
        'Accept': 'application/json'
      }
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Bad Request')
  })

  test('invalid request - missing payload ( body )', async ({ request }) => {

    //validate when the payload ( the body ) required for a request is not provided, it should return a 400 series error, and never a 500 error

    const endpoint = '**/api/v1/endpoint-name'

    const response = await request.get(endpoint, {
      params: {
        param1: ' ' // optional, only if required
      },
      // data: payload, normally the payload would be here
      headers: {
        'Authorization': `Basic ${basicCreds}`,
        'Accept': 'application/json'
      }
    })
    expect(response.status()).toBe(400)
    expect(response.statusText()).toBe('Bad Request')
  })

  test('invalid request - authentication - invalid credentials', async ({ request }) => {

    // validate when the authentication is invalid, example, wrong username or password, it should return a 401 error
    const endpoint = '**/api/validate-endpoint-name'
    
    const response = await request.get(endpoint, {
      params: {
        endpointName: 'test-endpoint'
      },
      headers: {
        'Authorization': 'Basic invalid-credentials',
        'Accept': 'application/json'
      }
    })
    expect(response.status()).toBe(401)
    expect(response.statusText()).toBe('Unauthorized')
  })

  test('invalid request - authentication - missing credentials', async ({ request }) => {

    // validate when the authentication is not provided, it should return a 401 error
    // validate when the authentication is invalid, example, wrong username or password, it should return a 401 error
    const endpoint = '**/api/validate-endpoint-name'
    
    const response = await request.get(endpoint, {
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

  test('invalid request - authentication - credentials without proper permissions to access resource', async ({ request }) => {
    // validate when the authentication is valid, but does not have permissions to access resource, it should return a 403 error (forbidden)
    const endpoint = '**/api/validate-endpoint-name'
    const response = await request.get(endpoint, {
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
