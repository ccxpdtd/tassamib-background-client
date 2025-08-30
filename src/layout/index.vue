<!-- layout主页 -->
<template>
  <div class="home_container">
    <!-- 侧边栏 -->
    <div class="home_slider" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <logo />
      <el-scrollbar class="home_slider_scrollbar">
        <el-menu :default-active="$route.path" background-color="rgb(7, 59, 76)" text-color="white">
          <myMenu :myRoutes="userStore.myRoutes"></myMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="home_tabbar" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <tabbar></tabbar>
    </div>
    <!-- 内容展示区 -->
    <div class="home_main" :class="{ fold: LayoutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang='ts'>
import logo from './logo/index.vue';
import myMenu from './myMenu/index.vue';
import Main from '../layout/main/index.vue';
import tabbar from '../layout/tabbar/index.vue';

import useUserStore from '../store/modules/user'
const userStore = useUserStore()
//@ts-ignore
import useLayoutSettingStore from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()

import { useRoute } from "vue-router";
const $route = useRoute()
</script>

<style lang="scss">
.home_container {
  width: 100%;
  height: 100vh;

  .home_slider {
    width: $home-slider-width;
    height: 100vh;
    background-color: $home-slider-bg;
    color: white;
    transition: all 0.2s;

    .home_slider_scrollbar {
      height: calc(100vh - $home-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $home-slider-min-width
    }

  }

  .home_tabbar {
    position: absolute;
    top: 0;
    left: $home-slider-width;

    width: calc(100% - $home-slider-width);
    height: $home-tabbar-height;

    background-color: $home-tabbar-bg;

    transition: all 0.2s;

    &.fold {
      left: $home-slider-min-width;
      width: calc(100% - $home-slider-min-width);
    }
  }

  .home_main {
    position: absolute;
    top: $home-tabbar-height;
    left: $home-slider-width;

    width: calc(100vw - $home-slider-width);
    height: calc(100vh - $home-tabbar-height);

    background-color: $home-main-bg;

    overflow: auto;

    transition: all 0.2s;

    &.fold {
      left: $home-slider-min-width;
      width: calc(100% - $home-slider-min-width);
    }
  }
}
</style>