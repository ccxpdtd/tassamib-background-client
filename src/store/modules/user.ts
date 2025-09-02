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
      userTotal: 0,
      user: {},
    }
  },
  actions: {
    //登录
    async login(data: any) {
      let res = await axios.post('http://localhost:9001/api/login', data)

      console.log('login_res', res);

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
    async getUsers(payload: any) {

      let res = await axios.post('/api/admin/get_user', payload)

      console.log('getUsers_res', res);

      if (res.data.code === 200) {
        this.users = res.data.data.user
        this.userTotal = res.data.data.total
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //添加用户
    async addUser(data: any) {
      let res = await axios.post('/api/admin/add_user', data)

      console.log('addUser', res);

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
      let res = await axios.post('/api/admin/del_user', { id })

      console.log('delUser_res', res);

      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //更改权限
    async changeRole(data: any) {

      let res = await axios.post('/api/admin/change_role', data)
      console.log('changeRole_res', res);

      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async searchUser(data: any) {

      let res = await axios.post('/api/admin/search_user', data)

      console.log('searchUser_res', res);

      if (res.data.code === 200) {

        this.users = res.data.user
        this.userTotal = res.data.total

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
