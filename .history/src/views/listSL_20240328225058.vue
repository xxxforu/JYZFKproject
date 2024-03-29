<!--安全日志查看_列表查看-->
<script setup>

import { format } from 'date-fns';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
var role = localStorage.getItem('role')
var belong = localStorage.getItem('belong')
var dateValue = ref(format(new Date(), 'yyyy-MM-dd'))

var total = ref(0)
var lastPage = ref(1)
var page=ref(1)

const Info =ref([])

var optionList =ref([{
  value:'all',
  label:'所有分公司'
}])
var data = ref([])
var tableData=ref([

])
function getSafeList(){
if(role==2){
  axios.get('/branch/getSafeDailyList?companyId='+belong+'&date='+dateValue.value),then(res=>{
    console.log(res);
  })
}
}
onMounted(()=>{
  // if(role==2){
  // }else if(role==3){
    
  // }

})

const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')



const router = useRouter()
function handleClick() {
  router.push({
    path:'/main/visualSL'
  })
}
function handlePageChange(currentPage)
{
  page=currentPage
  console.log(currentPage)

}
function handleDateChange(){
  getSafeList()
  
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

}



</script>

<template>
  <div class="bodyPagelSL" v-if="role==2">
    <div style="font-size: 18px; font-weight: 700; text-align: left;padding-top: 20px;padding-left: 30px; margin-bottom: 10px">列表查看</div>
    <div style="height: 40px; width: 50%; margin-bottom: 10px">
      
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
                value-format="YYYY-MM-DD"
                @input="$forceUpdate"
                @change="handleDateChange"
            />
          </div>
        </div>

      </div>
    </div>
    <div class="tmainBody">
      <!-- 表头 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="pid" label="加油站编号" align="center" width="140" />
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
        <!-- <el-table-column show-overflow-tooltip prop="checkStandard" align="center"  label="巡检描述" width="400" /> -->
      </el-table>

      <!--    分页 -->
      <el-row>
        <el-col style="">
          <el-pagination background layout="prev, pager, next" :total="total" />
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
  width: fit-content;
  background-color: #ffffff;
  max-height: 75%;
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
.el-row{
  width: fit-content;
  margin:10px auto;

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
