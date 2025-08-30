//@ts-ignore
import router from "@/router"
//@ts-ignore
import nprogress from 'nprogress'
nprogress.configure({ showSpinner: false })

import settings from './settings'

import 'nprogress/nprogress.css'

// import Pinia from './store/index'
// import useUserStore from './store/modules/user'
// const userStore = useUserStore(Pinia)


router.beforeEach((to: any, from: any, next: any) => {

  nprogress.start()

  let token = localStorage.getItem('token')

  document.title = `${settings.logo.title} - ${to.meta.title}`

  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  }
  else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

})
router.afterEach((to: any, from: any) => {
  nprogress.done()

})