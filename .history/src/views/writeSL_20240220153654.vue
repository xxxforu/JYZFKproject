<script setup>
// import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
onMounted(()=>{
  if(role==3){
    havaRightToCheck.value=true
    isCentral.value=true
    getPList()
    
  }else{
    havaRightToCheck.value=false
    isCentral.value=false
  }
})
</script>

<template>
  <div id="block" v-if="havaRightToCheck">填写安全日志</div>
  <div id="lock" v-else>
    <el-empty description="您无须填写该内容" />
  </div>
</template>

<style scoped>
#block{
  overflow-y: auto;
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
</style>