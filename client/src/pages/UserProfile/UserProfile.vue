<template>
  <v-card
    class="userProfile_card mt-6"
  >
    <template #prepend>
      <v-avatar size="250">
        <v-img
          aspect-ratio="1"
          cover
          :width="250"
          :src="checkingUserProfile.avatar || '/src/assets/noavatar.jpg'"
          rounded="lg"
        ></v-img>
      </v-avatar>

      <div class="d-flex flex-column justify-space-between ml-4 mt-2">
        <div>
          <v-card-title>
            <h2>Битмейкер</h2>
            <h3>{{ checkingUserProfile.nickname }}</h3>
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
        v-model="tab"
      >
        <v-tab 
          :to="`/userProfile/${checkingUserProfile.id}/info`" 
          value="info"
        >
          Инфо
        </v-tab>
        <v-tab 
          :to="`/userProfile/${checkingUserProfile.id}/tracks`" 
          value="tracks"
        >
          Треки
        </v-tab>
        <v-tab 
          :to="`/userProfile/${checkingUserProfile.id}/licenses`" 
          value="licenses"
        >
          Лицензии
        </v-tab>
      </v-tabs>
      
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>
<script>
import { useTrackStore } from '../../store/trackStore';
import { useUserStore } from '../../store/userStore';
import { mapState, mapActions } from 'pinia';
export default {
  data() {
    return {
      tab: 'info',
    }
  },
  computed: {
    ...mapState(useUserStore, ['checkingUserProfile']),
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
.userProfile_card {
  width: 95%;
  height: 100%;
}
</style>