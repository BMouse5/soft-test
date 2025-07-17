import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account, Label, AccountType } from '../types/account'

const parseLabels = (labelsString: string): Label[] => {
  return labelsString
    .split(';')
    .map(label => label.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const saveToLocalStorage = () => {
    localStorage.setItem('accounts-state', JSON.stringify(accounts.value))
  }

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('accounts-state')
    if (data) {
      accounts.value = JSON.parse(data)
    }
  }

  const addAccount = () => {
    accounts.value.push({
      id: crypto.randomUUID(),
      labels: [],
      type: 'Local',
      login: '',
      password: '',
      errors: {
        login: false,
        password: false,
      },
    })
    saveToLocalStorage()
  }

  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter(acc => acc.id !== id)
    saveToLocalStorage()
  }

  const updateAccountField = <K extends keyof Account>(id: string, field: K, value: Account[K]) => {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return

    if (field === 'type' && value === 'LDAP') {
      account.password = null
    }

    account[field] = value
    validateAndSave(account)
  }

  const updateAccountLabels = (id: string, labelsString: string) => {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return

    account.labels = parseLabels(labelsString)
    validateAndSave(account)
  }

  const validateAndSave = (account: Account) => {
    account.errors = {
      login: !account.login?.trim(),
      password: account.type === 'Local' ? !account.password?.trim() : false,
    }

    const isValid = !account.errors.login && !account.errors.password
    if (isValid) {
      saveToLocalStorage()
    }
  }

  return {
    accounts,
    addAccount,
    deleteAccount,
    updateAccountField,
    updateAccountLabels,
    loadFromLocalStorage,
  }
})
