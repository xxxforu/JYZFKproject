<!--加油站查看申诉列表-->
<script setup>

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
// var role = localStorage.getItem('role')
// var isCompany = ref(true)
var lastPage = ref(0)
var total = ref(0)
var page=ref(1)



// //查看详情信息
// const form = ref({
//   id:0,
//   pid:0,
//   petrolName:'',
//   photo:'',
//   illegalType:0,//1:打手机 2： 3：油罐区检修不规范 4？
//   description:'',
//   date:'',
//   time:'',
// })

var tableData = ref([])
const router = useRouter()

function handleClick(index,row) {
  // console.log(index,row);
  router.push({
    path:'/main/violationDetail',
    query:{
      date:row.date,
      description:row.description,
      id:row.id,
      illegalType:row.illegalType,
      petrolName:row.petrolName,
      photo:row.photo,
      pid:row.pid,
      time:row.time
    }
  })
}

axios.get('/petrol/getAppealResult?page='+page.value+'&size=10').then(res=>{
  tableData.value = res.data.data.data
  lastPage.value=res.data.data.lastPage
  total.value=res.data.data.total
  console.log("qwerty")
  console.log(total.value)

}).catch(error=>{
  if (error.respond){
    console.log(error.respond.data);
  } else if (error.request){
    console.log(error.request);
  }else {
    console.log('Error',error.message)
  }

})

const formatter = (row, column, cellValue) => {
  //return row.illegalType=='1'?'是':'否'
  if(row.illegalBehaviorId =='1'){ return '打手机'}else if(row.illegalBehaviorId=='2'){return '未正确摆放护栏'}else if(row.illegalBehaviorId =='3'){
    return '登高未戴安全帽'
  }else if(row.illegalBehaviorId=='4'){
    return '火灾'
  }else{
    return '卸油区有人'
  }
}
const formatterResult = (row, column, cellValue) => {
  //return row.illegalType=='1'?'是':'否'
  if(row.status =='1'){
    return '待审核'
  }else {
    return row.agree=='1'?'已通过':'未通过'
  }
}

function handlePageChange(currentPage)
{
  page=currentPage
  console.log(currentPage)

}

function goToFile(props){
  console.log(props);
        window.open(props.provePhoto,'_blank')
    }

</script>

<template>
  <h1 style="color:#6b9987;">我的申诉</h1>
  <div style=" margin-left: 5%; margin-top: 10px; margin-bottom: 30px; color: #ffde59; text-align: left;">
  </div>
  <div  class="t_background">
    <div class="tmainBody">
      <el-table stripe  :data="tableData" :header-cell-style="{'text-align':'center'}" style="width: 100%">
        <el-table-column prop="happenDatetime" label="违规时间" align="center" />
        <el-table-column prop="appealDate" label="申诉时间" align="center" />
        <el-table-column prop="illegalType" label="类型" align="center" />
        <el-table-column prop="description" label="申诉内容" align="center" />
        <el-table-column prop="provePhoto" label="申述附件" align="center">
          <template #default="scope">
            <p id="link" @click="goToFile(scope.row)">点击跳转查看附件</p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="申诉结果" align="center" :formatter="formatterResult"/>
        <el-table-column prop="comment" label="总公司意见" align="center" />

      </el-table>
      <!--    分页 -->
      <el-row>
        <el-col style="">
          <!--        <el-pagination-->
          <!--                        :page-size="10"-->
          <!--            :pager-count="11"-->
          <!--            layout="prev, pager, next"-->
          <!--            :total="1000"-->
          <!--        />-->
          <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="total" :page-size="10" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
#link{
  color: var(--el-color-primary);
  text-decoration: underline;
}
.t_background {
  width: 90%;
  background-color: #ffffff;
  margin-left: 5%;
}
.tmainBody {
  width: 95%;
  /*justify-content: center;*/
  /*margin: auto;*/
}
.tmainBody >>> .el-table__row>td{
  /* 去除表格线 */
  border: none;
}
/*.tmainBody >>> .el-table th.is-leaf {*/
/*  !* 去除上边框 *!*/
/*  border: none;*/
/*}*/


</style>
