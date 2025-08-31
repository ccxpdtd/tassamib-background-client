import { defineStore } from 'pinia'
import { myRoutes } from '../../router/routes'
import axios from 'axios'
import type { Users } from '../../type/user'

let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      myRoutes: myRoutes,

      users: [] as Users,
    }
  },
  actions: {
    //登录
    async login(data: any) {
      let res = await axios.post('http://localhost:9001/api/login', data)
      if (res.data.code === 200 && res.data.role === 'admin') {
        this.token = res.data.token
        this.username = res.data.username
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //获取用户信息
    async getUsers() {
      let res = await axios.get('http://localhost:9001/admin/get_user')
      if (res.data.code === 200) {
        this.users = res.data.data
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //添加用户
    async addUser(data: any) {
      let res = await axios.post('http://localhost:9001/admin/add_user', data)
      if (res.data.code === 200) {
        this.users = [...this.users, res.data.data]
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //删除用户
    async delUser(id: number) {
      let res = await axios.post('http://localhost:9001/admin/del_user', { id })
      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //更改权限
    async changeRole(data: any) {
      console.log(data);

      let res = await axios.post('http://localhost:9001/admin/change_role', data)
      console.log('res', res);

      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
  },
  getters: {

  }
})

export default useUserStore
