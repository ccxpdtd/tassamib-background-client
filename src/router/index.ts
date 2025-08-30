import { createRouter, createWebHashHistory } from 'vue-router'
import { myRoutes } from './routes'


const router = createRouter({
  history: createWebHashHistory(),
  routes: myRoutes
})

export default router