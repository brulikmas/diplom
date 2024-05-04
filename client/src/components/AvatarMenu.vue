<template>
  <v-menu
    min-width="200px"
    rounded
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="mr-4"
        icon
        v-bind="props"
      >
        <v-avatar
          size="40"
        >
          <v-img
            aspect-ratio="1"
            cover
            alt="Avatar"
            :src="user.avatar && (serverUrl + user.avatar) || '/src/assets/noavatar.jpg'"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-btn 
            icon
            :to="`/userProfile/${user.id}/tracks`"
          >
            <v-avatar size="40">
              <v-img
                aspect-ratio="1"
                cover
                alt="Avatar"
                :src="user.avatar && (serverUrl + user.avatar) || '/src/assets/noavatar.jpg'"
              ></v-img>
            </v-avatar>
          </v-btn>

          <h3>{{ user.nickname }}</h3>

          <p class="text-caption mt-1">
            {{ user.name }}
          </p>

          <v-divider class="my-3"></v-divider>

          <v-btn
            variant="text"
            rounded
            color="orange"
            to="/user/settings"
          >
            Настройки
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <v-btn
            variant="text"
            rounded
            color="orange"
            @click="logOut()"
          >
            Выйти
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script>
import { mapWritableState} from 'pinia'
import { useUserStore } from '../store/userStore'

export default {
  data() {
    return {
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user', 'isAuth']),
  },
  methods: {
    logOut() {
      this.user = {};
      this.isAuth = false;
      localStorage.setItem('token', '');
      this.$router.push('/login');
    }
  }
}
</script>
<style>
  
</style>