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
      <v-btn 
        color="orange" 
        variant="outlined"
        prepend-icon="mdi-plus"
        to="/tracksEditor"
        class="mr-2"
      >
        Загрузить
      </v-btn>
  
      <v-btn 
        to="/basket"
        stacked
        class="mr-2"
      >
        <v-badge color="orange" :content="basketItems.length">
          <v-icon variant="text" icon="mdi-cart"/>
        </v-badge>
      </v-btn>

      <avatar-menu></avatar-menu>
    </div>
  </v-app-bar>
</template>
<script>
import { mapState } from 'pinia';
import { useUserStore } from '../store/userStore';
import { useCartStore } from '../store/cartStore';
import AvatarMenu from './AvatarMenu.vue';

export default {
  components: {
    AvatarMenu,
  },
  emits: ['updateDrawer'],
  computed: {
    ...mapState(useUserStore, ['isAuth']),
    ...mapState(useCartStore, ['basketItems']),
  }
}
</script>
<style>
  
</style>