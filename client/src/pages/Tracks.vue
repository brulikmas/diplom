<template>
  <div class="mx-12 track_list_page">
      <filters-form
        :filter="filter"
        class="mt-12"
      >
      </filters-form>
    
      <div 
        v-if="isTrackLoading"
        class="mt-2"
        style="text-align: center;"
      >
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
import TrackList from '../components/Tracks/TrackList.vue';
import FiltersForm from '../components/filters/FiltersForm.vue';
import { useTrackStore } from '../store/trackStore';
import { useCartStore } from '../store/cartStore';
import { mapState, mapActions } from 'pinia';
import intersectionMixin from '../components/Tracks/intersectionMixin';

export default {
  data() {
    return {
      filter: {
        name: '',
        bpm: '',
        genre: '',
        mood: '',
        tonality: '',
      }
    }
  },
  components: {
    TrackList,
    FiltersForm
  },
  mixins: [intersectionMixin],
  computed: {
    ...mapState(useTrackStore, ['tracks', 'isTrackLoading', 'totalItems', 'page', 'isMoreLoad']),
  },
  methods: {
    ...mapActions(useTrackStore, ['getAll', 'loadMoreTracks']),
    ...mapActions(useCartStore, {
      getAllBasketTl: 'getAll',
    }),
  },
  created() {
    this.getAll();
    this.getAllBasketTl(); 
  }
}
</script>
<style scoped>
.track_list_page {
  width: 100%;
}
</style>