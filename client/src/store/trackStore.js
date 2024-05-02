import { defineStore } from 'pinia';
import { useLicenseStore } from './licenseStore';
import { getAll, getOne, getOneWithAuth, deleteTrack } from '../http/trackApi';

export const useTrackStore = defineStore('trackStore', {
  state: () => {
    return {
      isTlDialogOpen: false,
      dialogTrackLicenses: [],
      selectedToCartTrackId: null, 
      isTrackLoading: false,
      tracks: [],
    }
  },
  actions: {
    async openTlDialog(trackId) {
      this.dialogTrackLicenses = [];
      this.selectedToCartTrackId = trackId;
      const licenseStore = useLicenseStore();
      this.isTlDialogOpen = true;
      //this.dialogTrackLicenses = this.tracks[trackId].trackLicenses;

      //здесь нужно будет делать запросы на лицензии по userId
      //const licenses = await axios.get(userId)
      licenseStore.sortLicensesByType(licenseStore.licenses);

      console.log(licenseStore.licenses)
      licenseStore.licenses.forEach(license => {
        let trackLicense = this.tracks.find(t => t.id === trackId).trackLicenses.find(tl => tl.licenseId === license.id);
        trackLicense.license = license;
        this.dialogTrackLicenses.push(trackLicense);
      })
    },
    async getAll(params) {
      try {
        this.isTrackLoading = true;

        this.tracks = (await getAll(params)).rows;
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.isTrackLoading = false;
      }
    },
    async getOne(trackId) {
      try {
        this.isTrackLoading = true;
        this.tracks = [(await getOne(trackId))];
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.isTrackLoading = false;
      }
    }
  }
})