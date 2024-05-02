import { defineStore } from 'pinia';
import { getAll, getOne, updateLicense } from '../http/licenseApi';
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
      licenses: [],
      isLicenseLoading: false,
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
    },
    async getAll(userId) {
      try {
        this.isLicenseLoading = true;

        this.licenses = await getAll(userId);

        this.sortLicensesByType(this.licenses);
      } catch (e) {
        alert(e.respnse.data.message);
      } finally {
        this.isLicenseLoading = false;
      }
    },
    async getOne(licenseId) {
      this.isLicenseLoading = true;
      return await getOne(licenseId);
    },
    async updateLicense(postParams) {
      return await updateLicense(postParams);
    }
  }
})