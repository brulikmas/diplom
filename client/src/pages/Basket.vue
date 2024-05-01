<template>
  <div class="mt-4" style="width: 80%">
    <h1>Корзина</h1>
    
    <v-row>
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
                  :src="item.track.icon"
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
                @click.stop=""
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
              variant="outlined"
              color="orange"
              block
            >
              Оплатить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import { useCartStore } from '../store/cartStore';
import LicenseInfo from '../components/Licenses/LicenseInfo.vue';
import AvailableFiles from '../components/Licenses/AvailableFiles.vue';

export default {
  components: {
    LicenseInfo,
    AvailableFiles,
  },
  computed: {
    ...mapState(useCartStore, ['basketItems', 'totalSum']),
  },
  methods: {
  },
  created() {
    
  }
}
</script>
<style>
  
</style>