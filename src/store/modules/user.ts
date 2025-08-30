import { defineStore } from 'pinia'
import { myRoutes } from '../../router/routes'
import axios from 'axios'

let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      myRoutes: myRoutes
    }
  },
  actions: {
    async login(data: any) {
      let res = await axios.post('http://localhost:9001/api/login', data)
      if (res.data.code === 200 && res.data.role === 'admin') {
        this.token = res.data.token
        localStorage.setItem('token', res.data.token)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    }
  },
  getters: {

  }
})

export default useUserStore
