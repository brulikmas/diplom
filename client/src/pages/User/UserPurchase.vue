<template>
  <div v-if="isLoading">
    Загрузка...
  </div>

  <div
    v-else 
    class="mt-4"
  >
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
              :src="serverUrl + purchase.track.icon"
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
            @click.stop="downloadFile(purchase, file)"
          >{{ file.type }}</v-btn>

          <p class="mr-2">{{ purchase.trackLicense.custom_price }} ₽</p>
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
import { mapWritableState } from 'pinia';
import { usePurchaseStore } from '../../store/purchaseStore';
import LicenseInfo from '../../components/Licenses/LicenseInfo.vue';
import AvailableFiles from '../../components/Licenses/AvailableFiles.vue';
import { getAll } from '../../http/purchaseApi.js';

const filesOrder = {
  mp3: 0,
  wav: 1,
  trackout: 2,
}

export default {
  data() {
    return {
      isLoading: false,
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  components: {
    LicenseInfo,
    AvailableFiles,
  },
  computed: {
    ...mapWritableState(usePurchaseStore, ['purchases']),
  },
  methods: {
    sortFilesByType(files) {
      files.sort((a, b) => {
        const typeNumber1 =  filesOrder[a.type];
        const typeNumber2 =  filesOrder[b.type];
        return typeNumber1 - typeNumber2;
      });
    },
    async downloadFile(purchase, file) {
      try {
        const response = await fetch(
          `${this.serverUrl}api/track/download?purchaseId=${purchase.id}&filePath=${file.path}&fileType=${file.type}`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        );
        
        if (response.status === 200) {
          let splitArray = file.path.split('\\');
          let fileName = splitArray[splitArray.length - 1];

          const blob = await response.blob();
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } catch (e) {
        alert(e)
      }
    }
  },
  async created() {
    try {
      this.isLoading = true;
      this.purchases = (await getAll()).rows;
      this.purchases.forEach(p => this.sortFilesByType(p.track.files));
    } catch (e) {
      alert(e)
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
<style>
  
</style>