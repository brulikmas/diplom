<template>
  <div>
    <div v-if="isTrackLoading">
      Загрузка...
    </div>

    <track-list
      v-else
      :tracks="tracks"
    ></track-list>

    <div
      v-show="!isTrackLoading"
      ref="observer"
      class="observer"
    >{{ isMoreLoad ? 'Загрузка...' : '' }}</div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useTrackStore } from '../../store/trackStore';
import TrackList from '../../components/Tracks/TrackList.vue';
import intersectionMixin from '../../components/Tracks/intersectionMixin';

export default {
  components: {
    TrackList
  },
  mixins: [intersectionMixin],
  computed: {
    ...mapState(useTrackStore, ['tracks', 'isTrackLoading', 'totalItems', 'page', 'isMoreLoad']),
  },
  methods: {
    ...mapActions(useTrackStore, ['getAll', 'loadMoreTracks'])
  },
  created() {
    this.getAll({ userId: this.$route.params.id })
  },
}
</script>
<style>
  
</style>