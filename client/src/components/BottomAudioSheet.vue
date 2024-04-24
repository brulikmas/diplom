<template>
    <v-bottom-sheet 
      v-model="isAudioBottomSheetOpen"
      :scrim="false"
      :persistent="true"
      :no-click-animation="true"
  >
    <audio-player
      :src="currentTrack.mp3tag"
      :track="currentTrack"
      allow-previous
      allow-next
      :album-art="currentTrack.icon"
      @next-audio="nextSrc()"
      @previous-audio="prevSrc()"
    ></audio-player>
  </v-bottom-sheet>
</template>
<script>
import AudioPlayer from './AudioPlayer.vue';
import { mapState } from 'pinia'
import { useAudioPlayerStore } from '../store/audioPlayerStore';

export default {
  components: {
    AudioPlayer,
  },
  computed: {
    ...mapState(useAudioPlayerStore, ['isAudioBottomSheetOpen', 'currentTrack']),
  }
}
</script>
<style>
  
</style>