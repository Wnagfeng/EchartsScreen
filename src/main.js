import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import datav from 'echarts-screen-libs'
createApp(App).use(datav).use(router).mount('#app')
