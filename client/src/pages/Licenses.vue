<template>
  <div class="d-flex flex-column mt-4" style="width: 80%">
    <h1>Ваши лицензии</h1>

    <div v-if="isLicenseLoading">
      Загрузка...
    </div>
    <license-list
      v-else
      is-edit 
      :licenses="licenses">
    </license-list>
  </div>
</template>
<script>
import LicenseList from '../components/Licenses/LicenseList.vue';
import { mapState, mapActions } from 'pinia';
import { useLicenseStore } from '../store/licenseStore';
import { useUserStore } from '../store/userStore';

export default {
  components: {
    LicenseList,
  },
  computed: {
    ...mapState(useLicenseStore, ['licenses', 'isLicenseLoading']),
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useLicenseStore, ['getAll']),
  },
  created() {
    this.getAll(this.user.id);
  },
}
</script>
<style>
  
</style>