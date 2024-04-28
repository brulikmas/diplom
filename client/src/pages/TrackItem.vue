<template>
  <v-card
    class="trackItem_card mt-6"
  >
    <template #prepend>
      <v-img
          :width="250"
          aspect-ratio="1"
          cover
          :src="tracks[0].icon"
          rounded="lg"
        ></v-img>
        <div class="d-flex flex-column justify-space-between ml-4 mt-2">
          <div>
            <v-card-title>
              <h1>{{ tracks[0].name }}</h1>
            </v-card-title>
  
            <v-card-subtitle class="mt-2">
              <h2>
                <router-link 
                  :to="`/userProfile/${tracks[0].userId}`"
                  class="link"
                >
                  {{ tracks[0].userNickname }}
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
              >
                {{getLowestPrice}} ₽
              </v-btn>

              <v-btn
                class="mr-1"
                icon="mdi-creation"
                variant="text"
                size="x-small"
              ></v-btn>
    
              <p class="mr-2">{{tracks[0].rating}}</p>
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
      <p class="mt-4">Bpm: {{ tracks[0].bpm }}</p>
      <p>Тональность: {{ tracks[0].tonality }}</p>
      <p>Жанр: {{ tracks[0].genre }}</p>
      <p>Настроение: {{ tracks[0].mood }}</p>
      <p>Описание: {{ tracks[0].description }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';
export default {
  computed: {
    ...mapState(useTrackStore, ['tracks']),
    getLowestPrice() {
      let lowestPrice = this.tracks[0].trackLicenses[0].custom_price;

      this.tracks[0].trackLicenses.forEach(tl => {
        if (tl.custom_price < lowestPrice) {
          lowestPrice = tl.custom_price;
        }
      });

      return lowestPrice;
    }
  },
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