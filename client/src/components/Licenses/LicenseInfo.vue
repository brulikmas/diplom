<template>
  <v-list
    class="d-flex flex-column flex-wrap"
    style="height: 180px;"
  >
    <v-list-item 
      v-for="v in info"
      :key="v.title"
    >
      <template #prepend>
        <v-icon
          :icon="v.value ? 'mdi-check' : 'mdi-close'"
          :color="v.value ? 'green' : 'red'"
        >
        </v-icon>
      </template>

      <v-list-item-title>
        {{ v.title }}: {{ getValue(v.value) }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      titleTypesRussian: {
        base: 'Базовая',
        premium: 'Премиум',
        exclusive: 'Эксклюзив'
      },
      info: [ 
        {
          title: 'Тип лицензии',
          value: '',
        },
        {
          title: 'Аудио-стримы',
          value: this.license.count_streams,
        },
        {
          title: 'Количество копий',
          value: this.license.count_copies,
        },
        {
          title: 'Видео-стримы',
          value: this.license.count_video_streams,
        },
        {
          title: 'Количество выступлений',
          value: this.license.count_performances,
        },
    ],
    }
  },
  created() {
    this.info[0].value = this.titleTypesRussian[this.license.type];
  },
  props: {
    license: {
      type: Object,
      default: null,
    }
  },
  methods: {
    getValue(value) {
      if (this.license.type === 'exclusive' && value !== 'Эксклюзив') {
        return '∞'
      }

      return value || 0;
    }
  }
}
</script>
<style>
  
</style>