import { defineStore } from 'pinia';
import { useLicenseStore } from './licenseStore';
import { getAll, getOne, getOneWithAuth, deleteTrack, createTrack, updateTrack } from '../http/trackApi';

export const useTrackStore = defineStore('trackStore', {
  state: () => {
    return {
      isTlDialogOpen: false,
      dialogTrackLicenses: [],
      selectedToCartTrack: null, 
      isTrackLoading: false,
      tracks: [],
    }
  },
  actions: {
    async openTlDialog(trackId) {
      try {
        this.isTrackLoading = true;
        this.isTlDialogOpen = true;
        this.dialogTrackLicenses = [];
        this.selectedToCartTrack = await this.getOne(trackId);
        const licenseStore = useLicenseStore();

        await licenseStore.getAll(this.selectedToCartTrack.userId);

        licenseStore.licenses.forEach(license => {
          let trackLicense = this.selectedToCartTrack.trackLicenses.find(tl => tl.licenseId === license.id);
          trackLicense.license = license;
          this.dialogTrackLicenses.push(trackLicense);
        })

      } catch (e) {
        console.log(e)
        alert(e?.response?.data?.message)
      } finally {
        this.isTrackLoading = false;
      }
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
      return await getOne(trackId);
    },
    async getOneWithAuth(trackId) {
      return await getOneWithAuth(trackId);
    },
    async createTrack(track) {
      return await createTrack(track);
    },
    async updateTrack(track) {
      return await updateTrack(track);
    },
    async deleteTrack(trackId) {
      try {
        await deleteTrack(trackId);
        this.tracks = this.tracks.filter(v => v.id !== trackId);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
  }
})