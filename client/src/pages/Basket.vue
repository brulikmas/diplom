<template>
  <div class="mt-4" style="width: 80%">
    <h1>Корзина</h1>
    
    <div v-if="isLoading">
      Загрузка...
    </div>

    <v-row v-else>
      <v-col cols="8">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="item in basketItems"
            :key="item.id"
            class="mt-6"
          >
            <v-expansion-panel-title>
              <div class="d-flex">
                <v-img
                  :width="50"
                  aspect-ratio="1"
                  cover
                  :src="serverUrl + item.track.icon"
                  rounded="lg"
                ></v-img>
    
                <div class="d-flex flex-column ml-2 justify-space-around">
                  <p>{{ item.track.name }}</p>
                </div>
              </div>
    
              <v-spacer></v-spacer>
    
              <p class="mr-2">{{item.trackLicense.custom_price}} ₽</p>
    
              <v-btn
                icon="mdi-delete"
                color="red"
                size="small"
                variant="text"
                @click.stop="deleteFromBasket(item.id)"
              ></v-btn>
            </v-expansion-panel-title>
    
            <v-expansion-panel-text>
              <div class="d-flex align-center mb-4">
                <p>Доступные файлы:</p>
    
                <available-files 
                    class="ml-2"
                    :available-files="item.license.availableFiles"
                ></available-files>
              </div>
    
              <router-link 
                :to="`/userProfile/${item.beatmaker.id}/tracks`"
                class="link"
              >
                Битмейкер: {{item.beatmaker.nickname}}
              </router-link>
    
              <license-info :license="item.license"></license-info>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col cols="4" class="mt-6">
        <v-card>
          <v-card-title>
            Итого: {{ totalSum }} ₽
          </v-card-title>

          <v-card-actions>
            <v-btn
              :disabled="totalSum === 0"
              variant="outlined"
              color="orange"
              block
              @click="buy()"
            >
              {{ isBuyingLoading ? 'Оплата...' : 'Оплатить'}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions, mapWritableState } from 'pinia';
import { useCartStore } from '../store/cartStore';
import LicenseInfo from '../components/Licenses/LicenseInfo.vue';
import AvailableFiles from '../components/Licenses/AvailableFiles.vue';
import { createPurchaseItem } from '../http/purchaseApi.js';

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
      isLoading: false,
      isBuyingLoading: false,
    }
  },
  components: {
    LicenseInfo,
    AvailableFiles,
  },
  computed: {
    ...mapState(useCartStore, ['totalSum']),
    ...mapWritableState(useCartStore, ['basketItems']),
  },
  methods: {
    ...mapActions(useCartStore, ['deleteFromBasket', 'getAll']),
    async buy() {
      try {
        this.isBuyingLoading = true;

        for (let basketTl of this.basketItems) {
          await createPurchaseItem({
            trackLicense: basketTl.trackLicense,
            beatmakerId: basketTl.beatmaker.id,
            basketId: basketTl.basketId,
          })
        }

        this.basketItems = [];
      } catch (e) {
        alert(e)
      } finally {
        this.isBuyingLoading = false;
      }
    }
  },
  async created() {
    try {
      this.isLoading = true;
      await this.getAll();
    } catch (e) {
      alert(e);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
<style>
  
</style>