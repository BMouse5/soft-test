import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { Account, Label } from '../types/account'

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
    const validAccounts = toRaw(accounts.value).filter(i => {
      const isLoginValid = !!i.login?.trim();
      const isPasswordValid = i.type === 'LDAP' || (i.type === 'Local' && !!i.password?.trim());
      return isLoginValid && isPasswordValid;
    });
    localStorage.setItem('accounts-state', JSON.stringify(validAccounts))
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
  }

  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter(i => i.id !== id)
    saveToLocalStorage()
  }

  const validateAndSave = (id: string) => {
    const account = accounts.value.find(i => i.id === id)
    if (!account) return

    account.errors.login = !account.login?.trim();
    account.errors.password = account.type === 'Local' ? !account.password?.trim() : false;

    const isValid = !account.errors.login && !account.errors.password
    if (isValid) {
      saveToLocalStorage()
    }
  }

  const updateAccountField = <K extends keyof Account>(id: string, field: K, value: Account[K]) => {
    const account = accounts.value.find(i => i.id === id)
    if (!account) return
    
    account[field] = value

    if (field === 'type' && value === 'LDAP') {
      account.password = null
      account.errors.password = false;
    }
  }

  const updateAccountLabels = (id: string, labelsString: string) => {
    const account = accounts.value.find(i => i.id === id)
    if (!account) return
    
    account.labels = parseLabels(labelsString)
  }

  return {
    accounts,
    addAccount,
    deleteAccount,
    updateAccountField,
    updateAccountLabels,
    loadFromLocalStorage,
    validateAndSave
  }
})