import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      isAuth: false,
      userTab: 'settings',
      checkingUserProfile: {
        id: 9,
        nickname: "admin3",
        name: 'Андрей',
        surname: 'Крутой',
        country: 'Россия',
        avatar: '',
        info: 'Я классный)'
      },
      user: {},
    }
  },
  actions: {

  }
})