<template>
  <div class="d-flex flex-column mt-4" style="width: 80%">
    <h1>Ваши лицензии</h1>
    <license-list 
      is-edit 
      :licenses="licenses">
    </license-list>
  </div>
</template>
<script>
import LicenseList from '../components/Licenses/LicenseList.vue';
import { mapState, mapActions } from 'pinia';
import { useLicenseStore } from '../store/licenseStore';

export default {
  components: {
    LicenseList,
  },
  computed: {
    ...mapState(useLicenseStore, ['licenses']),
  },
  created() {
    this.sortLicensesByType(this.licenses);
  },
  methods: {
    ...mapActions(useLicenseStore, ['sortLicensesByType']),
  }
}
</script>
<style>
  
</style>