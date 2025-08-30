<!-- 顶部导航栏 -->
<template>
  <div>
    <div class="tabbar">
      <!-- 左侧 -->
      <div class="tabbar_left">
        <breadcrumb></breadcrumb>
      </div>
      <!-- 右侧 -->
      <div class="tabbar_right">
        <setting></setting>
      </div>

    </div>
  </div>
</template>

<script setup lang='ts'>
import breadcrumb from './breadcrumb/index.vue';
import setting from './setting/index.vue';
</script>

<style lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  position: absolute;

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>