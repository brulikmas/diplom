<template>
  <div class="mx-12 track_list_page">
      <filters-form class="mt-12"></filters-form>
    
      <div 
        v-if="isTrackLoading"
        class="mt-2"
      >
        Загрузка...
      </div>
      <track-list 
        v-else
        :tracks="tracks"
        ></track-list>
  </div>

</template>
<script>
import TrackList from '../components/Tracks/TrackList.vue';
import FiltersForm from '../components/filters/FiltersForm.vue';
import { useTrackStore } from '../store/trackStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    TrackList,
    FiltersForm
  },
  computed: {
    ...mapState(useTrackStore, ['tracks', 'isTrackLoading']),
  },
  methods: {
    ...mapActions(useTrackStore, ['getAll'])
  },
  created() {
    this.getAll();
  }
}
</script>
<style scoped>
.track_list_page {
  width: 100%;
}
</style>