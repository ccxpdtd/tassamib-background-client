import { createApp } from 'vue'
import './style.css'

import App from './App.vue'

// import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//注册全局组件
import gloablComponent from './components/index'
//@ts-ignore
import 'virtual:svg-icons-register'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from "./router/index"

import pinia from './store/index'

//@ts-ignore
import './permission'

const app = createApp(App)
app.use(gloablComponent)
app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})




app.mount('#app')
