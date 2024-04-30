<template>
  <v-card class="mt-6" style="width: 80%; background: none;">
    <v-card-title class="px-6 mb-4"><h2>Редактирование лицензии</h2></v-card-title>
    <v-form
      v-model="isValidForm"
      ref="form"
      class="px-6 pb-8"
    >
      <h3 class="mb-2">Основная информация</h3>

      <h4 class="mb-4">Тип: {{ titleTypesRussian[license.type] }}</h4>

      <v-row>
        <v-col>
          <v-text-field
            v-model="license.name"
            class="mb-2"
            label="Название"
            placeholder="Введите название"
            :rules="nameRules"
            clearable
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="license.price"
            class="mb-2"
            label="Цена"
            type="number"
            placeholder="Введите цену"
            :rules="priceRules"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <h3 class="mb-4">Доступные файлы:</h3>

      <v-row class="justify-space-between">
        <v-checkbox
          class="flex-grow-1"
          v-model="license.availableFiles"
          label="Mp3"
          :value="availableMp3"
          :disabled="isExclusive"
        >

        </v-checkbox>
        
        <v-checkbox
          class="flex-grow-1"
          v-model="license.availableFiles"
          label="Wav"
          :value="availableWav"
          :disabled="isExclusive"
        >

        </v-checkbox>

        <v-checkbox
          v-model="license.availableFiles"
          label="Trackout"
          :value="availableTrackout"
          :disabled="isExclusive"
        >

        </v-checkbox>
      </v-row>

      <p
        v-if="!license.availableFiles.length"
        class="mb-4"
        style="color: red"
      >
        Выберите хотя бы один доступный файл!
      </p>

      <h3 class="mb-4">Ограничения</h3>

      <v-row>
        <v-col>
          <v-text-field
            v-model.number="license.count_copies"
            :model-value="isExclusive ? 'Неограниченно' : license.count_copies"
            :type="isExclusive ? 'text' : 'number'"
            class="mb-2"
            label="Количество копий"
            placeholder="Введите значение"
            :rules="limitRules"
            :disabled="isExclusive"
            clearable
          ></v-text-field>

          <v-text-field
            v-model.number="license.count_streams"
            :model-value="isExclusive ? 'Неограниченно' : license.count_streams"
            :type="isExclusive ? 'text' : 'number'"
            class="mb-2"
            label="Аудио-стримы"
            placeholder="Введите значение"
            :rules="limitRules"
            :disabled="isExclusive"
            clearable
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model.number="license.count_video_streams"
            :model-value="isExclusive ? 'Неограниченно' : license.count_video_streams"
            :type="isExclusive ? 'text' : 'number'"
            class="mb-2"
            label="Видео-стримы"
            placeholder="Введите значение"
            :rules="limitRules"
            :disabled="isExclusive"
            clearable
          ></v-text-field>

          <v-text-field
            v-model.number="license.count_performances"
            :model-value="isExclusive ? 'Неограниченно' : license.count_performances"
            :type="isExclusive ? 'text' : 'number'"
            class="mb-2"
            label="Количество выступлений"
            placeholder="Введите значение"
            :rules="limitRules"
            :disabled="isExclusive"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isValidForm || !license.availableFiles.length || !isDirty"
          color="orange"
          size="large"
          variant="outlined"
          class="mr-4"
        >
          Сохранить
        </v-btn>
  
        <v-btn
          size="large"
          variant="outlined"
          color="grey"
          to="/licenses"
        >
          Отмена
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>
<script>
import { useLicenseStore } from '../store/licenseStore';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      isValidForm: false,
      license: null,
      licenseScreenshot: null,
      isDirty: false,
      availableMp3: {
        file_type: 'mp3',
      },
      availableWav: {
        file_type: 'wav',
      },
      availableTrackout: {
        file_type: 'trackout',
      },
      titleTypesRussian: {
        base: 'Базовая',
        premium: 'Премиум',
        exclusive: 'Эксклюзив'
      },
      nameRules: [
        value => {
          if (value) return true;

          return 'Это поле обязательно!';
        },
        value => {
          if (value.length < 40) return true;

          return 'Длина названия должна быть меньше 40 символов!';
        }
      ],
      priceRules: [
        value => {
          if (value) return true;

          return 'Это поле обязательно!';
        },
      ],
      limitRules: [
        value => {
          if (value) return true;

          return 'Это поле обязательно!';
        }
      ],
      checkboxRules: [
        value => {
          if (value.length) return true;

          return 'Выберите хотя бы один доступный файл!'
        }
      ]
    }
  },
  watch: {
    license: {
      handler(newValue) {
        if (this.licenseScreenshot !== JSON.stringify(newValue)) {
          this.isDirty = true;
        } else {
          this.isDirty = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(useLicenseStore, ['licenses']),
    isExclusive() {
      return this.license.type === 'exclusive';
    }
  },
  created() {
    this.license = this.licenses.find(v => v.id == this.$route.params.id);
    this.license.availableFiles = this.license.availableFiles.map(v => {
      if (v.file_type === this.availableMp3.file_type) {
        return this.availableMp3;
      } else if (v.file_type === this.availableWav.file_type) {
        return this.availableWav;
      } else if (v.file_type === this.availableTrackout.file_type) {
        return this.availableTrackout;
      }
    });
    
    this.licenseScreenshot = JSON.stringify(this.license);
  }
}
</script>
<style>

</style>