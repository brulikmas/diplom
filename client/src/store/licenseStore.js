import { defineStore } from 'pinia';
const licenseOrder = {
  base: 0,
  premium: 1,
  exclusive: 2,
};

const availableFilesOrder = {
  mp3: 0,
  wav: 1,
  trackout: 2,
}


export const useLicenseStore = defineStore('licenseStore', {
  state: () => {
    return {
      licenses: [
        {
            id: 20,
            type: "premium",
            name: "Премиум лицензия",
            price: 1000,
            count_streams: 50000,
            count_copies: 5000,
            count_video_streams: 10000,
            count_performances: 5,
            is_visible: true,
            userId: 8,
            availableFiles: [
                {
                    id: 47,
                    file_type: "mp3",
                    licenseId: 20
                },
                {
                    id: 48,
                    file_type: "wav",
                    licenseId: 20
                },
                {
                    id: 49,
                    file_type: "trackout",
                    licenseId: 20
                }
            ]
        },
        {
            id: 21,
            type: "exclusive",
            name: "Эксклюзивная лицензия",
            price: 1000,
            count_streams: 50000,
            count_copies: 5000,
            count_video_streams: 10000,
            count_performances: 5,
            userId: 8,
            availableFiles: [
                {
                    id: 50,
                    file_type: "mp3",
                    licenseId: 21
                },
                {
                    id: 51,
                    file_type: "wav",
                    licenseId: 21
                },
                {
                    id: 52,
                    file_type: "trackout",
                    licenseId: 21
                }
            ]
        },
        {
            id: 22,
            type: "base",
            name: "Тест апдейта лицензии",
            price: 2550,
            count_streams: 50001,
            count_copies: 5001,
            count_video_streams: 10001,
            count_performances: 10,
            userId: 8,
            availableFiles: [
                {
                    id: 53,
                    file_type: "wav",
                    createdAt: "2024-04-12T23:14:01.638Z",
                    updatedAt: "2024-04-12T23:14:01.638Z",
                    licenseId: 22
                }
            ]
        }
    ]
    }
  },
  actions: {
    sortLicensesByType(licenses) {
      licenses.sort((a, b) => {
        const typeNumber1 =  licenseOrder[a.type];
        const typeNumber2 =  licenseOrder[b.type];
        return typeNumber1 - typeNumber2;
      });
    },
    sortAvailableFilesByType(availableFiles) {
      availableFiles.sort((a, b) => {
        const typeNumber1 =  availableFilesOrder[a.file_type];
        const typeNumber2 =  availableFilesOrder[b.file_type];
        return typeNumber1 - typeNumber2;
      });
    }
  }
})