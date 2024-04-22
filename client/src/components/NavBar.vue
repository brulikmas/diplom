<template>
    <v-app-bar>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="$emit('updateDrawer')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <router-link 
        style="text-decoration: none; color: orange"
        to="/tracks"
      >
        <v-icon icon="mdi-music"/>
        BeatsRu
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <div v-if="!isAuth">
      <v-btn 
        class="mr-2" 
        variant="outlined"
        color="orange"
        to="/login"
      >
        Войти
      </v-btn>
  
      <v-btn 
        class="mr-2" 
        variant="outlined"
        to="/register"
      >
        Регистрация
      </v-btn>
    </div>

    <div v-else>
      <v-btn color="orange" variant="outlined">Загрузить</v-btn>
  
      <v-btn stacked>
        <v-badge color="orange" content="9">
          <v-icon icon="mdi-cart"/>
        </v-badge>
      </v-btn>

      <v-btn icon="mdi-account"></v-btn>
    </div>
  </v-app-bar>
</template>
<script>
import { mapState } from 'pinia';
import { useUserStore } from '../store/userStore';

export default {
  emits: ['updateDrawer'],
  computed: {
    ...mapState(useUserStore, ['isAuth']),
  }
}
</script>
<style>
  
</style>