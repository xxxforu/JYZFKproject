<script setup>
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
onMounted(()=>{
  if(role==1){
    havaRightToCheck.value=false
  }else if(role == 2){

  }else{
    havaRightToCheck.value=false
  }
})
</script>

<template>
  <div v-if="havaRightToCheck">加油站管理</div>
  <div v-else></div>
</template>

<style scoped>

</style>