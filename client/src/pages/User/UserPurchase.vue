<template>
  <div class="mt-4">
    <v-expansion-panels>
      <v-expansion-panel
        v-for="purchase in purchases"
        :key="purchase.id"
        class="mt-6"
      >
        <v-expansion-panel-title>
          <div class="d-flex">
            <v-img
              :width="50"
              aspect-ratio="1"
              cover
              :src="purchase.track.icon"
              rounded="lg"
            ></v-img>

            <div class="d-flex flex-column ml-2 justify-space-around">
              <p>{{ purchase.track.name }}</p>
            </div>
          </div>

          <v-spacer></v-spacer>

          <v-btn
            v-for="file in purchase.track.files"
            :key="file.id"
            color="orange"
            prepend-icon="mdi-download"
            size="large"
            variant="outlined"
            class="mr-2"
            @click.stop=""
          >{{ file.type }}</v-btn>

          <p class="mr-2">{{purchase.trackLicense.custom_price}} ₽</p>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <available-files 
              class="mt-4 mb-4"
              :available-files="purchase.license.availableFiles"
          ></available-files>

          <router-link 
            :to="`/userProfile/${purchase.beatmaker.id}/tracks`"
            class="link"
          >
            Битмейкер: {{purchase.beatmaker.nickname}}
          </router-link>

          <license-info :license="purchase.license"></license-info>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import { usePurchaseStore } from '../../store/purchaseStore';
import LicenseInfo from '../../components/Licenses/LicenseInfo.vue';
import AvailableFiles from '../../components/Licenses/AvailableFiles.vue';

const filesOrder = {
  mp3: 0,
  wav: 1,
  trackout: 2,
}

export default {
  components: {
    LicenseInfo,
    AvailableFiles,
  },
  computed: {
    ...mapState(usePurchaseStore, ['purchases']),
  },
  methods: {
    sortFilesByType(files) {
      files.sort((a, b) => {
        const typeNumber1 =  filesOrder[a.type];
        const typeNumber2 =  filesOrder[b.type];
        return typeNumber1 - typeNumber2;
      });
    }
  },
  created() {
    this.purchases.forEach(p => this.sortFilesByType(p.track.files));
  }
}
</script>
<style>
  
</style>