<template>
  <v-form class="filter_form">
    <v-text-field
      class="mr-2"
      density="compact"
      placeholder="Название"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      v-model="name"
    ></v-text-field>
    <v-text-field
      class="mr-2"
      density="compact"
      placeholder="BPM"
      variant="outlined"
      clearable
      v-model="bpm"
    ></v-text-field>
    <v-select
      class="mr-2"
      :items="genreItems"
      density="compact"
      label="Жанр"
      variant="outlined"
      clearable
      v-model="genre"
    ></v-select>
    <v-select
      class="mr-2"
      :items="moodItems"
      density="compact"
      label="Настроение"
      variant="outlined"
      clearable
      v-model="mood"
    ></v-select>
    <v-select
      :items="tonalityItems"
      density="compact"
      label="Тональность"
      variant="outlined"
      clearable
      v-model="tonality"
    ></v-select>
  </v-form>
</template>
<script>
import { genreItems, moodItems, tonalityItems } from './filtersItems.js';
export default {
  data() {
    return {
      genreItems,
      moodItems,
      tonalityItems,
      name: '',
      bpm: '',
      genre: '',
      mood: '',
      tonality: '',
    }
  }
}
</script>
<style>
.filter_form {
  display: flex;
}
</style>