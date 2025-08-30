//首页侧边栏的展开/收纳
import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore('LayoutSettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false
    }
  },
  actions: {},
  getters: {}
})

export default useLayoutSettingStore
