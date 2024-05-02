<template>
  <div>
    <v-form class="filter_form">
      <v-text-field
        class="mr-2"
        density="compact"
        placeholder="Название"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        clearable
        v-model="filter.name"
      ></v-text-field>
      <v-text-field
        class="mr-2"
        density="compact"
        placeholder="BPM"
        variant="outlined"
        clearable
        v-model="filter.bpm"
      ></v-text-field>
      <v-select
        class="mr-2"
        :items="genreItems"
        density="compact"
        label="Жанр"
        variant="outlined"
        clearable
        v-model="filter.genre"
      ></v-select>
      <v-select
        class="mr-2"
        :items="moodItems"
        density="compact"
        label="Настроение"
        variant="outlined"
        clearable
        v-model="filter.mood"
      ></v-select>
      <v-select
        :items="tonalityItems"
        density="compact"
        label="Тональность"
        variant="outlined"
        clearable
        v-model="filter.tonality"
      ></v-select>
    </v-form>

    <div>
      <v-btn
        variant="outlined"
        color="orange"
        class="mr-2"
        @click="getAll(filter)"
      >
        Найти
      </v-btn>
      
      <v-btn
        variant="outlined"
        @click="resetFilter()"
      >
        Сбросить
      </v-btn>
    </div>
  </div>
</template>
<script>
import { genreItems, moodItems, tonalityItems } from './filtersItems.js';
import { useTrackStore } from '../../store/trackStore.js';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      genreItems,
      moodItems,
      tonalityItems,
      filter: {
        name: '',
        bpm: '',
        genre: '',
        mood: '',
        tonality: '',
      }
    }
  },
  methods: {
    ...mapActions(useTrackStore, ['getAll']),
    resetFilter() {
      for (let key in this.filter) {
        this.filter[key] = '';
      };

      this.getAll(this.filter);
    }
  }
}
</script>
<style>
.filter_form {
  display: flex;
}
</style>