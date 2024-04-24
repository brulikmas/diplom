import { defineStore } from 'pinia';

export const useAudioPlayerStore = defineStore('audioPlayerStore', {
  state: () => {
    return {
      isAudioBottomSheetOpen: false,
      isPlaying: false,
      currentTrack: null,
    }
  },
  actions: {
    play(track) {
      if (!this.isAudioBottomSheetOpen) {
        this.isAudioBottomSheetOpen = true;
      }

      this.isPlaying = !this.isPlaying;
      this.currentTrack = track;
    }
  }
})