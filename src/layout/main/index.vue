<!--  -->
<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang='ts'>
//@ts-ignore
import useLayoutSettingStore from '@/store/modules/setting'
let LayoutSettingStore = useLayoutSettingStore()



import { watch, ref, nextTick } from 'vue'
let flag = ref(true)
watch(() => LayoutSettingStore.refresh, () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })

})
</script>

<style>
.main {
  padding: 20px;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0)
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1)
}
</style>