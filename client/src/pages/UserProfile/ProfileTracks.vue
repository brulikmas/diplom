<template>
  <div>
    <track-list
      :tracks="tracks"
    >

    </track-list>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import { useTrackStore } from '../../store/trackStore';
import TrackList from '../../components/Tracks/TrackList.vue';

export default {
  components: {
    TrackList
  },
  computed: {
    ...mapState(useTrackStore, ['tracks']),
  }
}
</script>
<style>
  
</style>