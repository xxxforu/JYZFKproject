<script setup>
import { onMounted, ref } from 'vue';
var role = ref(localStorage.getItem('role'))
var havaRightToCheck = ref(true)
onMounted(()=>{
  if(role.value==1){
    havaRightToCheck.value=true
  }else if(role.value == 2){
    havaRightToCheck.value=true
  }else{
    havaRightToCheck.value=false
  }
})
</script>

<template>
  <div v-if="havaRightToCheck">
    <div class="top">
      <div class="countBox" v-if="role.value==1">管理分公司共计<span></span>个</div>
      <div class="countBox">管理加油站共计</div>
      <h5>加油站管理</h5>
    </div>
  </div>
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