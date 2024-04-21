import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      isAuth: false,
    }
  },
  actions: {

  }
})