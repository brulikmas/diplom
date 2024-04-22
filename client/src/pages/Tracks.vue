<template>
  <v-list class="mt-12 track_list">
    <track-item-list
      v-for="value in tracks"
      :key="value.id"
      :track="value"
      class="mb-4"
    ></track-item-list>
  </v-list>

</template>
<script>
import TrackItemList from '../components/TrackItemList.vue';
import AudioPlayer from '../components/AudioPlayer.vue';
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';
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