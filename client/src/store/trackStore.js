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
          mp3tag: 'http://localhost:5000/2e608974-90bd-414b-806f-cbe334d364a4.mp3',
          userId: 1,
          trackLicenses: [
            {
                id: 29,
                custom_price: 10000,
                trackId: 22,
                licenseId: 25
            },
            {
                id: 30,
                custom_price: 200000,
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
          mp3tag: 'http://localhost:5000/sample-3s.mp3',
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
          mp3tag: 'http://localhost:5000/2e608974-90bd-414b-806f-cbe334d364a4.mp3',
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
          mp3tag: 'http://localhost:5000/2e608974-90bd-414b-806f-cbe334d364a4.mp3',
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
          mp3tag: 'http://localhost:5000/2e608974-90bd-414b-806f-cbe334d364a4.mp3',
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