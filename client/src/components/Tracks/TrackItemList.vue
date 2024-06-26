<template>
  <v-list-item 
    class="track_item mb-4" 
    rounded="lg"
    :style="track.id === currentTrack?.id ? 'background: rgb(55, 46, 35)' : ''"
  >
    <template #prepend>
      <v-btn
        class="mr-2"
        size="small"
        :icon="getPlayIcon"
        color="orange"
        variant="text"
        @click="play(track, !isPlaying)"
      ></v-btn>

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
        :to="`/userProfile/${track.userId}/info`"
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
        :color="isUserMarkRating ? 'orange' : ''"
        size="x-small"
        @click="addOrRemoveRating()"
      ></v-btn>

      <p class="mr-2">{{ track.usersRating.length }}</p>

      <v-btn
        :disabled="track.userId === user.id"
        class="cart_btn"
        width="100"
        size="small"
        prepend-icon="mdi-cart-arrow-down"
        color="orange"
        @click="openDialog()"
      >
        {{getLowestPrice}} ₽
      </v-btn>
    </template>
  </v-list-item>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useAudioPlayerStore } from '../../store/audioPlayerStore';
import { useTrackStore } from '../../store/trackStore';
import { useUserStore } from '../../store/userStore';
import ratingMixin from './ratingMixin';

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  mixins: [ratingMixin],
  props: {
    track: {
      type: Object,
      required: true,
      default: null,
    }
  },
  computed: {
    ...mapState(useAudioPlayerStore, ['currentTrack', 'isPlaying']),
    ...mapState(useUserStore, ['user', 'isAuth']),
    getPlayIcon() {
      if (this.track.id !== this.currentTrack?.id) {
        return 'mdi-play';
      } else {
        return this.isPlaying ? 'mdi-pause' : 'mdi-play';
      }
    },
    getLowestPrice() {
      let lowestPrice = this.track.trackLicenses[0].custom_price;

      this.track.trackLicenses.forEach(tl => {
        if (tl.custom_price < lowestPrice) {
          lowestPrice = tl.custom_price;
        }
      });

      return lowestPrice;
    },
  },
  methods: {
    ...mapActions(useAudioPlayerStore, ['play']),
    ...mapActions(useTrackStore, ['openTlDialog']),
    openDialog() {
      if (this.isAuth) {
        this.openTlDialog(this.track.id)
      } else {
        this.$router.push('/login');
        return;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.cart_btn .v-btn__content) {
  width: 53px;
}
.track_item:hover {
  cursor: pointer;
  background: rgb(55, 46, 35);
}
</style>