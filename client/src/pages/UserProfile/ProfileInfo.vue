<template>
  <div class="mt-8">
    <h1>О себе:</h1>
    <h3 class="mt-4">Имя: {{ checkingUserProfile.name }}</h3>
    <h3 class="mt-4">Фамилия: {{ checkingUserProfile.surname }}</h3>
    <h3 class="mt-4">Страна: {{ checkingUserProfile.country }}</h3>
    <h3 class="mt-4">О себе: {{ checkingUserProfile.info }}</h3>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import { useUserStore } from '../../store/userStore';

export default {
  computed: {
    ...mapState(useUserStore, ['checkingUserProfile']),
  }
}
</script>
<style>
  
</style>