interface IPage {
  directDepositSubtab: DirectDepositSubTabType
}

interface DirectDepositSubTabType {
    elements: Record<string, string>
    actions: Record<string, string>
    route: string
    endpoints: [
        {
            method: 'get' | 'post' | 'delete' |  'put'
            endpoint: string 
            params?: Record<string, any>
            body?: Record<string, any>
        }
    ]

}

interface ILoadPage {
	route: string
	pageTitle: string
}

interface IStateCheck {
    isVisible: boolean
    isEnabled: boolean
    isChecked?: boolean
    isSelected?: boolean

}

interface TestCreationType {
    id: string | number
    title: string
    expectedResult: string
    steps: Array<{
        action: string
        target: string
        value?: string | number | boolean
    }>
    testData?: Record<string, any>
    tags?: string[]
}

interface AddBankAccountTestSteps {
    before: {
        authenticate: () => Promise<void>
        navigateToSER: () => Promise<void>
        openDirectDepositSubtab: () => Promise<void>
    }    
    addBankAccount: {
        openAddAccount: () => Promise<void>
        fillAddBankAccountForm: () => Promise<void>
        submitAddBankAccountForm: () => Promise<void>
    }
    validateBankAccountAdded: () => Promise<void>
    after: {
        deleteBankAccount: () => Promise<void>
    }
}


// Test Interface, AI would have instructions that tell it what to do with the described items

// interface HomePageTest {
// 	testType: TestTypes
// 	environment: EnvironmentTypes
// 	persona?: PersonaTypes
// 	shouldRenderPage: {
// 		loadPage: ILoadPage
// 		visibilityCheck: HomePageType // ai aould know that they need to check the visibility of the defined elements and write the assertions for this
// 		elementFunctionality: { // any functionality on this page would be defined
// 			miniHeader: {
// 				props: MiniHeaderProps // the properties would tell AI how it works, 
// 				textContent: MiniHeaderDataType // hardcoded data object defined
// 				elements: Element[] // elements expected defined
// 			}
			
// 		}
// 		elementStateCheck: {
// 			dependencies: IDependencyType[] // if an api is called, that would be here, this type would list all the various dependencies that this element dependencies on, and AI would know they need to mock, or make actual call, depending on the type of test
// 			elementState: { // anything specific to the element
// 				element: Element
// 					isEnabled: boolean
// 					isVisible: boolean
// 				}
			
// 		}
// 		navigationCheck: {
// 			clickHome: ResultType
// 			clickAboutUs: ResultType
// 		}
// 	}
// }

