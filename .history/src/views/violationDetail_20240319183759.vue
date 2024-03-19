<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
var route  = useRoute()
onMounted(()=>{
  console.log(route.query.data);
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