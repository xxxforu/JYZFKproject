import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import scroll from 'vue-seamless-scroll'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/element/index.scss'
const app = createApp(App)
    // for ([name, comp] of Object.entries(ElementPlusIconsVue)) {
    //     app.component(name, comp);
    //   }


app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = 'https://ps.gwcampus.cn/api'
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
app.use(store).use(ElementPlus).use(router).use(scroll).mount('#app')