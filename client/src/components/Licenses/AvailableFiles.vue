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
export default {
  data() {
    return {
      order: {
        mp3: 0,
        wav: 1,
        trackout: 2,
      }
    }
  },
  props: {
    availableFiles: {
      type: Array,
      default: [],
    }
  },
  created() {
    this.sortByTypes();
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    sortByTypes() {
      this.availableFiles.sort((a, b) => {
        const typeNumber1 =  this.order[a.file_type];
        const typeNumber2 =  this.order[b.file_type];
        return typeNumber1 - typeNumber2;
      });
    }
  }
}
</script>
<style>
  
</style>