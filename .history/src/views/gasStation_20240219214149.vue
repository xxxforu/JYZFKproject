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
      <!-- <el-skeleton :rows="5" animated /> -->
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="date" label="编号" width="120" />
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="location" label="地址" width="180" />
        <el-table-column v-if="isCentral" prop="belong" label="所属分公司" width="120" />
        <el-table-column prop="principal" label="负责人" width="180" />
        <el-table-column prop="tel" label="联系电话" width="180" />
        <el-table-column prop="action" label="操作" width="100" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <button id="addStation">
      新增
    </button>
  </div>
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
  margin: 3% 5% 0;
}
#addStation{
  float: right;
  margin-right: 5%;
  padding:2px 7px;
}
.countBox{
  padding: 10px 20px;
  border-radius: 5px;
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