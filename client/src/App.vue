<template>
  <v-layout class="rounded rounded-md">
    <nav-bar
      @updateDrawer="drawer = !drawer"
    ></nav-bar>

    <v-navigation-drawer
      v-model="drawer"
    >
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      drawer: true,
    }
  }
}
</script>
<style>
  
</style>
