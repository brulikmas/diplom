<template>
  <v-list class="mt-12 track_list">
    <track-item-list
      v-for="value in tracks"
      :key="value.id"
      :track="value"
      class="mb-4"
    ></track-item-list>
    <audio-player
      src="http://localhost:5000/2e608974-90bd-414b-806f-cbe334d364a4.mp3"
      track-title="Your Music"
      track-subtitle="Best of Electro Swing"
      allow-previous
      allow-next
      :autoplay="true"
      album-art="http://localhost:5000/9030355a-1546-437f-8c77-c237b07ac109.jpeg"
      @next-audio="nextSrc()"
      @previous-audio="prevSrc()"
      prev-track-icon="mdi-skip-previous"
      next-track-icon="mdi-skip-next"
      back-forward-icon="mdi-rewind-5"
      fast-forward-icon="fast-forward-5"
      play-icon="mdi-play"
      pause-icon="mdi-pause"
      mute-volume-icon="mdi-volume-off"
      low-volume-icon="mdi-volume-low"
      medium-volume-icon="mdi-volume-medium"
      high-volume-icon="mdi-volume-high"
    ></audio-player>

  </v-list>

</template>
<script>
import TrackItemList from '../components/TrackItemList.vue';
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';
import AudioPlayer from '../components/AudioPlayer.vue';
export default {
  components: {
    TrackItemList,
    AudioPlayer,
  },
  computed: {
    ...mapState(useTrackStore, ['tracks']),
  }
}
</script>
<style scoped>
.track_list {
  width: 90%;
  background: none;
}
</style>