import { defineStore } from 'pinia'

export interface Label {
  text: string
}

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: Label[]
  type: AccountType
  login: string
  password: string | null
  isValid: boolean
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    loadFromLocalStorage() {
      const data = localStorage.getItem('accounts')
      if (data) this.accounts = JSON.parse(data)
    },
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'LDAP',
        login: '',
        password: null,
        isValid: false,
      })
      this.saveToLocalStorage()
    },
    updateAccount(id: string, updated: Partial<Account>) {
      const index = this.accounts.findIndex(a => a.id === id)
      if (index !== -1) {
        this.accounts[index] = { ...this.accounts[index], ...updated }
        this.saveToLocalStorage()
      }
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter(a => a.id !== id)
      this.saveToLocalStorage()
    }
  }
})
