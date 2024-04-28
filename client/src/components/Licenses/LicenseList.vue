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
import { mapState } from 'pinia';

export default {
  data() {
    return {
      order: {
        base: 0,
        premium: 1,
        exclusive: 2,
      }
    }
  },
  components: {
    LicenseItem,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState(useLicenseStore, ['licenses']),
  },
  created() {
    this.sortByTypes();
  },
  methods: {
    sortByTypes() {
      this.licenses.sort((a, b) => {
        const typeNumber1 =  this.order[a.type];
        const typeNumber2 =  this.order[b.type];
        return typeNumber1 - typeNumber2;
      });
    }
  }
}
</script>
<style>
  
</style>