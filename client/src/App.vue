<template>
  <v-layout class="rounded rounded-md">
    <nav-bar
      @updateDrawer="drawer = !drawer"
    ></nav-bar>

    <nav-drawer :drawer="drawer"></nav-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
<script>
import NavBar from './components/NavBar.vue';
import NavDrawer from './components/NavDrawer.vue';

export default {
  components: {
    NavBar,
    NavDrawer,
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
