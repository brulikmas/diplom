<template>
  <v-list-item class="track_item" rounded="lg">
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

    <v-list-item-title class="mb-2">
      <router-link>{{ track.name }}</router-link>
    </v-list-item-title>

    <v-list-item-subtitle>
      <router-link>{{ track.userNickname}}</router-link>
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
  }
}
</script>
<style>
.track_item:hover {
  cursor: pointer;
  background: rgb(55, 46, 35);
}
</style>