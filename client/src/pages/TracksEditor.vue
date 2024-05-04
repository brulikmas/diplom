<template>
  <v-list class="track_list mt-12">
    <div class="d-flex justify-space-between align-center">
      <h1 class="mb-4"> Редактор </h1>
  
      <v-btn
        variant="outlined"
        color="orange"
        prepend-icon="mdi-plus"
        to="/addTrack"
      >
        Создать трек
      </v-btn>
    </div>

    <div v-if="isTrackLoading">
      Загрузка...
    </div>

    <div v-else>
      <v-list-item
        v-for="track in tracks"
        :key="track.id"
        class="track_item mb-4"
      >
        <template #prepend>
          <v-list-item-media class="mr-4">
            <v-img
              :width="50"
              aspect-ratio="1"
              cover
              :src="serverUrl + track.icon"
              rounded="lg"
            ></v-img>
          </v-list-item-media>   
        </template>
  
        <v-list-item-title>
        <router-link 
          :to="`/editTrack/${track.id}`"
          class="link"
        >
          {{ track.name }}
        </router-link>
      </v-list-item-title>
  
      <template #append>
        <v-btn
          size="small"
          icon="mdi-pencil"
          color="orange"
          variant="text"
          :to="`/editTrack/${track.id}`"
        ></v-btn>
  
        <v-btn
          size="small"
          icon="mdi-delete"
          color="red"
          variant="text"
          @click="deleteTrack(track.id)"
        ></v-btn>
      </template>
      </v-list-item>
    </div>
  </v-list>
</template>
<script>
import { useTrackStore } from '../store/trackStore';
import { useUserStore } from '../store/userStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  computed: {
    ...mapState(useTrackStore, ['tracks', 'isTrackLoading']),
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useTrackStore, ['getAll', 'deleteTrack']),
    // async deleteTrackById(trackId) {
    //   try {
    //     await this.deleteTrackById(trackId);
        
    //   } catch (e) {
    //     alert(e.response.data.message);
    //   }
    // }
  },
  created() {
    this.getAll({ userId: this.user.id });
  }
}
</script>
<style scoped>
.track_list {
  background: none;
  width: 80%
}
.track_item:hover {
  cursor: pointer;
  background: rgb(55, 46, 35);
}
</style>