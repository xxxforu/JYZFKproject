<script setup>
import { onMounted } from 'vue';
var role = localStorage.getItem('role')
onMounted(()=>{
  
  console.log(role);
})
</script>

<template>
  <div>加油站管理</div>
</template>

<style scoped>

</style>