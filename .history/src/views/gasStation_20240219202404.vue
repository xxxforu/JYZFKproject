<script setup>
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
onMounted(()=>{
  if(role==1){
    havaRightToCheck.value=false
  }else if(role == 2){
    havaRightToCheck.value=true
  }else{
    havaRightToCheck.value=false
  }
})
</script>

<template>
  <div v-if="havaRightToCheck">加油站管理</div>
  <div id="block" v-else>
    <el-empty description="您无须填写该内容" />
  </div>
</template>

<style scoped>
#block{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>