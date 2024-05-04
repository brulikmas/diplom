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
      page: 1,
      totalItems: 0, 
      isMoreLoad: false,
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
        this.page = 1;

        const data = await getAll({...params, page: this.page });

        this.tracks = data.rows;
        this.totalItems = data.count;
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.isTrackLoading = false;
      }
    },
    async loadMoreTracks(params) {
      try {
        this.isMoreLoad = true;
        const data = await getAll({...params, page: this.page });

        this.tracks = [...this.tracks, ...data.rows];
        this.page += 1;
      } catch (e) {
        alert(e)
      } finally {
        this.isMoreLoad = false;
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