export type TokenObject = {
    token: string
    cookie: string
}

export enum APIMETHODS{
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    BATCH = 'batch',
    PATCH = 'patch'
}

export type EndpointDataType = {
    method: APIMETHODS
    endpointURL: string
    header?: any
    body?: any
    params?: Record<string,string>[]
}

export type APIHeaderType = {
    [x:string]: string
}

export interface APIResponse<T = any> {
    status: number
    data: T
    headers: { [key: string]: string }
}

export interface ApiTest {    
    endpoint: string
    method: APIMETHODS
    expectedStatus: number
    validateResponse?: (response: any) => Promise<void> | void
    params?: string // Optional parameters for the request
    body?: Record<string, any> // Optional body for POST/PUT requests
    description?: string
}

export interface InvalidCheckData<T = any> {
    // method: APIMETHODS
    expectedStatusCode: number
    validateResponse: (response: any) => Promise<void> | void
    token?: TokenObject
    apiKey?: string
    endpointUrl?: string
    header?: APIHeaderType
    body?: object | Record<string, any> | T
    addFetchOpt?: boolean // Optional flag to add fetch options
    response?: Promise<APIResponse>
    params?: string
    multipleParams?: URLSearchParams
    expectedErrMsg?: string
    enableLog?: false
    testTitle?: string
}

