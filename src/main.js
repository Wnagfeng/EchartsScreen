import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import datav from 'echarts-screen-libs'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/visualMap'
const app = createApp(App)
app.use(pinia)
app.use(datav)
app.use(router)
app.mount('#app')
