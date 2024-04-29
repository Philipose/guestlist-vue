// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';


const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app')