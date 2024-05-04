<template>
  <v-dialog
    v-model="isTlDialogOpen"
    max-width="1000"
  >
    <v-card>
      <div v-if="isTrackLoading" style="width: 800px; height: 500px;">
        Загрузка...
      </div>

      <v-row v-else class="ma-0">
        <v-col cols="3">
          <div class="d-flex flex-column mt-4 pl-4">
            <v-img
              :width="250"
              aspect-ratio="1"
              cover
              :src="serverUrl + selectedToCartTrack.icon"
              rounded="lg"
            ></v-img>
    
            <v-card-title class="mt-2">
              <h2>
                <router-link
                  class="link"
                  :to="`/trackItem/${selectedToCartTrack.id}`"
                >
                  {{ selectedToCartTrack.name }}
                </router-link>
              </h2>
            </v-card-title>
    
            <v-card-subtitle class="mt-2">
              <h3>
                <router-link
                  class="link"
                  :to="`/userProfile/${selectedToCartTrack.userId}`"
                >
                  {{ selectedToCartTrack.userNickname }}
                </router-link>
              </h3>
            </v-card-subtitle>
          </div>
        </v-col>

        <v-col cols="9">
          <v-card-item>
            <v-expansion-panels>
              <track-license-item
                v-for="tl in dialogTrackLicenses"
                :key="tl.id"
                :track-license="tl"
                :track="selectedToCartTrack"
              ></track-license-item>
            </v-expansion-panels>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { useTrackStore } from '../../store/trackStore';
import { mapWritableState, mapState } from 'pinia';
import TrackLicenseItem from './TrackLicenseItem.vue';

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  components: {
    TrackLicenseItem,
  },
  computed: {
    ...mapState(useTrackStore, ['selectedToCartTrack', 'isTrackLoading', 'dialogTrackLicenses']),
    ...mapWritableState(useTrackStore, ['isTlDialogOpen']),
  },
}
</script>
<style>
  
</style>