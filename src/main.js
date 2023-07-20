import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

if (window.location.pathname.endsWith('/index.html')) {
  window.location.pathname = window.location.pathname.replace(/index.html$/, '')
} else {
  const app = createApp(App)

  app.use(router)

  app.mount('#app')
}
