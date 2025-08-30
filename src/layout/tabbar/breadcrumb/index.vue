<template>
  <!-- 左侧图标 -->
  <el-icon style="margin-right: 10px;" @click="handleMenu">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <el-icon style="margin:0px 7px;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang='ts'>
//@ts-ignore
import useLayoutSettingStore from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()
import { useRoute } from "vue-router";
const $route = useRoute()

const handleMenu = () => {
  // console.log('LayoutSettingStore.fold', LayoutSettingStore.fold);

  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

</script>

<style></style>