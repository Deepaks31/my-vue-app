import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0f4f9a', // Qualys Blue
          secondary: '#f8f9fa',
          accent: '#1890ff',
          error: '#e63946', // Critical
          warning: '#f4a261', // High
          info: '#e9c46a', // Medium
          success: '#2a9d8f', // Low
          background: '#f1f5f9',
          surface: '#ffffff'
        }
      }
    }
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
