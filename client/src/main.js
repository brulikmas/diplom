import { createApp } from 'vue'
import App from './App.vue'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { useUserStore } from './store/userStore'
import { jwtDecode } from 'jwt-decode'

//Pinia
import { createPinia } from 'pinia'

//Router
import router from './router/router'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');

    if (!token) {
      next({ name: 'login' })
    } else {
      let user = jwtDecode(token);

      if (to.matched.some(record => record.meta.isBeatmaker)) {
        if (user.role === "BEATMAKER") {
          next();
        } else {
          next({ name: 'tracks' });
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark'
  }
});

const pinia = createPinia()

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
