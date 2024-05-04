<template>
  <div v-if="isTrackLoading">
    Загрузка...
  </div>
  
  <v-card
    v-else
    class="trackItem_card mt-6"
  >
    <template #prepend>
      <v-img
        :width="250"
        aspect-ratio="1"
        cover
        :src="serverUrl + track.icon"
        rounded="lg"
      ></v-img>

      <div class="d-flex flex-column justify-space-between ml-4 mt-2">
        <div>
          <v-card-title>
            <h1>{{ track.name }}</h1>
          </v-card-title>

          <v-card-subtitle class="mt-2">
            <h2>
              <router-link 
                :to="`/userProfile/${track.userId}`"
                class="link"
              >
                {{ track.userNickname }}
              </router-link>
            </h2>
          </v-card-subtitle>
        </div>

        <div>
          <v-card-actions class="pl-0">
            <v-btn
              class="cart_btn"
              width="100"
              size="small"
              prepend-icon="mdi-cart-arrow-down"
              color="orange"
              variant="elevated"
              @click="openDialog()"
            >
              {{getLowestPrice}} ₽
            </v-btn>

            <v-btn
              class="mr-1"
              icon="mdi-creation"
              variant="text"
              size="x-small"
              :color="isUserMarkRating ? 'orange' : ''"
              @click="addOrRemoveRating()"
            ></v-btn>
  
            <p class="mr-2">{{ track.usersRating.length }}</p>
          </v-card-actions>
        </div>
      </div>
    </template>

    <v-card-text class="mt-6">
      <v-divider
        class="mb-6"
        color="orange"
        thickness="2"
      ></v-divider>

      <h2 style="font-size: 28px;">О треке:</h2>
      <p class="mt-4">Bpm: {{ track.bpm }}</p>
      <p>Тональность: {{ track.tonality }}</p>
      <p>Жанр: {{ track.genre }}</p>
      <p>Настроение: {{ track.mood }}</p>
      <p>Описание: {{ track.description }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
import { useTrackStore } from '../store/trackStore';
import { useUserStore } from '../store/userStore';
import { mapState, mapActions, mapWritableState } from 'pinia';
import ratingMixin from '../components/Tracks/ratingMixin';
export default {
  data() {
    return {
      track: null,
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  mixins: [ratingMixin],
  computed: {
    ...mapState(useTrackStore, ['tracks']),
    ...mapState(useUserStore, ['user', 'isAuth']),
    ...mapWritableState(useTrackStore, ['isTrackLoading']),
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
  watch: {
    '$route.params.id': {
      handler() {
        this.initTrack();
      }
    }
  },
  methods: {
    ...mapActions(useTrackStore, ['openTlDialog', 'getOne']),
    async initTrack() {
      try {
        this.isTrackLoading = true;
        this.track = await this.getOne(this.$route.params.id);
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.isTrackLoading = false;
      }
    },
    openDialog() {
      if (this.isAuth) {
        this.openTlDialog(this.track.id)
      } else {
        this.$router.push('/login');
        return;
      }
    }
  },
  async created() {
    this.initTrack();
  }
}
</script>
<style lang="scss" scoped>
.v-card-text p {
  margin-top: 8px;
  font-size: large;
  font-weight: 500;
}
:deep(.v-card-item__prepend) {
  align-items: stretch !important;
  
}
.trackItem_card {
  width: 95%;
  height: 100%;
}
</style>