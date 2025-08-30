<template>
  <!-- 右侧按钮和头像 -->
  <el-button circle icon="Refresh" size="small" @click="handleRefresh"></el-button>
  <el-button circle icon="FullScreen" size="small" @click="handleFullScreen"></el-button>
  <el-button circle icon="Setting" size="small"></el-button>
  <img src="../../../../public/avatar.jpg" style="width:24px;height:24px;margin:0px 10px;border-radius:50%;"></img>
  <!-- 右侧下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang='ts'>
//@ts-ignore
import useLayoutSettingStore from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()
import { useRouter, useRoute } from "vue-router"
const $router = useRouter()
const $route = useRoute()
//当点击刷新时更改刷新状态
const handleRefresh = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}

const handleFullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

const handleLogOut = () => {
  localStorage.removeItem('token')
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style></style>