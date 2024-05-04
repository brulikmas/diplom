import { defineStore } from 'pinia';
import { addToBasket, deleteFromBasket, getAll } from '../http/basketApi';

export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      basketItems: []
    }
  },
  getters: {
    totalSum() {
      return this.basketItems.reduce((sum, item) => sum + item.trackLicense.custom_price, 0);
    },
  },
  actions: {
    async addToBasket(trackLicense) {
      try {
        let newBasketTl = await addToBasket(trackLicense);
        
        if (this.basketItems.find(v => v.id === newBasketTl.id)) {
          this.basketItems = this.basketItems.filter(v => v.id !== newBasketTl.id)
        }

        this.basketItems.push(newBasketTl);
      } catch (e) {
        alert(e);
      }
    },
    async getAll() {
      try {
        this.basketItems = await getAll();
      } catch (e) {
        if (e?.response?.status === 401) {
          console.log(e.response.data.message);
        } else {
          alert(e);
        }
      }
    },
    async deleteFromBasket(id) {
      try {
        await deleteFromBasket(id);
        this.basketItems = this.basketItems.filter(v => v.id !== id);
      } catch (e) {
        alert(e)
      }
    }
  }
})