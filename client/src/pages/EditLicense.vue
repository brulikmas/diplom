<template>
  <v-card class="mt-6" style="width: 80%; background: none;">
    <v-card-title class="px-6 mb-4"><h2>Редактирование лицензии</h2></v-card-title>
    <v-form
      v-model="isValidForm"
      ref="form"
      class="px-6 pb-8"
    >
      <h3 class="mb-2">Основная информация</h3>

      <h4 class="mb-4">Тип:</h4>

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

      <h3 class="mb-4">Доступные файлы</h3>
      
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
      >
        Отмена
      </v-btn>
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
    }
  },
  computed: {
    ...mapState(useLicenseStore, ['licenses']),
  },
  created() {
    this.license = this.licenses.find(v => v.id == this.$route.params.id);
  }
}
</script>
<style>

</style>