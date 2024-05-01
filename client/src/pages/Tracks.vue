<template>
  <div class="mx-12 track_list_page">
    <filters-form class="mt-12"></filters-form>
  
    <track-list :tracks="tracks"></track-list>
  </div>

</template>
<script>
import TrackList from '../components/Tracks/TrackList.vue';
import FiltersForm from '../components/filters/FiltersForm.vue';
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';

export default {
  components: {
    TrackList,
    FiltersForm
  },
  computed: {
    ...mapState(useTrackStore, ['tracks']),
  }
}
</script>
<style scoped>
.track_list_page {
  width: 100%;
}
</style>