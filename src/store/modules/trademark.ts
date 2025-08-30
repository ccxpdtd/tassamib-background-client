/*
品牌管理小仓库
---发送请求：获取品牌数据
*/
import { defineStore } from 'pinia'
import axios from 'axios'

//获取品牌接口
const getBrand_url = "http://localhost:9003/brand/get"
//添加品牌接口
// const addBrand_url = "http://localhost:9003/brand/add"

const deleteBrand_url = "http://localhost:9003/brand/delete"

let useTradeMarkStore = defineStore('TradeMark', {
  state: () => {
    return {

    }
  },
  actions: {
    async getBrand(data: any) {
      const res = await axios.post(getBrand_url, data)
      return res.data
    },
    // async addBrand(data:any){
    //   const res = await axios.post(getBrand_url, data)

    // }
    async deleteBrand(data: any) {
      const res = await axios.post(deleteBrand_url, data)
      return res.data
    },
  },

})

export default useTradeMarkStore