import { faker } from '@faker-js/faker'
import { BankAccount } from "./data-types"

export const generateBankAccount = (): BankAccount => {
  const accountTypes: BankAccount["accountType"][] = ['Checking', 'Savings']
  const statuses: BankAccount["status"][] = ['active', 'pending', 'failed', 'disabled', 'not in use']
  const accountType = faker.helpers.arrayElement(accountTypes)
  const status = faker.helpers.arrayElement(statuses)
  return {
    id: faker.string.uuid(),
    bankName: faker.company.name() + ' Bank',
    accountType,
    status,
    personId: faker.string.uuid(),
    accountNumber: faker.finance.accountNumber(9),
    routingNumber: faker.finance.routingNumber(),
    allocations: [
      {
        bankAccountId: faker.string.uuid(),
        type: 'percentage',
        amount: faker.number.int({ min: 1, max: 100 }),
        isEnabled: faker.datatype.boolean(),
        applySpecialChecks: faker.datatype.boolean()
      }
    ]
  }
}

const ba1Id = faker.string.uuid()
const ba2Id = faker.string.uuid()
const ba3Id = faker.string.uuid()

export const bankAccountTestData: BankAccount[] = [
  {
    id: '1',
    bankName: 'Bank of America',
    nickname: 'My Checking Account',
    accountType: 'Checking',
    status: 'active',
    personId: "p1",
    accountNumber: '123456789',
    routingNumber: '126009593',
    allocations: [
      {
        bankAccountId: ba1Id,
        type: "percentage",
        amount: 25,
        isEnabled: false,
        applySpecialChecks: false
      }
    ]
  },
  {
    id: '2',
    bankName: 'Chase Bank',
    nickname: 'My Savings Account',
    accountType: 'Savings',
    personId: "p2",
    accountNumber: '123456789',
    routingNumber: '122100024',
    status: 'active',
    allocations: [
      {
        bankAccountId: ba2Id,
        type: "flat",
        amount: 500.0,
        isEnabled: true,
        applySpecialChecks: false
      }
    ]
  },
  {
    id: '3',
    bankName: 'Wells Fargo Bank NA (Arizona)',
    nickname: 'Pending Account',
    accountType: 'Checking',
    personId: "p3",
    accountNumber: '123456789',
    routingNumber: '122105278',
    status: 'pending',
    allocations: [
      {
        bankAccountId: ba3Id,
        type: "percentage",
        amount: 25,
        isEnabled: false,
        applySpecialChecks: false
      }
    ]
  },
]