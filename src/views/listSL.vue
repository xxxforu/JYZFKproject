<!--安全日志查看_列表查看-->
<script setup>

import axios from "axios"; // 引入userRouter
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { format, endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, addDays, startOfWeek, endOfWeek, addHours, addMinutes, addSeconds } from 'date-fns'
var role = localStorage.getItem('role')
var belong = localStorage.getItem('belong')

var isCompany = ref(true)
var isCentral = ref(false)
var isBranch = ref(false)
var isPetrol = ref(false)

var total = ref(0)
var lastPage = ref(1)
var page=ref(1)

const Info =ref([])
// axios.get('/branch/getSafeDailyList?page=1&size=5').then(res => {
//   Info.value= res.data.data
//   console.log(res.data);
//   console.log('!!!')
//   console.log(Info.value);

// })

const valuea = ref(belong)
// const optiona = [
//   {
//     value: 'fen1',
//     label: '分公司1',
//   },
//   {
//     value: 'fen2',
//     label: '分公司2',
//   },
//   {
//     value: 'fen3',
//     label: '分公司3',
//   },
//   {
//     value: 'fen4',
//     label: '分公司4',
//   },
// ]
// var optiona = []
// var optionList =[]
var optionList =ref([{
  value:'all',
  label:'所有分公司'
}])
var data = ref([])
var tableData = ref([])




const tableData2 = [
  {
    date: '2099-03-03',
    name: 'xxx',
    qian: '',
    bian: '',
    you: '',
    dian: '',
    huan: '',
    cha:'xxx',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    qian: 'California',
    bian: 'Los Angeles',
    you: 'No. ',
    dian: 'CA 90036',
    huan: 'CA 90036',
  },

]
function pList(){
  axios.get('http://127.0.0.1:4523/m1/3942191-0-default/petrol/getPetrolSafeDailyList?page='+page.value+'&size=10').then(res=>{
    tableData.value = res.data.data.data
    // tableData.value = data.
    total.value=res.data.data.total
    lastPage.value=res.data.data.lastPage
    console.log(res.data.data.data)
    console.log(tableData.value)
  })
}
function cList1(){
  axios.get('http://127.0.0.1:4523/m1/3942191-0-default/central/companyList').then(res=>{
    let result=res.data.data
    // var optionList =[]
    console.log(result[0].companyId)
    // optionList.value.splice(0,optionList)
    result.forEach(element=>{
      optionList.value.push({label:element.companyId,value:element.companyId})

    })
    console.log(optionList.value)

  })
  axios.get('/branch/getSafeDailyList?companyId='+valuea.value+'&date='+dateValue.value).then(res=>{
    tableData.value = res.data.data
  })
}
function cList2(){
  axios.get('http://127.0.0.1:4523/m1/3942191-0-default/branch/getSafeDailyList?companyId='+belong+'&date='+dateValue.value).then(res=>{//分公司的companyId为其分公司编号，是固定的
    tableData.value = res.data.data
    total.value=res.data.data.total
    console.log(res.data.data)
    console.log(belong)
    console.log(dateValue.value)
  })
}
onMounted(()=>{
  if(role==1){
    isCentral.value=true
    isCompany.value=true
  cList1()

  }else if(role==2){
    isBranch.value=true
    isCompany.value=true
    cList2()
  }else {
    isPetrol.value=true
    isCompany.value=false
    pList()
  }

})

// setup() {
//   optiona();
// }
const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')

var dateValue = ref(format(new Date(), 'yyyy-MM-dd'))

//const name ref('xxx')
//const time ref('xx-xx-xx')
const router = useRouter()
function handleClick() {
  router.push({
    path:'/main/visualSL'
  })
}
// function formatter1(row){
//   let arr = []
//   row.contentChecking((item,index)=>{
//     if()
//   })
//
// }
// const formatter1 = (row, column, cellValue) => {
//   //return row.illegalType=='1'?'是':'否'
//   let c = row.contentChecking
//   if(c.getElementById('1') == '1'){
//     return '打手机'
//   }else{
//     return '违规收费'
//   }
//
//
// }
// function changeDate() {
//   console.log(dateValue.value)
// }
function handlePageChange(currentPage)
{
  page=currentPage
  console.log(currentPage)
  if(role==1){
    cList1()
  }else if(role==2){
    cList2()
  }else{
    pList()
  }

}
function handleDateChange(dateChoice){
  dateValue=dateChoice
  console.log(dateChoice)
  console.log(dateValue)
  if(role==1){
    cList1()
  }else{
    cList2()
  }
}



</script>

