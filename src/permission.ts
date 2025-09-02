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


router.beforeEach((_to: any, _from: any, _next: any) => {

  nprogress.start()

  let token = localStorage.getItem('token')

  document.title = `${settings.logo.title} - ${_to.meta.title}`

  if (token) {
    if (_to.path == '/login') {
      _next({ path: '/' })
    } else {
      _next()
    }
  }
  else {
    if (_to.path == '/login') {
      _next()
    } else {
      _next({ path: '/login', query: { redirect: _to.path } })
    }
  }

})
router.afterEach((_to: any, _from: any) => {
  nprogress.done()

})