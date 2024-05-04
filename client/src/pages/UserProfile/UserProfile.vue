<template>
  <div v-if="isLoading">
    Загрузка...
  </div>

  <v-card
    v-else
    class="userProfile_card mt-6"
  >
    <template #prepend>
      <v-avatar size="250">
        <v-img
          aspect-ratio="1"
          cover
          :width="250"
          :src="serverUrl + checkingUserProfile.avatar || '/src/assets/noavatar.jpg'"
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
import { getUser } from '../../http/userAPI';
import { mapWritableState, mapActions } from 'pinia';
import { useUserStore } from '../../store/userStore';
import { useLicenseStore } from '../../store/licenseStore';

export default {
  data() {
    return {
      tab: 'info',
      isLoading: false,
      serverUrl: import.meta.env.VITE_API_URL,
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['checkingUserProfile'])
  },
  async created() {
    this.initCheckingUserProfile();
  },
  methods: {
    ...mapActions(useLicenseStore, ['getAll']),
    async initCheckingUserProfile() {
      try {
        this.isLoading = true
        this.checkingUserProfile = await getUser(this.$route.params.id);
        await this.getAll(this.checkingUserProfile.id);
      } catch (e) {
        alert(e.response.data.message);
      } finally {
        this.isLoading = false;
      }
    }
  },
  watch: {
    '$route.params.id': {
      async handler() {
        this.initCheckingUserProfile();
      }
    }
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