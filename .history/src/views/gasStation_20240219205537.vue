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
  <div id="block" v-if="havaRightToCheck">
    <div class="top">
      <div class="countBox" v-if="isCentral">管理分公司共计<br><span>12</span>    个</div>
      <div class="countBox">管理加油站共计<br><span>90</span>    个</div>
      <h3>加油站管理</h3>
    </div>
    <div class="listBox">
      <el-skeleton :rows="5" animated />
    </div>
  </div>
  <div id="lock" v-else>
    <el-empty description="您无须填写该内容" />
  </div>
</template>

<style scoped>
#block{
  width: 100%;
  height: 100%;
  background-color: #f4f3f3;
}
#lock{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top{
  padding-top: 2%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.listBox{
  background-color: #fff;
  padding: 20px;
  max-height: 75%;
  height: 70%;
  margin: 5% 5% 5%;
}
.countBox{
  padding: 10px;
  background-color: #fff;
}
h3{
  text-align: center;
  font-size: 26px;
  color: var(--el-color-primary);
}
.countBox>span{
  font-weight: bold;
  font-size: 24px;
}
</style>