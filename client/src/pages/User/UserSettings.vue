<template>
  <v-form
    v-model="isValidForm"
    ref="form"
    class="mt-4"
  >
    <v-row>
      <v-col 
        cols="4"
        class="d-flex flex-column align-center"
      >
        <v-avatar size="250" class="mb-4">
          <v-img
            style="margin: auto;"
            aspect-ratio="1"
            cover
            :width="250"
            :src="imgUrl || user.avatar && (serverUrl + user.avatar) || '/src/assets/noavatar.jpg'"
            rounded="lg"
          ></v-img>
        </v-avatar>

        <v-file-input
          v-model="imgFile"
          class="img_input"
          style="width: 250px;"
          accept="image/*"
          label="Загрузите аватар"
          base-color="orange"
          variant="outlined"
          prepend-inner-icon="mdi-image"
          prepend-icon=""
        ></v-file-input>
      </v-col>

      <v-col cols="8">
        <v-text-field
          v-model="copiedUser.nickname"
          class="mb-2"
          label="Никнейм"
          placeholder="Введите никнейм"
          clearable
          :rules="nickNameRules"
        ></v-text-field>
    
        <v-text-field
          v-model="copiedUser.name"
          class="mb-2"
          label="Имя"
          placeholder="Введите имя"
          clearable
          :rules="simpleFieldsRules"
        ></v-text-field>
    
        <v-text-field
          v-model="copiedUser.surname"
          class="mb-2"
          label="Фамилия"
          placeholder="Введите фамилию"
          clearable
          :rules="simpleFieldsRules"
        ></v-text-field>
    
        <v-text-field
          v-model="copiedUser.country"
          label="Страна"
          placeholder="Введите страну"
          clearable
          :rules="simpleFieldsRules"
        ></v-text-field>

        <v-text-field
          v-model="copiedUser.info"
          label="Информация"
          placeholder="Введите информацию о вас"
          clearable
          :rules="simpleFieldsRules"
        ></v-text-field>
    
        <v-btn
          :disabled="!isValidForm || !(isFilesChanged || isDirty) || isSaveLoading"
          color="orange"
          size="large"
          variant="outlined"
          block
          @click="save()"
        >
          Сохранить
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { mapWritableState } from 'pinia';
import { useUserStore } from '../../store/userStore';
import { updateUser, getUser } from '../../http/userAPI';

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
      copiedUser: null,
      isValidForm: false,
      imgFile: null,
      isDirty: false,
      userScreenshot: null,
      isSaveLoading: false,
      nickNameRules: [
        value => {
          if (value) return true;

          return 'Никнейм обязателен!';
        },
        value => {
          if (value.length > 2) return true;

          return 'Длина никнейма должна быть больше 2 символов!';
        },
        value => {
          if (value.length < 30) return true;

          return 'Длина никнейма должна быть меньше 30 символов!';
        }
      ],
      simpleFieldsRules: [
        value => {
          if (!value) return true;

          if (value?.length < 55) return true;

          return 'Количество символов должно быть меньше 55!';
        }
      ],
    }
  },
  watch: {
    copiedUser: {
      handler(newValue) {
        if (this.userScreenshot !== JSON.stringify(newValue)) {
          this.isDirty = true;
        } else {
          this.isDirty = false;
        }
      },
      deep: true,
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user']),
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
    isFilesChanged: {
      get() {
        if ((this.imgFile && this.imgFile?.length === undefined) || (this.imgFile?.length && this.imgFile?.length !== 0)) {
          return true;
        }
  
        return false;
      },
      set(newValue) {
        if (!newValue) {
          this.imgFile = null;
        }
      }
    }
  },
  created() {
    this.copiedUser = JSON.parse(JSON.stringify(this.user, (key, value) => {
      return value ? value : '';
    }));
    this.userScreenshot = JSON.stringify(this.copiedUser);
  },
  methods: {
    async save() {
      try {
        this.isSaveLoading = true;
        const formData = new FormData();
  
        formData.append('name', this.copiedUser.name);
        formData.append('surname', this.copiedUser.surname);
        formData.append('country', this.copiedUser.country);
        formData.append('info', this.copiedUser.info);
        formData.append('nickname', this.copiedUser.nickname);
  
        formData.append('avatar',  this.imgFile?.length ? this.imgFile[0] : this.imgFile);
  
        await updateUser(formData);
        this.user = await getUser(this.user.id);
        this.copiedUser = this.user;
        this.userScreenshot = JSON.stringify(this.copiedUser);
        this.isDirty = false;
        this.isFilesChanged = false;
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.isSaveLoading = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.img_input > .v-input__control) {
  display: block;
}
</style>