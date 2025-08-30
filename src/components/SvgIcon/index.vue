<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix+name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">

defineProps({
  prefix:{
    type:String,
    default:'#icon-'
  },
  name:String,
  color:{
    type:String,
    defalt:''
  },
  width:String,
  height:String

  
})

</script>

<style>

</style>