import { defineStore } from 'pinia';

export const usePurchaseStore = defineStore('purchaseStore', {
  state: () => {
    return {
      purchases: [],
    }
  },
  actions: {

  }
})