<template>
  <v-expansion-panel class="mt-6">
    <v-expansion-panel-title>
      <div class="d-flex flex-column">
        <p>{{ license.name }}</p>

        <available-files 
          class="mt-4"
          :available-files="license.availableFiles"
        ></available-files>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="isEdit"
        icon="mdi-pencil"
        color="orange"
        size="large"
        variant="text"
        @click.stop="editLicense()"
      ></v-btn>
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <license-info :license="license"></license-info>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
import AvailableFiles from './AvailableFiles.vue';
import LicenseInfo from './LicenseInfo.vue';

export default {
  components: {
    AvailableFiles,
    LicenseInfo,
  },
  props: {
    license: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    editLicense() {
      this.$router.push(`/editLicense/${this.license.id}`);
    }
  }
}
</script>
<style>
  
</style>