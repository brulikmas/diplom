<template>
  <v-expansion-panel class="mt-6">
    <v-expansion-panel-title>
      <div class="d-flex flex-column">
        <p>{{ trackLicense.license.name }}</p>

        <available-files 
          class="mt-4"
          :available-files="trackLicense.license.availableFiles"
        ></available-files>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :disabled="isInBasket"
        class="cart_btn"
        width="100"
        size="small"
        :slot-scope="isInBasket ? '' : 'mdi-cart-arrow-down'"
        color="orange"
        @click.stop="addToBasket(trackLicense)"
      >
        {{ isInBasket ? 'В корзине' : trackLicense.custom_price + '₽'}}
      </v-btn>
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <license-info :license="trackLicense.license"></license-info>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
import AvailableFiles from '../Licenses/AvailableFiles.vue';
import LicenseInfo from '../Licenses/LicenseInfo.vue';
import { useCartStore } from '../../store/cartStore';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    AvailableFiles,
    LicenseInfo,
  },
  props: {
    trackLicense: {
      type: Object,
      default: null,
    },
    track: {
      type: Object,
      default: null,
    }
  },
  computed: {
    ...mapState(useCartStore, ['basketItems']),
    isInBasket() {
      return !!this.basketItems.find(v => (v.trackLicenseId || v.trackLicense.id) === this.trackLicense.id);
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addToBasket']),
  }
}
</script>
<style>
  
</style>