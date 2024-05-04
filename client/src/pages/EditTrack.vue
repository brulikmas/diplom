<template>
  <v-card class="mt-6" style="width: 80%; background: none;">
    <v-card-title class="px-6 mb-4"><h2>Редактирование трека</h2></v-card-title>
    
    <div v-if="isTrackLoading">
      Загрузка...
    </div>

    <v-form
      v-else
      v-model="isValidForm"
      ref="form"
      class="pl-6 pb-8"
    >
      <v-row>
        <v-col cols="8">

          <h3>Mp3 файл с войстегом для воспроизведения</h3>

          <v-file-input
            v-model="audioFiles.mp3tag.file"
            class="mt-4"
            accept="audio/mp3"
            :label="getText('mp3tag')"
            base-color="orange"
            variant="outlined"
            prepend-inner-icon="mdi-music"
            prepend-icon=""
            :rules="filesRules"
          ></v-file-input>

          <h3>Файлы для скачивания после покупки</h3>

          <div class="mt-4 d-flex flex-wrap">
            <v-file-input
              v-model="audioFiles.mp3.file"
              class="mb-2 mr-4"
              accept="audio/mp3"
              :label="getText('mp3')"
              base-color="orange"
              variant="outlined"
              prepend-inner-icon="mdi-music"
              prepend-icon=""
              :rules="filesRules"
            ></v-file-input>
  
            <v-file-input
              v-model="audioFiles.wav.file"
              class="mb-2"
              accept="audio/wav"
              :label="getText('wav')"
              base-color="orange"
              variant="outlined"
              prepend-inner-icon="mdi-waveform"
              prepend-icon=""
              :rules="filesRules"
            ></v-file-input>
  
          </div>

          <v-file-input
            v-model="audioFiles.trackout.file"
            class="mb-2"
            accept="application/vnd.rar, application/zip"
            :label="getText('trackout')"
            base-color="orange"
            variant="outlined"
            prepend-inner-icon="mdi-folder-music"
            prepend-icon=""
            :rules="filesRules"
          ></v-file-input>


          <h3>Основная информация</h3>

          <v-text-field
            v-model="track.name"
            class="mt-4 mb-2"
            label="Название"
            placeholder="Введите название"
            clearable
            variant="outlined"
            :rules="stringRules"
          ></v-text-field>

          <v-text-field
            v-model="track.description"
            class="mb-2"
            label="Описание"
            placeholder="Введите описание"
            clearable
            variant="outlined"
            :rules="stringRules"
          ></v-text-field>

          <v-text-field
            v-model.number="track.bpm"
            class="mb-2"
            type="number"
            label="BPM"
            placeholder="BPM"
            variant="outlined"
            clearable
            :rules="bpmRules"
          ></v-text-field>

          <v-select
            v-model="track.genre"
            class="mb-2"
            :items="genreItems"
            label="Жанр"
            variant="outlined"
            :rules="notNullRules"
          ></v-select>

          <v-select
            v-model="track.tonality"
            class="mb-2"
            :items="tonalityItems"
            label="Тональность"
            variant="outlined"
            :rules="notNullRules"
          ></v-select>

          <v-select
            v-model="track.mood"
            class="mb-2"
            :items="moodItems"
            label="Настроение"
            variant="outlined"
            :rules="notNullRules"
          ></v-select>

          <h3 class="mb-4">Настройки трек-лицензий</h3>
          
          <div
            v-for="license in licenses"
            :key="license.id"
          >
            <h4 class="mb-2">Имя лицензии: {{ license.name }}</h4>

            <v-text-field
              v-model.number="findTrackLicense(license.id).custom_price"
              type="number"
              label="Цена"
              placeholder="Цена"
              variant="outlined"
              clearable
              :rules="notNullRules"
            ></v-text-field>
          </div>
        </v-col>

        <v-col cols="4">
          <v-img
            :width="300"
            :src="imgUrl || track.icon && (serverUrl + track.icon) || 'src/assets/noimg.jpg'"
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
        <v-btn
          :disabled="!isValidForm || !(isFilesChanged || isDirty) || isSaveLoding"
          color="orange"
          size="large"
          variant="outlined"
          class="mr-4"
          @click="save"
        >
          Сохранить
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
import { useLicenseStore } from '../store/licenseStore';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { genreItems, moodItems, tonalityItems } from '../components/filters/filtersItems';
import { useUserStore } from '../store/userStore';

