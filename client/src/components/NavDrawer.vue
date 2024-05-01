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

        <v-list-subheader>Аккаунт</v-list-subheader>

        <v-list-item
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
          Найстройки
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    }
  }
}
</script>
<style scoped>
.v-list-item:hover, .v-list-item--active {
  color: orange;
}
</style>