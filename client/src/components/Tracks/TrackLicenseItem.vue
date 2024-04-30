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
        class="cart_btn"
        width="100"
        size="small"
        prepend-icon="mdi-cart-arrow-down"
        color="orange"
        @click.stop=""
      >
        {{ trackLicense.custom_price }} ₽
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

export default {
  components: {
    AvailableFiles,
    LicenseInfo,
  },
  props: {
    trackLicense: {
      type: Object,
      default: null,
    }
  }
}
</script>
<style>
  
</style>