<template>
  <div class="bodyPagelSL" v-if="isCompany">
    <div style="font-size: 18px; font-weight: 700; text-align: left;padding-top: 20px;padding-left: 30px; margin-bottom: 10px">列表查看</div>
    <div style="height: 40px; width: 50%; margin-bottom: 10px">
      <div style="float: left; margin-left: 30px;">
        <el-select
            v-model="valuea"
            class="m-2"
            placeholder=""
            size="large"
            style="width: 240px"

        >
          <div v-if="isCentral" :key="a">
            <el-option

                v-for="item in optionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"

            />
          </div>
        </el-select>

      </div>
      <div style="float: left; margin-left: 50px; padding-top: 4px;">
        <div class="demo-date-picker">
          <div >
            <!--          <span class="demonstration">Default</span>-->
            <el-date-picker
                v-model="dateValue"
                type="date"
                placeholder="Pick a day"
                :size="size"
                format="YYYY-MM-DD"

                @input="$forceUpdate"
                @date-change="handleDateChange"
            />
          </div>
        </div>

      </div>
    </div>
    <div class="tmainBody">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="pid" label="加油站编号" align="center" width="245" />
<!--        <el-table-column prop="{{dateValue.value}}" label="时间" width="120"  />-->
        <el-table-column label="巡检项目" align="center">
          <el-table-column prop="qian" label="前庭" width="130" align="center" :formatter="formatter" />
          <el-table-column prop="bian" label="便利店" width="130" align="center" :formatter="formatter" />
          <el-table-column prop="you" label="油罐区" width="130" align="center" :formatter="formatter" />
          <el-table-column prop="dian" label="电器设备" width="130" align="center" :formatter="formatter" />
          <el-table-column prop="huan" label="环保" width="130" align="center" :formatter="formatter" />
        </el-table-column>

          <el-table-column prop="links" label="" align="center" width="120px">
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
          <el-pagination background layout="prev, pager, next" :total="total" />
        </el-col>
      </el-row>
    </div>
  </div>

  <div class="bodyPagelSL" v-else>
    <h1 id="title">安全日志查看</h1>
<!--    <div style="font-size: 18px; font-weight: 700; text-align: center;padding-top: 40px;padding-left: 30px; margin-bottom: 10px">安全日志查看</div>-->
    <div class="tmainBody">
      <el-table :data="tableData" style="width: 100%; margin: auto;align-items: center" :header-cell-style="{fontSize: '14px', backgroundColor: '#fff',border: 'none !important'}">
        <el-table-column prop="date" label="时间" align="center" width="220px" />
        <el-table-column label="巡检项目" align="center" width="600px" >
          <el-table-column prop="contentChecking.1" label="前庭" align="center"  width="120px" :formatter="formatter1" />
          <!--          <el-table-column prop="contentChecking.1" label="前庭" align="center"  width="120px" :formatter="formatter1">-->
          <!--            <el-tag v-if="row.contentChecking.getElementById('1') =='1'">'hh'</el-tag>-->
          <!--          </el-table-column>-->
          <el-table-column prop="contentChecking.9" label="便利店" align="center"  width="120px" />
          <el-table-column prop="contentChecking.12" label="油罐区" align="center"  width="120px" />
          <el-table-column prop="contentChecking.22" label="电器设备" align="center"  width="120px" />
          <el-table-column prop="contentChecking.27" label="环保" align="center" :headerStyle="{color:'black'}" width="120px" />
          <!--     :headerStyle="{color:'black'}"xxx  某单元格的字体样式？     -->
        </el-table-column>

        <el-table-column prop="links" label="" align="center" width="200px">
          <template #header>
            <!--              <el-input v-model="search" size="small" placeholder="Type to search" />-->
          </template>
          <template #default="scope">

            <!--              ！！链接-->
            <el-link  @click="handleClick(scope.$index, scope.row)" >查看详情</el-link>
          </template>


        </el-table-column>





      </el-table>
      <!--    分页 -->
      <el-row>
        <el-col style="">
          <el-pagination background layout="prev, pager, next" @current-change="handlePageChange" :total="total" />
        </el-col>
      </el-row>


    </div>


  </div>

</template>

<style scoped>
.bodyPagelSL {
  background-color: #f5faf8;
  height: 100vh;
}
.tmainBody {
  width: 85%;
  background-color: #ffffff;
  justify-content: center;
  margin: auto;
}
#title{
  margin-top: 10px;
  margin-bottom: 20px;
  color: var(--el-color-primary);
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}

.el-pagination {
  justify-content: right;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 40px;
}



/*.el-table th.gutter{*/
/*  display: table-cell!important;*/
/*}*/
.tmainBody >>> .el-table__row>td{
  /* 去除表格线 */
  border: none;
}
.tmainBody >>> .el-table tr th.is-leaf{
  border: 1px solid #EBEEF5;
  border-right: none;
}
.tmainBody >>> .el-table thead tr th:nth-last-of-type(2){
  border-right: 1px solid #EBEEF5;
}



</style>
