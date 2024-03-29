<!--安全日志查看_列表查看-->
<script setup>

import axios from "axios"; // 引入userRouter
import { format } from 'date-fns';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
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

const valuea = ref(belong)
// const optiona = [
//   {
//     value: 'fen1',
//     label: '分公司1',
//   },
// ]
// var optiona = []
// var optionList =[]
var optionList =ref([{
  value:'all',
  label:'所有分公司'
}])
var data = ref([])
// var tableData = ref(
//   {
//     contentChecking:[],
//     pid:[],
//     itemDescribe:[]
//   }
// )
var tableData=ref([])
function pList(){
  axios.get('/petrol/getPetrolSafeDailyList?page='+page.value+'&size=10').then(res=>{
    tableData.value = res.data.data.data
    // tableData.value = data.
    total.value=res.data.data.total
    lastPage.value=res.data.data.lastPage
    console.log(res.data.data.data)
    console.log(tableData.value)
  })
}
function cList1(){
  axios.get('/central/companyList').then(res=>{
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
  axios.get('/branch/getSafeDailyList?companyId='+belong+'&date=2024-03-24').then(res=>{//分公司的companyId为其分公司编号，是固定的
    // res.data.data.forEach(el=>{
    //   tableData.value.contentChecking.push(el.contentChecking)
    //   tableData.value.pid.push(el.pid)
    //   tableData.value.itemDescribe.push(el.itemDescribe)
    // })

    tableData.value = res.data.data
    // total.value=res.data.data.total
    console.log(res.data.data)
    console.log(belong)
    console.log(tableData.value)
    console.log(tableData.value[0].contentChecking)
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

  // const formatter1 = (row, column, cellValue) => {
  //   //return row.illegalType=='1'?'是':'否'
  //   let cNum1=0
  //   for(let i=1;i<9;i++){
  //     cNum1+=row.contentChecking[i]
  //   }
  //   if(cNum1>0){color='white'}else {console.log(cNum1);console.log("gggg")}
  //   // if((row.contentChecking[1]+row.contentChecking[2])=='1'){ return '打手机',console.log(row.contentChecking[1]+row.contentChecking[2]+row.contentChecking[3]),console.log(row.prop)}else if(row.illegalType=='2'){return '未正确摆放护栏'}else if(row.illegalType=='3'){
  //   //   return '登高未戴安全帽'
  //   // }else if(row.illegalType=='4'){
  //   //   return '火灾'
  //   // }else{
  //   //     color='red'
  //   //   // return '卸油区有人'
  //   //  // return  row.itemDescribe.store
  //   //  //  console.log(tableData.value[0].contentChecking[1])
  //   //
  //   // }
  //
  // }

})

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

let color

const formatter1 = (row, column, cellValue) => {
  //return row.illegalType=='1'?'是':'否'
  let cNum1=row.contentChecking[1]
  for(let i=2;i<9;i++){
    cNum1+=row.contentChecking[i]
  }
  if(cNum1>'1'){
    color='red'
    // return "red",
    console.log(cNum1),
        console.log(row.contentChecking[1])
  }else {
    color='green'
    // return "green",
    console.log("gggg")
  }
  // if((row.contentChecking[1]+row.contentChecking[2])=='1'){ return '打手机',console.log(row.contentChecking[1]+row.contentChecking[2]+row.contentChecking[3]),console.log(row.prop)}else if(row.illegalType=='2'){return '未正确摆放护栏'}else if(row.illegalType=='3'){
  //   return '登高未戴安全帽'
  // }else if(row.illegalType=='4'){
  //   return '火灾'
  // }else{
  //     color='red'
  //   // return '卸油区有人'
  //  // return  row.itemDescribe.store
  //  //  console.log(tableData.value[0].contentChecking[1])
  //
  // }

}
// const color1: {color:'purple'}



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
          <el-table-column prop="contentChecking.1" label="前庭"  width="130" align="center" :formatter="formatter1"  >
            <svg viewBox="0 0 80 80" width="15" height="15">
              <circle class="circle" cx="40" cy="40" r="38"/>
            </svg>
          </el-table-column>
          <el-table-column prop="bian" label="便利店" width="130" align="center" :formatter="formatter" >
            <svg viewBox="0 0 80 80" width="15" height="15">
              <circle class="circle" cx="40" cy="40" r="38"/>
            </svg>
          </el-table-column>
          <el-table-column prop="you" label="油罐区" width="130" align="center" :formatter="formatter" >
            <svg viewBox="0 0 80 80" width="15" height="15">
              <circle class="circle" cx="40" cy="40" r="38"/>
            </svg>
          </el-table-column>
          <el-table-column prop="dian" label="电器设备" width="130" align="center" :formatter="formatter" >
            <svg viewBox="0 0 80 80" width="15" height="15">
              <circle class="circle" cx="40" cy="40" r="38"/>
            </svg>
          </el-table-column>
          <el-table-column prop="huan" label="环保" width="130" align="center" :formatter="formatter" >
            <svg viewBox="0 0 80 80" width="15" height="15">
              <circle class="circle" cx="40" cy="40" r="38"/>
            </svg>
          </el-table-column>
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
      <el-table :data="tableData" style="width: 100%;height:100%margin: auto;align-items: center" :header-cell-style="{fontSize: '14px', backgroundColor: '#fff',border: 'none !important'}">
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

.circle {
  fill: v-bind("color");
}
.el-table__header{
  margin: auto;
}
</style>
