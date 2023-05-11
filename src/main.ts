import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import './style.css'
// import router from './router'

const app = createApp(App)

// app.use(createPinia()) //use pinia
// app.use(router) //use router
app.mount('#app')
