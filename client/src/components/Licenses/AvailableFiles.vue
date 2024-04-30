<template>
  <div>
    <v-chip
      v-for="availableFile in availableFiles"
      :key="availableFile.id"
      class="mr-2"
    >
      {{ capitalizeFirstLetter(availableFile.file_type) }}
    </v-chip>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useLicenseStore } from '../../store/licenseStore';

export default {
  props: {
    availableFiles: {
      type: Array,
      default: [],
    }
  },
  created() {
    this.sortAvailableFilesByType(this.availableFiles);
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    ...mapState(useLicenseStore, ['sortAvailableFilesByType'])
  }
}
</script>
<style>
  
</style>