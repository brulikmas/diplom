<template>
  <v-card
    class="userProfile_card mt-6"
  >
    <template #prepend>
      <v-img
        :width="250"
        aspect-ratio="1"
        cover
        src=""
        rounded="lg"
      ></v-img>

      <div class="d-flex flex-column justify-space-between ml-4 mt-2">
        <div>
          <v-card-title>
            <h2>Битмейкер</h2>
            <h2></h2>
          </v-card-title>
        </div>
      </div>
    </template>

    <v-card-text class="mt-6">
      <v-divider
        class="mb-6"
        color="orange"
        thickness="2"
      ></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
import { useTrackStore } from '../store/trackStore';
import { mapState, mapActions } from 'pinia';
export default {
  computed: {

  },
  methods: {

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
.userProfile_card {
  width: 95%;
  height: 100%;
}
</style>