export default {
  data() {
    return {
      genreItems,
      moodItems,
      tonalityItems,
      thisObject: this,
      isValidForm: false,
      trackScreenshot: null,
      isDirty: false,
      isSaveLoding: false,
      serverUrl: import.meta.env.VITE_API_URL,
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
          if (this.thisObject.isEdit) return true;

          if (!this.thisObject.isEdit && value.length !== 0) return true;

          return 'Необходимо загрузить файл!'
        }
      ],
      notNullRules: [
        value => {
          if (value) return true;

          return 'Обязательное поле!'
        }
      ],
      bpmRules: [
        value => {
          if (value) return true;

          return 'Введите значение!'
        },
        value => {
          if (+value < 500) return true;

          return 'Bpm должен быть меньше 500!'
        }
      ],
      stringRules: [
        value => {
          if (value) return true;

          return 'Введите значение';
        },
        value => {
          if (value.length < 50) return true;

          return 'Количество символов должно быть меньше 50'
        }
      ],
      audioFiles: {
        mp3tag: {
          fileName: '',
          label: 'Mp3 с войстегом',
          file: null,
        },
        mp3: {
          fileName: '',
          label: 'Mp3',
          file: null,
        },
        wav: {
          fileName: '',
          label: 'Wav',
          file: null,
        },
        trackout: {
          fileName: '',
          label: 'Архив по дорожкам',
          file: null,
        },
      }
    }
  },
  computed: {
    ...mapState(useTrackStore, ['tracks',]),
    ...mapState(useLicenseStore, ['licenses']),
    ...mapState(useUserStore, ['user']),
    ...mapWritableState(useUserStore, ['isTrackLoading']),
    imgUrl() {
      if (!this.imgFile) return;

      if (this.imgFile?.length) {
        return URL.createObjectURL(this.imgFile[0]);
      } else if (this.imgFile.length === 0) {
        return;
      } else {
        return URL.createObjectURL(this.imgFile);
      }
    },
    isEdit() {
      return this.$route.path.includes('edit');
    },
    isFilesChanged() {
      if ((this.imgFile && this.imgFile?.length === undefined) || (this.imgFile?.length && this.imgFile?.length !== 0)) {
        return true;
      }

      for (let key in this.audioFiles) {
        if ((this.audioFiles[key].file && this.audioFiles[key].file?.length === undefined)
          || (this.audioFiles[key].file?.length && this.audioFiles[key].file?.length !== 0)) 
        {
          return true;
        }
      };

      return false;
    }
  },
  watch: {
    track: {
      handler(newValue) {
        if (this.trackScreenshot !== JSON.stringify(newValue)) {
          this.isDirty = true;
        } else {
          this.isDirty = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(useLicenseStore, ['getAll']),
    ...mapActions(useTrackStore, ['getOneWithAuth', 'createTrack', 'updateTrack']),
    getText(type) {
      const fileData = this.audioFiles[type].file;

      if (!fileData || fileData?.length === 0) {
        return this.audioFiles[type].fileName || this.audioFiles[type].label;
      }

      if (fileData.length === undefined || fileData.length !== 0) {
        return this.audioFiles[type].label;
      }

      return this.audioFiles[type].label;
    },
    findTrackLicense(licenseId) {
      return this.track.trackLicenses.find(tl => tl.licenseId === licenseId);
    },
    async save() {
      try {
        this.isSaveLoding = true;
        const formData = new FormData();
        formData.append('name', this.track.name);
        formData.append('bpm', `${this.track.bpm}`);
        formData.append('tonality', this.track.tonality);
        formData.append('genre', this.track.genre);
        formData.append('mood', this.track.mood);
        formData.append('description', this.track.description);
        formData.append('trackLicenses', JSON.stringify(this.track.trackLicenses));
        formData.append('icon', this.imgFile?.length ? this.imgFile[0] : this.imgFile);
  
        for (let key in this.audioFiles) {
          let audioFile = this.audioFiles[key];
          formData.append(`${key}`, audioFile?.length ? audioFile[0].file : audioFile.file);
        }
        
        console.log(formData)
        if (this.track.id) {
          formData.append('id', `${this.track.id}`);
          await this.updateTrack(formData);
        } else {
          await this.createTrack(formData);
        }

        this.$router.push('/tracksEditor');
      } catch (e) {
        alert(e)
      } finally {
        this.isSaveLoding = false;
      }
    }
  },
  async created() {
    try {
      this.isTrackLoading = true;
      await this.getAll(this.user.id);
  
      if (this.isEdit) {
        this.track = await this.getOneWithAuth(this.$route.params.id);
    
        if (this.track?.files?.length > 0) {
          this.track.files.forEach(f => {
            let splitArray = f.path.split('\\');
            this.audioFiles[f.type].fileName = splitArray[splitArray.length - 1];
          });
        }
  
        this.audioFiles.mp3tag.fileName = `Tag-${this.audioFiles.mp3.fileName}`;
      } else {
        this.track.trackLicenses = this.licenses.map(license => {
          return {
            licenseId: license.id,
            custom_price: license.price,
          }
        });
      }
  
      this.trackScreenshot = JSON.stringify(this.track);
    } catch (e) {
      alert(e);
    } finally {
      this.isTrackLoading = false;
    }
  }
}
</script>
<style>

</style>