import { defineStore } from "pinia";
import axios from 'axios'
import type { Article } from '../../type/article'
const useArticleStore = defineStore('ArticleStore', {
  state: () => {
    return {
      articles: [] as Article[],
      article: {} as Article
    }
  },
  actions: {
    async getArticles() {
      let res = await axios.get('/api/get_articles')
      console.log('getArticles_res', res);
      if (res.data.code === 200) {
        this.articles = res.data.data
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async getArticle(id: any) {
      let res = await axios.get(`/api/get_article/${id}`)
      console.log('getArticle_res', res);
      if (res.data.code === 200) {
        this.article = res.data.content
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    async uploadArticle(data: any) {
      let res = await axios.post('/api/uploadArticle', data)
      console.log('uploadArticle_res', res);
      if (res.data.code === 200) {
        //上传之后及时更新pinia的articles，以便后续再次上传时查重
        this.getArticles()
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //删除文章
    async delArticle(id: number) {
      let res = await axios.post(`/api/delete_article/${id}`)
      console.log('delArticle_res', res);
      if (res.data.code === 200) {
        return 'ok'
      }
      else {
        return Promise.reject(new Error(res.data.msg))
      }
    },
    //检查是否有同名文章
    checkArticle(title: string) {
      return this.articles.find(article => article.title === title)?.id
    }
  },


  getters: {}
})

export default useArticleStore
