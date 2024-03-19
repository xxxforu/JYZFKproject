<!--违规行为一览_列表查看-->
<script setup>

import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
var role = localStorage.getItem('role')
var isCompany = ref(true)
var lastPage = ref(0)
var total = ref(0)
var page=ref(1)



//查看详情信息
const form = ref({
  id:0,
  pid:0,
  petrolName:'',
  photo:'',
  illegalType:0,//1:打手机 2： 3：油罐区检修不规范 4？
  description:'',
  date:'',
  time:'',
})

var tableData = ref([])
// const getBList =()=>{ //总公司全部数据
//   axios.get('/central/getPetrolIllegalBehaviorList?page=1&size=2').then(res=>{
//     tableData.value=res.data.data
//     // // console.log(res.data.data.)
//     // console.log(res.data)
//     // console.log(tableData.value)
//     // console.log(tableData.value.data.pid)
//     // console.log('ttsddf')
//
//   })
// }

const value = ref('所有加油站（默认）')
const options = [
  {
    value: 'All',
    label: '所有加油站',
  },
  {
    value: 'Option2',
    label: '加油站1',
  },
  {
    value: 'Option3',
    label: '加油站2',
  },
  {
    value: 'Option4',
    label: '加油站3',
  },
  {
    value: 'Option5',
    label: '加油站4',
  },
]

//
const valueb = ref('最近七天')
const optionb = [
  {
    value: '7',
    label: '最近七天',
  },
  {
    value: 'today',
    label: '今日',
  },
  {
    value: 'Option3',
    label: 'xxx',
  },
  {
    value: 'Option4',
    label: 'xxx',
  },
]


const router = useRouter()
// function eventOut() {
//   router.push({
//     path:'/main/visualSL'
//   })
// }
function handleClick(index,row) {
  // console.log(index,row);
  router.push({
    path:'/main/violationDetail',
    query:{
      date:row.data,
      description:row.description,
      id:row.id
    }
  })
}
onMounted(()=>{
  if(role==1){
    isCompany.value=true
    //getBList()
    axios.get('/central/getPetrolIllegalBehaviorList?page='+page.value+'&size=2').then(res=>{
      tableData.value = res.data.data.data
      lastPage.value=res.data.data.lastPage
      total.value=res.data.data.total
      console.log(total.value)
    })
  }else if(role==2){
    isCompany.value=true
    axios.get('/branch/getPetrolIllegalBehaviorList?page='+page.value+'&size=2').then(res=>{
      tableData.value = res.data.data.data
      lastPage.value=res.data.data.lastPage
      total.value=res.data.data.total
      console.log("qwerty")
      console.log(tableData.value)
      console.log("qwerty")
      console.log(tableData.value)
      console.log(tableData.value.pid)
      console.log(res.data.data)
      console.log(total.value)
    })
  }else {//某加油站
    isCompany.value=false
    axios.get('/petrol/getPetrolIllegalBehaviorList?page='+page.value+'&size=10').then(res=>{
      tableData.value = res.data.data.data
      lastPage.value=res.data.data.lastPage
      total.value=res.data.data.total
      console.log("qwerty")
      console.log(tableData.value)
      console.log(tableData.value.pid)
      console.log(res.data.data)
      console.log(total.value)
      console.log(page.value)
    })
  }
})
const formatter = (row, column, cellValue) => {
  //return row.illegalType=='1'?'是':'否'
  if(row.illegalType=='1'){ return '打手机'}else if(row.illegalType=='2'){return '违规收费'}else if(row.illegalType=='3'){
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
<!--  ！总分公司页面-->
  <div v-if="isCompany">
    <div style="text-align: left; padding-left: 15px;padding-top: 15px;  margin-bottom: 30px; margin-left: 30px">
      <el-select
          v-model="value"
          filterable
          placeholder="搜索加油站"
          style="width: 240px"
      >
        <el-option
            class="select_item"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 30px" @click="eventOut">一键导出</el-button>
    </div>




  <div class="t_background">
  <div class="tmainBody">
    <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" style="width: 100%">
      <el-table-column prop="date" label="时间" align="center" />
      <el-table-column prop="pid" label="加油站" align="center" />
      <el-table-column prop="illegalType" label="类型" align="center" :formatter="formatter"/>
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
  </div>

<!--  某加油站页面-->
  <div v-else>
    <div style=" margin-left: 5%; margin-top: 10px; margin-bottom: 30px; color: #ffde59; text-align: left;">
      <div >
      <el-select
          v-model="valueb"
          class="m-2"
          placeholder=""
          size=""
          style="width: 120px;"
      >
        <el-option
            v-for="item in optionb"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      </div>
    </div>
  <div  class="t_background">
  <div class="tmainBody">
    <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" style="width: 100%">
      <el-table-column prop="date" label="时间" align="center" />

      <el-table-column prop="illegalType" label="类型" align="center" :formatter="formatter"/>
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