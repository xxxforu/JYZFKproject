<script setup>
import axios from 'axios';
import { ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
var isCentral = ref(true)
var tableData = ref([])
var branchNum = ref(0)
var stationNum = ref(0)
const dialogVisible = ref(false)
onMounted(()=>{
  if(role==1){
    havaRightToCheck.value=true
    isCentral.value=true
    axios.get('/central/petrolList').then(res=>{
      tableData.value = res.data.data.petrolList
      // tableData.value = tableData.value.concat(tableData.value)
      // tableData.value = tableData.value.concat(tableData.value)
      stationNum.value = res.data.data.petrolNum
    })
    axios.get('/central/companyList').then(res=>{
      branchNum.value = res.data.data.length
    })
    
  }else if(role == 2){
    havaRightToCheck.value=true
    isCentral.value=false
    axios.get('/branch/petrolList').then(res=>{
      tableData.value = res.data.data.petrolList
      stationNum.value = res.data.data.petrolNum
    })
  }else{
    havaRightToCheck.value=false
    isCentral.value=false
  }
})
const handleEdit = (index, row) => {
  console.log(index, row)
  dialogVisible.value = true
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const handleClose = () => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      console.log(11);
    })
    .catch(() => {
      // catch error
    })
}
</script>

<template>
  <div id="block" v-if="havaRightToCheck">
    <div class="top">
      <div class="countBox" v-if="isCentral">管理分公司共计<br><span>{{branchNum}}</span>    个</div>
      <div class="countBox">管理加油站共计<br><span>{{stationNum}}</span>    个</div>
      <h3>加油站管理</h3>
    </div>
    <div class="listBox">
      <!-- <el-skeleton :rows="5" animated /> -->
      <el-table stripe :data="tableData" style="width: 100%;height:100%">
        <el-table-column prop="pid" label="编号" width="120" />
        <el-table-column prop="petrolName" label="名称" width="120" />
        <el-table-column prop="petrolLocation" label="地址" width="180" />
        <el-table-column v-if="isCentral" prop="belongCompany" label="所属分公司" width="120" />
        <el-table-column prop="principal" label="负责人" width="120" />
        <el-table-column prop="serviceTel" label="联系电话" width="180" />
        <el-table-column prop="action" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
        </el-table-column>
      </el-table>
    </div>
    <button id="addStation">
      新增
    </button>
    <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
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
  padding: 20px 40px;
  max-height: 75%;
  height: 70%;
  margin: 3% auto 0;
  width:fit-content;
}
#addStation{
  float: right;
  margin-right: 5%;
  padding:2px 7px;
}
.listBox .el-table__header{
  background-color: aqua !important;
}
.countBox {
  padding: 15px 30px;
  border-radius: 5px;
  background-color: #fff;
}
h3{
  text-align: center;
  font-size: 30px;
  color: var(--el-color-primary);
}
.countBox>span{
  font-weight: bold;
  font-size: 24px;
}
</style>