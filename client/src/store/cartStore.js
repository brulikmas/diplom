import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      basketItems: [
        {
          id: 6,
          basketId: 8,
          trackLicense: {
            id: 31,
            custom_price: 1000,
            is_visible: true,
            createdAt: "2024-04-17T21:38:42.666Z",
            updatedAt: "2024-04-17T21:38:42.666Z",
            trackId: 22,
            licenseId: 27
          },
          track: {
            id: 22,
            userNickname: "admin3",
            name: "Like",
            bpm: 145,
            tonality: null,
            genre: "drill",
            mood: null,
            description: null,
            icon: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            mp3tag: "b142e79a-9a0e-4dd7-8c51-d29e04ae38ff.mp3",
            rating: 0,
            is_visible: true,
            createdAt: "2024-04-17T21:38:42.628Z",
            updatedAt: "2024-04-18T17:59:22.247Z",
            userId: 9
          },
          license: {
            id: 27,
            type: "base",
            name: "Тест апдейта базовой лицензии",
            price: 2755,
            count_streams: "100001",
            count_copies: "5001",
            count_video_streams: "10001",
            count_performances: "10",
            is_visible: true,
            createdAt: "2024-04-17T20:28:10.804Z",
            updatedAt: "2024-04-17T20:28:10.804Z",
            userId: 9,
            availableFiles: [
              {
                id: 63,
                file_type: "wav",
                createdAt: "2024-04-17T20:28:10.853Z",
                updatedAt: "2024-04-17T20:28:10.853Z",
                licenseId: 27
              },
              {
                id: 64,
                file_type: "mp3",
                createdAt: "2024-04-17T20:28:10.854Z",
                updatedAt: "2024-04-17T20:28:10.854Z",
                licenseId: 27
              }
            ]
          },
          beatmaker: {
            id: 9,
            nickname: "admin3"
          }
        },
        {
          id: 7,
          basketId: 8,
          trackLicense: {
            id: 32,
            custom_price: 1000,
            is_visible: true,
            createdAt: "2024-04-17T21:38:42.666Z",
            updatedAt: "2024-04-17T21:38:42.666Z",
            trackId: 23,
            licenseId: 27
          },
          track: {
            id: 23,
            userNickname: "admin3",
            name: "Like",
            bpm: 145,
            tonality: null,
            genre: "drill",
            mood: null,
            description: null,
            icon: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
            mp3tag: "b142e79a-9a0e-4dd7-8c51-d29e04ae38ff.mp3",
            rating: 0,
            is_visible: true,
            createdAt: "2024-04-17T21:38:42.628Z",
            updatedAt: "2024-04-18T17:59:22.247Z",
            userId: 9
          },
          license: {
            id: 27,
            type: "base",
            name: "Тест апдейта базовой лицензии",
            price: 2755,
            count_streams: "100001",
            count_copies: "5001",
            count_video_streams: "10001",
            count_performances: "10",
            is_visible: true,
            createdAt: "2024-04-17T20:28:10.804Z",
            updatedAt: "2024-04-17T20:28:10.804Z",
            userId: 9,
            availableFiles: [
              {
                id: 63,
                file_type: "wav",
                createdAt: "2024-04-17T20:28:10.853Z",
                updatedAt: "2024-04-17T20:28:10.853Z",
                licenseId: 27
              },
              {
                id: 64,
                file_type: "mp3",
                createdAt: "2024-04-17T20:28:10.854Z",
                updatedAt: "2024-04-17T20:28:10.854Z",
                licenseId: 27
              }
            ]
          },
          beatmaker: {
            id: 9,
            nickname: "admin3"
          }
        }
      ]
    }
  },
  getters: {
    totalSum() {
      return this.basketItems.reduce((sum, item) => sum + item.trackLicense.custom_price, 0);
    },
  },
  actions: {

  }
})