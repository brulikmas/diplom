<template>
  <div class="mx-12 track_list_page">
    <filters-form class="mt-12"></filters-form>
  
    <v-list class="mt-2 track_list">
      <track-item-list
        v-for="value in tracks"
        :key="value.id"
        :track="value"
      ></track-item-list>
    </v-list>
  </div>

</template>
<script>
import TrackItemList from '../components/TrackItemList.vue';
import FiltersForm from '../components/filters/FiltersForm.vue';
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';

export default {
  components: {
    TrackItemList,
    FiltersForm
  },
  computed: {
    ...mapState(useTrackStore, ['tracks']),
  }
}
</script>
<style scoped>
.track_list {
  background: none;
}
.track_list_page {
  width: 100%;
}
</style>