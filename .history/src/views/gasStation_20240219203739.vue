<script setup>
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
var isCentral = ref(true)
onMounted(()=>{
  if(role==1){
    havaRightToCheck.value=true
    isCentral.value=true
  }else if(role == 2){
    havaRightToCheck.value=true
    isCentral.value=false
  }else{
    havaRightToCheck.value=false
    isCentral.value=false
  }
})
</script>

<template>
  <div v-if="havaRightToCheck">
    <div class="top">
      <div class="countBox" v-if="isCentral">管理分公司共计<br><span>12</span>    个</div>
      <div class="countBox">管理加油站共计<br><span>90</span>    个</div>
      <h3>加油站管理</h3>
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
.top{
  margin-top: 2%;
  display: flex;
  justify-content: space-around;
}
.countBox{
  padding: 10px;
  background-color: #fff;
}
.countBox>span{
  font-weight: bold;
  font-size: 24px;
}
</style>