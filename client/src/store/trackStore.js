import { defineStore } from 'pinia';

export const useTrackStore = defineStore('trackStore', {
  state: () => {
    return {
      tracks: [
        {
          id: 1,
          userNickname: 'brulik',
          name: 'Nice',
          rating: 0,
          icon: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          userId: 1,
          trackLicenses: [
            {
                id: 29,
                custom_price: 1000,
                trackId: 22,
                licenseId: 25
            },
            {
                id: 30,
                custom_price: 2000,
                trackId: 22,
                licenseId: 26
            },
          ],
        },
        {
          id: 2,
          userNickname: 'brulik',
          name: 'Okay',
          rating: 0,
          icon: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          userId: 1,
          trackLicenses: [
            {
                id: 29,
                custom_price: 1000,
                trackId: 22,
                licenseId: 25
            },
            {
                id: 30,
                custom_price: 5000,
                trackId: 22,
                licenseId: 26
            },
          ],
        },
        {
          id: 3,
          userNickname: 'aarne',
          name: 'Face',
          rating: 0,
          icon: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          userId: 2,
          trackLicenses: [
            {
                id: 31,
                custom_price: 400,
                trackId: 22,
                licenseId: 25
            },
            {
                id: 32,
                custom_price: 1000,
                trackId: 22,
                licenseId: 26
            },
          ],
        },
        {
          id: 4,
          userNickname: 'brulik',
          name: 'Mamacita',
          rating: 3,
          icon: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          userId: 1,
          trackLicenses: [
            {
                id: 29,
                custom_price: 1000,
                trackId: 22,
                licenseId: 25
            },
            {
                id: 30,
                custom_price: 3000,
                trackId: 22,
                licenseId: 26
            },
          ],
        },
        {
          id: 5,
          userNickname: 'brulik',
          name: 'Flow',
          rating: 1,
          icon: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          userId: 1,
          trackLicenses: [
            {
                id: 29,
                custom_price: 1000,
                trackId: 22,
                licenseId: 25
            },
            {
                id: 30,
                custom_price: 500,
                trackId: 22,
                licenseId: 26
            },
          ],
        }
      ]
    }
  },
  actions: {

  }
})