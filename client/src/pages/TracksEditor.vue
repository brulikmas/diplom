<template>
  <v-list class="track_list mt-12">
    <h1 class="mb-4"> Редактор </h1>

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
            :src="track.icon"
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
      ></v-btn>
    </template>
    </v-list-item>
  </v-list>
</template>
<script>
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';

export default {
  computed: {
    ...mapState(useTrackStore, ['tracks']),
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