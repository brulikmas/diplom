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
          genre: 'Drill',
          mood: 'Радость',
          bpm: 140,
          tonality: 'A major',
          description: 'Лучший дрилл в мире!',
          icon: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          mp3tag: 'http://localhost:5000/2e608974-90bd-414b-806f-cbe334d364a4.mp3',
          userId: 1,
          trackLicenses: [
            {
              id: 29,
              custom_price: 10000,
              trackId: 22,
              licenseId: 20
            },
            {
              id: 30,
              custom_price: 200000,
              trackId: 22,
              licenseId: 21
            },
            {
              id: 31,
              custom_price: 500000,
              trackId: 22,
              licenseId: 22
            },
          ],
          files: [
            {
                id: 27,
                type: "mp3",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                trackId: 22
            },
            {
                id: 28,
                type: "wav",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                trackId: 22
            },
            {
                id: 29,
                type: "trackout",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\Изменения.zip",
                trackId: 22
            }
        ]
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