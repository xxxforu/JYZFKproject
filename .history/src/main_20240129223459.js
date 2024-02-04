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
Vue.prototype.$axios =  axios
app.use(store).use(ElementPlus).use(router).mount('#app')
