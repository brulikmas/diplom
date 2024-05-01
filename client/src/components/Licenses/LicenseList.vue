<template>
  <v-expansion-panels>
    <license-item
      v-for="license in licenses"
      :key="license.id"
      :license="license"
      :is-edit="isEdit"
    ></license-item>
  </v-expansion-panels>
</template>
<script>
import LicenseItem from './LicenseItemList.vue';
import { useLicenseStore } from '../../store/licenseStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {

    }
  },
  components: {
    LicenseItem,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    licenses: {
      type: Array,
      default: [],
    }
  },
}
</script>
<style>
  
</style>