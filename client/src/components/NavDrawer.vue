<template>
    <v-navigation-drawer
      :model-value="drawer"
    >
      <v-list lines="two">
        <v-list-item
          prepend-icon="mdi-home"
          to="/tracks"
        >
          Главная
        </v-list-item>
        
        <v-divider></v-divider>

        <div v-if="isAuth && user?.role === 'BEATMAKER'">
          <v-list-subheader>Студия</v-list-subheader>
  
          <v-list-item
            prepend-icon="mdi-music-note-plus"
            to="/tracksEditor"
          >
            Редактор
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-text-box-multiple-outline"
            to="/licenses"
          >
            Лицензии
          </v-list-item>
        </div>


        <div v-if="isAuth">
          <v-list-subheader>Аккаунт</v-list-subheader>
  
          <v-list-item
            v-if="user?.role === 'BEATMAKER'"
            prepend-icon="mdi-currency-usd"
            to="/user/balance"
          >
            Баланс
          </v-list-item>
  
          <v-list-item
            prepend-icon="mdi-cart-check"
            to="/user/purchase"
          >
            Покупки
          </v-list-item>
  
          <v-list-item
            prepend-icon="mdi-cog-outline"
            to="/user/settings"
          >
            Настройки
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { useUserStore } from '../store/userStore';
import { mapState } from 'pinia';

export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    ...mapState(useUserStore, ['isAuth', 'user'])
  }
}
</script>
<style scoped>
.v-list-item:hover, .v-list-item--active {
  color: orange;
}
</style>