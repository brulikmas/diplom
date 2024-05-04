<template>
  <div class="mt-6">
    <h1>Баланс: {{ isLoading ? 'Загрузка...' : `${balance} ₽` }}</h1>
    <v-btn
      color="orange"
      class="mt-4"
    >
      Вывести средства
    </v-btn>
  </div>
</template>
<script>
import { getBalance } from '../../http/userAPI';

export default {
  data() {
    return {
      balance: null,
      isLoading: false,
    }
  },
  async created() {
    try {
      this.isLoading = true;
      this.balance = (await getBalance()).balance;
    } catch (e) {
      alert(e);
    } finally {
      this.isLoading = false;
    }
  }  
}
</script>
<style>
  
</style>