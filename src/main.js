// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'

const app = createApp(App)
app.use(VueDOMPurifyHTML);
app.mount('#app')