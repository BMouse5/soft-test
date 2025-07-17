import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import naive from 'naive-ui'

const pinia = createPinia()

createApp(App).use(pinia).use(naive).mount('#app')
