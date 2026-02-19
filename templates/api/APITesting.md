# API Testing

These tests are a starting point a collection of the most common scenarios, and can be expanded upon as needed, and should be updated as the API changes. DELETE, PATCH are are quite different than GET, POST, PUT, and require different handling and validation
GET, the most common method, is used to retrieve data from a server at the specified resource
POST is used to create a new resource on the server
PUT is used to update an existing resource on the server, a PUT request replaces the entire resource with the new data

Other types of tests to consider, but not listed here, are if the endpoint has abilities to handle rate limiting, pagination, sorting, filtering, and other advanced features, test for those as well to work as expected returning the data in the expected format specified by the API documentation

## API Status Codes Defined

the majority of api status codes and their meanings - reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status, https://restfulapi.net/http-status-codes/

200 OK: The request has succeeded.
201 Created: The request has succeeded and a new resource has been created as a result.
202 Accepted: The request has been accepted for processing, but the processing has not been completed.
204 No Content: The request has succeeded but there is no content to send in the response.

400 Bad Request: The server could not understand the request due to invalid syntax.
401 Unauthorized: The client must authenticate itself to get the requested response.
403 Forbidden: The client does not have access rights to the content.
404 Not Found: The server can not find the requested resource.
405 Method not allowed: The request method is not supported for the requested resource.
406 Not Acceptable: The server can only generate a response that is not accepted by the client.
407 Proxy Authentication Required: The client must first authenticate itself with the proxy.
408 Request Timeout: The server timed out waiting for the request.
409 Conflict: The request could not be completed due to a conflict with the current state of the resource.
410 Gone: The resource requested is no longer available and will not be available again.
411 Length Required: The request did not specify the length of its content, which is required by the requested resource. (rarely used)
412 Precondition Failed: The server does not meet one of the preconditions that the requester put on the request. (rarely used)
413 Payload Too Large: The request is larger than the server is willing or able to process.
414 URI Too Long: The URI provided was too long for the server to process.
415 Unsupported Media Type: The media type of the request data is not supported by the server.
416 Range Not Satisfiable: The range specified by the client cannot be fulfilled. (rarely used)
417 Expectation Failed: The server cannot meet the requirements of the Expect request-header field. (rarely used)
418 I'm a teapot: The server refuses to brew coffee because it is a teapot. (rarely used)
422 Unprocessable Entity: The server understands the content type of the request entity, but was unable to process the contained instructions.
429 Too Many Requests: The user has sent too many requests in a given amount of time.

500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
501 Not Implemented: The server does not support the functionality required to fulfill the request. ( future feature use, rarely used )
502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
503 Service Unavailable: The server is not ready to handle the request, often due to maintenance or overload.
504 Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
505 HTTP Version Not Supported: The server does not support the HTTP protocol version that was used in the request.
511 Network Authentication Required: The client needs to authenticate to gain network access. (rarely used)
520 Unknown Error: The server encountered an unknown error. (rarely used)
521 Web Server Is Down: The server is down or overloaded.
522 Connection Timed Out: The server did not respond in time.
523 Origin Is Unreachable: The origin server is unreachable.
524 A Timeout Occurred: The server timed out while waiting for a response from the upstream server. (rarely used)

NOTES:

- a 200 response should include a response body. The information returned with the response is dependent on the method used in the request, for example:

GET an entity corresponding to the requested resource is sent in the response;
HEAD the entity-header fields corresponding to the requested resource are sent in the response without any message-body;
POST an entity describing or containing the result of the action;
TRACE an entity containing the request message as received by the end server.

- 201 status code whenever a resource is created inside a collection. There may also be times when a new resource is created as a result of some controller action, in which case 201 would also be an appropriate response.
- The origin server MUST create the resource before returning the 201 status code. If the action cannot be carried out immediately, the server SHOULD respond with a 202 (Accepted) response instead.
- 202 status code whenever a request is accepted for processing, but the processing has not been completed. This is typically used for asynchronous operations.
- 204 status code whenever a request is successful but there is no content to return. This is often used in response to a DELETE request or a PUT or POST request that does not require a response body.

- A 405 response must include the Allow header, which lists the HTTP methods that the resource supports. ex. Allow: GET, POST