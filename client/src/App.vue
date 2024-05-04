<template>
  <div v-if="isLoading">
    Загрузка...
  </div>

  <v-layout
    v-else
    class="rounded rounded-md flex-column"
  >
    <nav-bar
      @updateDrawer="drawer = !drawer"
    ></nav-bar>

    <nav-drawer :drawer="drawer"></nav-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
        <bottom-audio-sheet></bottom-audio-sheet>
        <track-licensec-dialog></track-licensec-dialog>
        <router-view></router-view>
      </v-main>
  
      <div v-if="isAudioBottomSheetOpen" style="height: 115px;"></div>
  </v-layout>
</template>
<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import BottomAudioSheet from './components/BottomAudioSheet.vue';
import NavBar from './components/NavBar.vue';
import NavDrawer from './components/NavDrawer.vue';
import TrackLicensecDialog from './components/Tracks/TrackLicenseDialog.vue';
import { useAudioPlayerStore } from './store/audioPlayerStore';
import { useUserStore } from './store/userStore';
import { useCartStore } from './store/cartStore';
import { check, getUser } from './http/userAPI';


export default {
  components: {
    NavBar,
    NavDrawer,
    BottomAudioSheet,
    TrackLicensecDialog
  },
  data() {
    return {
      drawer: true,
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useAudioPlayerStore, ['isAudioBottomSheetOpen']),
    ...mapWritableState(useUserStore, ['user', 'isAuth']),
  },
  methods: {
    ...mapActions(useCartStore, ['getAll']),
  },
  async created() {
    try {
      let userAfterCheck = await check();
      this.user = await getUser(userAfterCheck.id);
      await this.getAll();
      this.isAuth = true;
    } finally {
      this.isLoading = false;
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
.observer {
  height: 30px;
  margin: auto;
  text-align: center;
}
</style>
