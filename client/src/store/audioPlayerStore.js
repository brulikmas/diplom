import { defineStore } from 'pinia';
import { useTrackStore } from './trackStore';

export const useAudioPlayerStore = defineStore('audioPlayerStore', {
  state: () => {
    return {
      isAudioBottomSheetOpen: false,
      isPlaying: false,
      currentTrack: null,
    }
  },
  actions: {
    play(track, changedPlaying) {
      if (!this.isAudioBottomSheetOpen) {
        this.isAudioBottomSheetOpen = true;
      }

      if (track.id === this.currentTrack?.id) {
        this.isPlaying = changedPlaying;
      } else {
        this.isPlaying = true;
        this.currentTrack = track;
      }
    },
    switchTrack(direction) {
      const trackStore = useTrackStore();

      const currentIndex = trackStore.tracks.findIndex(v => v.id === this.currentTrack.id);
      const tracksLength = trackStore.tracks.length;

      if (direction === 'previous') {
        currentIndex - 1 < 0 
          ? this.play(trackStore.tracks[tracksLength - 1], true)
          : this.play(trackStore.tracks[currentIndex - 1], true);
      }

      if (direction === 'next') {
        currentIndex + 1 > tracksLength - 1 
          ? this.play(trackStore.tracks[0], true)
          : this.play(trackStore.tracks[currentIndex + 1], true);
      }
    }
  }
})