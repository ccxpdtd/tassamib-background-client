import { defineStore } from "pinia";
import axios from 'axios'
const useArticleStore = defineStore('ArticleStore', {
  state: () => {
    return {
      articles: []
    }
  },
  actions: {
    async getArticles() {
      let res = await axios.get('http://localhost:9001/api/get_articles')
      if (res.data.code === 200) {
        this.articles = res.data.data
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async uploadArticle(data: any) {
      let res = await axios.post('http://localhost:9001/api/uploadArticle', data)
      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //删除文章
    async delArticle(id: number) {
      let res = await axios.post(`http://localhost:9001/api/delete_article/${id}`)
      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
  },


  getters: {}
})

export default useArticleStore
