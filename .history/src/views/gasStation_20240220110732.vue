<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
var isCentral = ref(true)
var tableData = ref([])
var branchNum = ref(0)
var stationNum = ref(0)
const dialogVisible = ref(false) //修改弹窗
const centerDialogVisible = ref(false) //删除弹窗
var deletePid = 0
const form = ref({
  pid:0,
  petrolName:"",
  petrolLocation:"",
  belongCompany:0,
  serviceTel:"",
  principal:""
})
const addForm = ref({
  petrolName:"",
  petrolLocation:"",
  belongCompany:Number,
  serviceTel:"",
  principal:""
})
const dialogMsg = ref({
  title:'',
  confirm:''
})
const getPList =()=>{
  axios.get('/central/petrolList').then(res=>{
      tableData.value = res.data.data.petrolList
      // tableData.value = tableData.value.concat(tableData.value)
      // tableData.value = tableData.value.concat(tableData.value)
      stationNum.value = res.data.data.petrolNum
    })
    axios.get('/central/companyList').then(res=>{
      branchNum.value = res.data.data.length
    })
}
onMounted(()=>{
  if(role==1){
    havaRightToCheck.value=true
    isCentral.value=true
    getPList()
    
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
const handleDelete = (index, row) => {
  console.log(index, row)
  deletePid = row.pid
  centerDialogVisible.value = true
}

// 修改加油站
const updatePetrol =()=>{
  dialogMsg.value.confirm="确认修改"
  dialogMsg.value.title="编辑加油站"
  dialogVisible.value = false,

  axios.put('/branch/updatePetrol',form.value).then(res=>{
    console.log(res);
    // 如果成功就提示
    if(res.data.code==0) ElMessage({
    message: '修改成功！',
    type: 'success',
  })
    
  })
}

// 删除加油站
const deletePetrol =()=>{
  centerDialogVisible.value = false
  axios.delete('/branch/deletePetrol/'+deletePid).then(res=>{
    console.log(res);
    if(res.data.code==0){
      getPList()
    }
  })
}

// 新增加油站
const addPetrol =()=>{
  dialogMsg.value.confirm="确认添加"
  dialogMsg.value.title="添加加油站"
  dialogVisible.value = false,

  axios.put('/branch/updatePetrol',form.value).then(res=>{
    console.log(res);
    // 如果成功就提示
    if(res.data.code==0) ElMessage({
    message: '修改成功！',
    type: 'success',
  })
    
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
    <button id="addStation" @click="dialogVisible= true">
      新增
    </button>

    <!-- 修改加油站资料的弹窗 -->
    <el-dialog
    v-model="dialogVisible"
    title="dialogMsg.title"
    width="500"
  >
  <el-form :model="form" label-width="auto" :label-position="left">
    <el-form-item label="编号">
      <el-input v-model="form.pid" />
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="form.petrolName" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="form.petrolLocation" />
    </el-form-item>
    <el-form-item label="所属分公司">
      <el-input v-model="form.belongCompany" />
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.serviceTel" />
    </el-form-item>
    <el-form-item label="负责人">
      <el-input v-model="form.principal" />
    </el-form-item>
  </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"  @click="updatePetrol">
          {{dialogMsg.value.confirm}}
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 删除加油站的弹窗 -->
  <el-dialog v-model="centerDialogVisible" title="提示" width="500" center>
    <span>
      您现在正在进行加油站删除操作，请问是否确认？
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deletePetrol">
          确认删除
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