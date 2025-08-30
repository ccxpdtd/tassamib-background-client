<template>
  <div class="home_logo" v-if="settings.logo.logoHidden">
    <!-- <img :src="settings.logo.src" alt=""></img> -->
    <p>{{ settings.logo.title }}</p>
  </div>
</template>

<script setup lang='ts'>
import settings from '../../settings.ts';


</script>

<style lang="scss">
.home_logo {
  width: 100%;
  height: $home-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: 19px;
    margin-left: 10px;

    font-weight: 600px;
    white-space: nowrap;
  }
}
</style>