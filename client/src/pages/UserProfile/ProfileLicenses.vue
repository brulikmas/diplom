<template>
  <div class="mt-8">
    <license-list
      :licenses="licenses"
    ></license-list>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '../../store/userStore';
import { useLicenseStore } from '../../store/licenseStore';
import LicenseList from '../../components/Licenses/LicenseList.vue';

export default {
  components: {
    LicenseList,
  },
  data() {
    return {
      licensesProfile: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['checkingUserProfile']),
    ...mapState(useLicenseStore, ['licenses']),
  },
  methods: {
    ...mapActions(useLicenseStore, ['sortLicensesByType']),
  },
  created() {
    this.licensesProfile = this.sortLicensesByType(this.licenses)
  }
}
</script>
<style>
  
</style>