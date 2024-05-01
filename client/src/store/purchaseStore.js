import { defineStore } from 'pinia';

export const usePurchaseStore = defineStore('purchaseStore', {
  state: () => {
    return {
      purchases: [
        {
          id: 4,
          userId: 8,
          trackLicense: {
            id: 30,
            custom_price: 1000,
            is_visible: true,
            createdAt: "2024-04-17T21:38:42.665Z",
            updatedAt: "2024-04-17T21:38:42.665Z",
            trackId: 22,
            licenseId: 26
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
            userId: 9,
            files: [
              {
                id: 27,
                type: "mp3",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                createdAt: "2024-04-17T21:38:42.668Z",
                updatedAt: "2024-04-17T21:38:42.668Z",
                trackId: 22
              },
              {
                id: 28,
                type: "wav",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                createdAt: "2024-04-17T21:38:42.669Z",
                updatedAt: "2024-04-17T21:38:42.669Z",
                trackId: 22
              }
            ]
          },
          license: {
            id: 26,
            type: "premium",
            name: "Тест апдейта премиум лицензии",
            price: 2550,
            count_streams: "100001",
            count_copies: "5001",
            count_video_streams: "10001",
            count_performances: "10",
            is_visible: true,
            createdAt: "2024-04-14T10:58:43.853Z",
            updatedAt: "2024-04-14T10:58:43.853Z",
            userId: 9,
            availableFiles: [
              {
                id: 61,
                file_type: "wav",
                createdAt: "2024-04-14T10:58:43.965Z",
                updatedAt: "2024-04-14T10:58:43.965Z",
                licenseId: 26
              },
              {
                id: 62,
                file_type: "mp3",
                createdAt: "2024-04-14T10:58:43.967Z",
                updatedAt: "2024-04-14T10:58:43.967Z",
                licenseId: 26
              }
            ]
          },
          beatmaker: {
            id: 9,
            nickname: "admin3"
          }
        },
        {
          id: 5,
          userId: 8,
          trackLicense: {
            id: 31,
            custom_price: 50551,
            is_visible: true,
            createdAt: "2024-04-17T21:38:42.665Z",
            updatedAt: "2024-04-17T21:38:42.665Z",
            trackId: 22,
            licenseId: 26
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
            userId: 9,
            files: [
              {
                id: 27,
                type: "mp3",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                createdAt: "2024-04-17T21:38:42.668Z",
                updatedAt: "2024-04-17T21:38:42.668Z",
                trackId: 22
              },
              {
                id: 28,
                type: "wav",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                createdAt: "2024-04-17T21:38:42.669Z",
                updatedAt: "2024-04-17T21:38:42.669Z",
                trackId: 22
              },
              {
                id: 29,
                type: "trackout",
                path: "C:\\\\Programmirovanie\\\\diplom\\\\diplom\\\\server\\\\files\\9\\22\\sample-3s.wav",
                createdAt: "2024-04-17T21:38:42.669Z",
                updatedAt: "2024-04-17T21:38:42.669Z",
                trackId: 22
              }
            ]
          },
          license: {
            id: 27,
            type: "exclusive",
            name: "Эклюзивная лицензия",
            price: 50550,
            count_streams: "100001",
            count_copies: "5001",
            count_video_streams: "10001",
            count_performances: "10",
            is_visible: true,
            createdAt: "2024-04-14T10:58:43.853Z",
            updatedAt: "2024-04-14T10:58:43.853Z",
            userId: 9,
            availableFiles: [
              {
                id: 61,
                file_type: "wav",
                createdAt: "2024-04-14T10:58:43.965Z",
                updatedAt: "2024-04-14T10:58:43.965Z",
                licenseId: 26
              },
              {
                id: 62,
                file_type: "mp3",
                createdAt: "2024-04-14T10:58:43.967Z",
                updatedAt: "2024-04-14T10:58:43.967Z",
                licenseId: 26
              },
              {
                id: 63,
                file_type: "trackout",
                createdAt: "2024-04-14T10:58:43.967Z",
                updatedAt: "2024-04-14T10:58:43.967Z",
                licenseId: 26
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
  actions: {

  }
})