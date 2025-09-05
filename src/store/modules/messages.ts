import { defineStore } from 'pinia'
// import { myRoutes } from '../../router/routes'
import axios from 'axios'
import type { Messages } from '../../type/message'

let useMessageStore = defineStore('Message', {
  state: () => {
    return {
      messages: [] as Messages,
      comments: []
    }
  },
  actions: {
    async getMessages() {
      const res = await axios.get('/api/get_messages')

      console.log('getMessages_res', res);

      if (res.data.code === 200) {
        this.messages = res.data.data
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async delMessages(id: number) {
      const res = await axios.post('/api/delete_message', { id })

      console.log('delMessages_res', res);

      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async getComments() {
      const res = await axios.get('/api/get_comments')

      console.log('getComments_res', res);

      if (res.data.code === 200) {
        this.comments = res.data.data
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },

    async delComments(id: number) {

      const res = await axios.post('/api/delete_reply', { id })

      console.log('delComments_res', res);

      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },

    async searchUserOrMsg(key: string) {
      const res = await axios.post('/api/admin/search_messages', { key })

      console.log('searchUserOrMsg_res', res);

      if (res.data.code === 200) {
        this.messages = res.data.messages
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    }

  },



  getters: {}
})

export default useMessageStore
