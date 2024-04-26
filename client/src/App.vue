<template>
  <v-layout class="rounded rounded-md">
    <nav-bar
      @updateDrawer="drawer = !drawer"
    ></nav-bar>

    <nav-drawer :drawer="drawer"></nav-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <bottom-audio-sheet></bottom-audio-sheet>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
<script>
import BottomAudioSheet from './components/BottomAudioSheet.vue';
import NavBar from './components/NavBar.vue';
import NavDrawer from './components/NavDrawer.vue';

export default {
  components: {
    NavBar,
    NavDrawer,
    BottomAudioSheet
  },
  data() {
    return {
      drawer: true,
    }
  }
}
</script>
<style>
html {
  overflow-y: auto !important;
}
.link {
  text-decoration: none;
  color: inherit;
}
.link:hover {
  text-decoration: underline;
}
</style>
