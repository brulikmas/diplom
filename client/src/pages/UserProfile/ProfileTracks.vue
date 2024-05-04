<template>
  <div>
    <div v-if="isTrackLoading">
      Загрузка...
    </div>

    <track-list
      v-else
      :tracks="tracks"
    ></track-list>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useTrackStore } from '../../store/trackStore';
import TrackList from '../../components/Tracks/TrackList.vue';

export default {
  components: {
    TrackList
  },
  computed: {
    ...mapState(useTrackStore, ['tracks', 'isTrackLoading']),
  },
  methods: {
    ...mapActions(useTrackStore, ['getAll'])
  },
  created() {
    this.getAll({ userId: this.$route.params.id })
  },
}
</script>
<style>
  
</style>