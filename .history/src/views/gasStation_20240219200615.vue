<script setup>
import { onMounted } from 'vue';


onMounted(()=>{
  const role = localStorage.getItem('role')
  console.log(role);
})
</script>

<template>
  <div>加油站管理</div>
</template>

<style scoped>

</style>