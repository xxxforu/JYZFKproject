<script setup>
import { onMounted } from 'vue';
onMounted(()=>{
  console.log(route.params);
})
</script>

<template>
  <h1 id="title">违规行为详情</h1>
</template>

<style scoped>
#title{
  margin-top: 10px;
  color: var(--el-color-primary);
}
</style>