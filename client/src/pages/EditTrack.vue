<template>
  <v-card class="mt-6" style="width: 80%; background: none;">
    <v-card-title class="px-6 mb-4"><h2>Редактирование трека</h2></v-card-title>
    <v-form
      v-model="isValidForm"
      ref="form"
      class="pl-6 pb-8"
    >
      <v-row>
        <v-col cols="8">
          <h3>Mp3 файл с войстегом для воспроизведения</h3>

          <v-file-input
            v-model="mp3TagFile"
            class="mt-4"
            accept="audio/mp3"
            :label="(!mp3TagFile || !mp3TagFile.length) ? fileNames.mp3 : 'Mp3 с войстегом'"
            base-color="orange"
            variant="outlined"
            prepend-inner-icon="mdi-music"
            prepend-icon=""
            :rules="filesRules"
          ></v-file-input>

          <h3>Файлы для скачивания после покупки</h3>
        </v-col>

        <v-col cols="4">
          <v-img
            :width="300"
            :src="imgUrl || track.icon"
            class="mb-4"
            aspect-ratio="1"
            cover
            rounded="lg"
          ></v-img>

          <v-file-input
            v-model="imgFile"
            accept="image/*"
            label="Загрузите обложку"
            base-color="orange"
            variant="outlined"
            prepend-inner-icon="mdi-image"
            prepend-icon=""
            :rules="filesRules"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isValidForm"
          color="orange"
          size="large"
          variant="outlined"
          class="mr-4"
        >
          {{ 'Сохранить' }}
        </v-btn>
  
        <v-btn
          size="large"
          variant="outlined"
          color="grey"
          to="/tracksEditor"
          class="mr-4"
        >
          Отмена
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>
<script>
import { useTrackStore } from '../store/trackStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      isValidForm: false,
      track: {
        id: null,
        name: 'Новый бит',
        genre: '',
        mood: '',
        bpm: null,
        tonality: '',
        description: '',
        icon: '',
        mp3tag: '',
        trackLicenses: [],
      },
      imgFile: null,
      filesRules: [
        value => {
          if (value.length !== 0) return true;

          return 'Необходимо загрузить файл!'
        }
      ],
      mp3TagFile: null,
      fileNames: {
        mp3: '',
        wav: '',
        trackout: '',
      }
    }
  },
  watch: {
    imgFile(value) {
      console.log(value)
    }
  },
  computed: {
    ...mapState(useTrackStore, ['tracks']),
    imgUrl() {
      if (!this.imgFile) return;

      if (this.imgFile?.length) {
        return URL.createObjectURL(this.imgFile[0]);
      } else if (this.imgFile.length === 0) {
        return;
      } else {
        return URL.createObjectURL(this.imgFile);
      }
    }
  },
  created() {
    this.track = this.tracks[0];

    if (this.track?.files?.length > 0) {
      this.track.files.forEach(f => {
        let splitArray = f.path.split('\\');
        this.fileNames[f.type] = splitArray[splitArray.length - 1];
      });
    }
  }
}
</script>
<style>

</style>