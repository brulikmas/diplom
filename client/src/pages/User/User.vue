<template>
  <v-card
    class="user_card mt-6"
  >
    <template #prepend>
      <v-avatar size="50">
        <v-img
          aspect-ratio="1"
          cover
          :width="250"
          :src="user.avatar || '/src/assets/noavatar.jpg'"
          rounded="lg"
        ></v-img>
      </v-avatar>

      <div class="d-flex flex-column justify-space-between ml-4 mt-2">
        <div>
          <v-card-title>
            <h2>Аккаунт</h2>
          </v-card-title>
        </div>
      </div>
    </template>

    <v-card-text class="mt-6">
      <v-divider
        class="mb-6"
        color="orange"
        thickness="2"
      ></v-divider>

      <v-tabs
        v-model="userTab"
      >
        <v-tab 
          to="/user/balance" 
          value="balance"
        >
          Баланс
        </v-tab>
        <v-tab 
          to="/user/purchase" 
          value="purchase"
        >
          Покупки
        </v-tab>
        <v-tab 
          to="/user/settings" 
          value="settings"
        >
          Настройки
        </v-tab>
      </v-tabs>
      
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>
<script>
import { useTrackStore } from '../../store/trackStore';
import { useUserStore } from '../../store/userStore';
import { mapState, mapActions, mapWritableState } from 'pinia';

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapWritableState(useUserStore, ['userTab']),
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.v-card-text p {
  margin-top: 8px;
  font-size: large;
  font-weight: 500;
}
:deep(.v-card-item__prepend) {
  align-items: stretch !important;
  
}
.user_card {
  width: 95%;
  height: 100%;
}
</style>