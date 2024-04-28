<template>
  <div class="d-flex flex-column mt-4" style="width: 80%">
    <h1>Ваши лицензии</h1>
    <license-list is-edit></license-list>
  </div>
</template>
<script>
import LicenseList from '../components/Licenses/LicenseList.vue';

export default {
  components: {
    LicenseList,
  }
}
</script>
<style>
  
</style>