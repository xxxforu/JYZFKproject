<script setup>
import { onMounted } from 'vue';

console.log(role);
onMounted(()=>{
  const role = localStorage.getItem(role)
})
</script>

<template>
  <div>加油站管理</div>
</template>

<style scoped>

</style>