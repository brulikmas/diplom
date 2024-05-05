<template>
    <v-bottom-sheet 
      v-model="isAudioBottomSheetOpen"
      :scrim="false"
      :persistent="true"
      :no-click-animation="true"
      scroll-strategy="none"
  >
    <audio-player
      :src="serverUrl + currentTrack.mp3tag"
      :track="currentTrack"
      autoplay
      allow-previous
      allow-next
      :album-art="serverUrl + currentTrack.icon"
      :playing="isPlaying"
      @next-audio="switchTrack('next')"
      @previous-audio="switchTrack('previous')"
      @changePlayingState="v => play(currentTrack, v)"
    ></audio-player>
  </v-bottom-sheet>
</template>
<script>
import AudioPlayer from './AudioPlayer.vue';
import { mapState, mapActions, mapWritableState } from 'pinia';
import { useAudioPlayerStore } from '../store/audioPlayerStore';

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  components: {
    AudioPlayer,
  },
  computed: {
    ...mapState(useAudioPlayerStore, ['isAudioBottomSheetOpen', 'currentTrack', 'isPlaying']),
  },
  methods: {
    ...mapActions(useAudioPlayerStore, ['play', 'switchTrack']),
  }
}
</script>
<style>
  
</style>