<template>
  <div class="mt-8">
    <license-list
      :licenses="licenses"
    ></license-list>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useLicenseStore } from '../../store/licenseStore';
import LicenseList from '../../components/Licenses/LicenseList.vue';

export default {
  components: {
    LicenseList,
  },
  computed: {
    ...mapState(useLicenseStore, ['licenses']),
  },
}
</script>
<style>
  
</style>