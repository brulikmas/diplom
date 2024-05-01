<template>
    <v-card class="mx-auto mt-6" width="600px">
      <v-card-title class="px-6"><h3>{{isLogin ? 'Вход' : 'Регистрация' }}</h3></v-card-title>
      <v-form
        v-model="isValidForm"
        ref="form"
        class="px-6 pb-8"
      >
        <v-text-field
          v-if="!isLogin"
          v-model="nickName"
          class="mb-2"
          label="Никнейм"
          placeholder="Введите никнейм"
          :rules="nickNameRules"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="email"
          class="mb-2"
          label="Email"
          placeholder="Введите Email"
          :rules="emailRules"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          class="mb-2"
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          :rules="passwordRules"
          clearable
        ></v-text-field>

        <v-text-field
          v-if="!isLogin"
          v-model="secondPassword"
          type="password"
          label="Повторный пароль"
          placeholder="Введите пароль еще раз"
          :rules="secondPasswordRules"
          clearable
        ></v-text-field>

        <v-switch
          v-if="!isLogin"
          color="orange"
          v-model="role"
          label="Вы битмейкер?"
          false-value="USER"
          true-value="BEATMAKER"
          hide-details
        ></v-switch>


        <p class="mb-2">
          {{ isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?' }} 
          <router-link 
            style="color: orange;"
            :to="`${isLogin ? '/register' : 'login'}`"
          >
            {{ isLogin ? 'Зарегистрируйся!' : 'Войти' }}
          </router-link>
        </p>

        <v-btn
          :disabled="!isValidForm"
          color="orange"
          size="large"
          variant="outlined"
          block
          @click="auth()"
        >
          {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
        </v-btn>
      </v-form>
    </v-card>
</template>
<script>
import { login, registration, getUser } from '../http/userAPI';
import { mapWritableState } from 'pinia';
import { useUserStore } from '../store/userStore';

export default {
  data() {
    return {
      isValidForm: false,
      nickName: '',
      email: '',
      password: '',
      secondPassword: '',
      role: 'USER',
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
      emailRules: [
        value => {
          if (value) return true;

          return 'Email обязателен!';
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true;

          return 'Введите корректный Email.';
        },
      ],
      passwordRules: [
        value => {
          if (value) return true;

          return 'Пароль обязателен!';
        },
        value => {
          if (value.length > 6) return true;

          return 'Длина пароля должна быть больше 6 символов!'
        }
      ],
      secondPasswordRules: [
      value => {
        if (value) return true;

        return 'Пароль обязателен!';
        },
        value => {
          if (value.length > 6) return true;

          return 'Длина пароля должна быть больше 6 символов!'
        },
        value => {
          if (value === this.password) return true;

          return 'Пароли должны совпадать!'
        }
      ]
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user', 'isAuth']),
    isLogin() {
      return this.$route.name === 'login';
    }
  },
  watch: {
    '$route.name'(newValue) {
      this.$refs.form.reset();
    }
  },
  methods: {
    async auth() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        let user = null;

        if (this.isLogin) {
          user = await login(this.email, this.password);
        } else {
          user = await registration(this.email, this.password, this.nickName, this.role)
        }

        this.user = await getUser(user.id);
        this.isAuth = true;
        this.$router.push('/tracks');
      } catch (e) {
        console.log(e)
        alert(e.response.data.message)
      }
    }
  },
}
</script>
<style>
  
</style>