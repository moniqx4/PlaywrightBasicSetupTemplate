
// add new mock types as mock data sets are defined
interface Mocks {
  UserMock: TestUser
  APIMock: SomeAPIDataType  
}

type SomeAPIDataType = {
  id: number
  value: string
}

interface TestUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
}

// a generic function to get mock data by type, all mocks are defined here and returned based on the type parameter
function getMockData<T extends keyof Mocks>(type: T): Mocks[T] {
  const mockData: { [K in keyof Mocks]: Mocks[K] } = {
    UserMock: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin'
    },
    APIMock: {
      id: 1,
      value: 'API Response'
    }
  }
  return mockData[type]
}

// usage example: 
getMockData('UserMock') // returns TestUser
getMockData('APIMock') // returns SomeAPIDataType