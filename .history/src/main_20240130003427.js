import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/element/index.scss'
const app = createApp(App)
// for ([name, comp] of Object.entries(ElementPlusIconsVue)) {
//     app.component(name, comp);
//   }
Vue.prototype.$axios = axios
axios.defaults.baseURL='http://111.230.198.4:7001/api'
axios.defaults.headers.common['Authorization']=AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
app.use(store).use(ElementPlus).use(router).mount('#app')
