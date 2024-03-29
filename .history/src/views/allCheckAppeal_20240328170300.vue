<!--总公司查看申诉列表页面-->
<script setup>

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
var role = localStorage.getItem('role')
var isCompany = ref(true)
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
  console.log(index,row);

  // router.push({
  //   path:'/main/violationDetail',
  //   query:{
  //     date:row.date,
  //     description:row.description,
  //     id:row.id,
  //     illegalType:row.illegalType,
  //     petrolName:row.petrolName,
  //     photo:row.photo,
  //     pid:row.pid,
  //     time:row.time
  //   }
  // })
}

axios.get('/central/getUnprocessedAppeal?page='+page.value+'&size=10').then(res=>{
  tableData.value = res.data.data.data
  lastPage.value=res.data.data.lastPage
  total.value=res.data.data.total
  console.log(res.data.data.data)
  console.log(total.value)
})

const formatter = (row, column, cellValue) => {
  //return row.illegalType=='1'?'是':'否'
  if(row.illegalBehaviorId =='1'){ return '打手机'}else if(row.illegalBehaviorId=='2'){return '违规收费'}else if(row.illegalBehaviorId =='3'){
    return '检修区不规范'
  }else{
    return '未戴安全帽'
  }

}
function handlePageChange(currentPage)
{
  page=currentPage
  console.log(currentPage)
}


</script>

<template>
  <h1 style="color:#6b9987;">待审核申诉</h1>
  <div style=" margin-left: 5%; margin-top: 10px; margin-bottom: 30px; color: #ffde59; text-align: left;">
  </div>
  <div  class="t_background">
    <div class="tmainBody">
      <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" style="width: 100%">
        <el-table-column prop="appealDate" label="申诉时间" align="center" />
        <el-table-column prop="pid" label="加油站" align="center" />
        <el-table-column prop="illegalBehaviorId" label="类型" align="center" :formatter="formatter"/>

        <el-table-column prop="links" label="" align="center" >
          <template #header>
            <!--              <el-input v-model="search" size="small" placeholder="Type to search" />-->
          </template>
          <template #default="scope">
            <!--              ！！链接-->
            <el-link  @click="handleClick(scope.$index, scope.row)">查看详情</el-link>
          </template>
        </el-table-column>

      </el-table>
      <!--    分页 -->
      <el-row>
        <el-col style="">
          <!--        <el-pagination-->
          <!--            :page-size="5"-->
          <!--            :pager-count="11"-->
          <!--            layout="prev, pager, next"-->
          <!--            :total="1000"-->
          <!--        />-->
          <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="total" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.t_background {
  width: 90%;
  background-color: #ffffff;
  margin-left: 5%;
}
.tmainBody {
  width: 80%;

  margin-left: 5%;
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
