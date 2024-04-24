<template>
  <v-list class="mt-12 track_list">
    <track-item-list
      v-for="value in tracks"
      :key="value.id"
      :track="value"
    ></track-item-list>
  </v-list>

</template>
<script>
import TrackItemList from '../components/TrackItemList.vue';
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';

export default {
  components: {
    TrackItemList,
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