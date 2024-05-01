<template>
  <v-list class="mt-2 track_list">
    <track-item-list
      v-for="value in tracks"
      :key="value.id"
      :track="value"
    ></track-item-list>
  </v-list>
</template>
<script>
import TrackItemList from './TrackItemList.vue';

export default {
  components: {
    TrackItemList,
  },
  props: {
    tracks: {
      type: Array,
      default: null,
    }
  }
}
</script>
<style scoped>
.track_list {
  background: none;
}
</style>