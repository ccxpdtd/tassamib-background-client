<!-- 侧边导航栏 -->
<template>
  <div>

    <template v-for="item in myRoutes" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRouter">
          <template #title>
            <el-icon style="margin-right:0.5em;">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有一个子路由 -->

      <template v-if="item.children && item.children.length == 1">
        <el-menu-item v-if="!item.meta.hidden" :index="item.children[0].path" @click="goRouter">
          <template #title>
            <el-icon style="margin-right:0.5em;">
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有多个子路由 -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <template #title>
          <el-icon style="margin-right:0.5em;">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <myMenu :myRoutes="item.children"></myMenu>

      </el-sub-menu>
    </template>


  </div>
</template>

<script setup lang='ts'>
import { useRouter } from "vue-router"
defineProps(['myRoutes'])
defineOptions({
  name: 'myMenu'
})
const $router = useRouter()
const goRouter = (vc: any) => {
  $router.push(vc.index)
}
</script>

<style></style>