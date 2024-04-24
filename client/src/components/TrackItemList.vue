<template>
  <v-list-item class="track_item mb-4" rounded="lg">
    <template #prepend>
      <v-btn
        class="mr-2"
        size="small"
        icon="mdi-play"
        color="orange"
        variant="text"
        @click="play(track)"
      ></v-btn>

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

    <v-list-item-title class="mb-2">
      <router-link 
        :to="`/trackItem/${track.id}`"
        class="link"
      >
        {{ track.name }}
      </router-link>
    </v-list-item-title>

    <v-list-item-subtitle>
      <router-link 
        :to="`/userProfile/${track.userId}`"
        class="link"
      >
        {{ track.userNickname }}
      </router-link>
    </v-list-item-subtitle>

    <template #append>
      <v-btn
        class="mr-1"
        icon="mdi-creation"
        variant="text"
        size="x-small"
      ></v-btn>

      <p class="mr-2">{{track.rating}}</p>

      <v-btn
        size="small"
        prepend-icon="mdi-cart-arrow-down"
        color="orange"
      >
        {{getLowestPrice}} ₽
      </v-btn>
    </template>
  </v-list-item>
</template>
<script>
import { mapActions } from 'pinia'
import { useAudioPlayerStore } from '../store/audioPlayerStore';

export default {
  props: {
    track: {
      type: Object,
      required: true,
      default: null,
    }
  },
  computed: {
    getLowestPrice() {
      let lowestPrice = this.track.trackLicenses[0].custom_price;

      this.track.trackLicenses.forEach(tl => {
        if (tl.custom_price < lowestPrice) {
          lowestPrice = tl.custom_price;
        }
      });

      return lowestPrice;
    }
  },
  methods: {
    ...mapActions(useAudioPlayerStore, ['play']),
  }
}
</script>
<style scoped>
.track_item:hover {
  cursor: pointer;
  background: rgb(55, 46, 35);
}
.link {
  text-decoration: none;
  color: inherit;
}
.link:hover {
  text-decoration: underline;
}
</style>