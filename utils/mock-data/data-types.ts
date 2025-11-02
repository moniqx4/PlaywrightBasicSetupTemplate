export interface BankAccountListing {
  personId: string
  bankAccounts: BankAccount[]
  allocations: Allocation[]
}

export type TAccountType = 'Checking' | 'Savings'

export type TBankAccountStatus = 'active' | 'pending' | 'failed' | 'disabled' | 'not in use'

export type TAllocationType = 'flat' | 'percentage' | 'remainder'


export interface BankAccount {
  id: string
  personId: string
  bankName: string
  nickname?: string // max 50 char
  accountType: TAccountType
  accountNumber: string
  routingNumber: string
  status: TBankAccountStatus
  allocations: Allocation[]
}

export interface Allocation {
  bankAccountId: BankAccount["id"]
  type: TAllocationType
  amount: number
  isEnabled: boolean
  applySpecialChecks: boolean
}

export interface Prenote {
  bankAccountId: BankAccount["id"]
  personId: string
  isEnabled: boolean
  date: Date
}