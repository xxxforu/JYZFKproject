<!--安全日志查看_列表查看-->
<script setup>
import axios from 'axios';
import { format } from 'date-fns';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from "vue";
var role = localStorage.getItem('role')
var belong = localStorage.getItem('belong')
var dateValue = ref(format(new Date(), 'yyyy-MM-dd'))
var lastPage = ref(0) //最后一页，用于分页条
var currentPage=ref(1) //当前页，用于接口传参
var total = ref(0)
var page=ref(1)

var data = ref([])
var tableData=ref([])

// 点击分页条
const handleChangePage = (value)=>{
    currentPage.value = value
    axios.get('/petrol/getPetrolSafeDailyList?page='+currentPage.value+'&size=10').then(res=>{
      if(res.data.code!=0) ElMessage.error(res.data.msg)
    else{
        lastPage.value=res.data.data.lastPage*10
        if(res.data.data.data){
      tableData.value = [] //更新前先清空之前的
      for(let item in res.data.data.data){
        var oneData = {
          checkCount:{
            "vestibule":0,
            "electric":0,
            "store":0,
            "tankFarm":0,
            "environment":0
          }
        };
        var i = res.data.data.data[item].contentChecking
        oneData.checkCount.vestibule = i['1']+i['2']+i['3']+i['4']+i['5']+i['6']+i['7']+i['8']
        oneData.checkCount.store = i['9']+i['10']+i['11']
        oneData.checkCount.tankFarm = i['12']+i['13']+i['14']+i['15']+i['16']+i['17']+i['18']+i['19']+i['20']+i['21']
        oneData.checkCount.electric = i['22']+i['23']+i['24']+i['25']+i['26']
        oneData.checkCount.environment = i['27']+i['28']
        oneData.pid =  res.data.data.data[item].pid
        oneData.itemDescribe =res.data.data[item].itemDescribe
        for(let des in oneData.itemDescribe){
          if(oneData.itemDescribe[des] == "")oneData.itemDescribe[des] ="无"
        }
        oneData.date= res.data.data.data[item].date
        tableData.value.push(oneData)

      }
    }}
        
    })
  }

 //拿表格数据 
function getSafeList(){
if(role==2){
  axios.get('/branch/getSafeDailyList?companyId='+belong+'&date='+dateValue.value).then(res=>{
    console.log(res.data.data);
    if(res.data.data){
      tableData.value = [] //更新前先清空之前的
      for(let item in res.data.data){
        console.log(res.data.data[item]);
        var oneData = {
          checkCount:{
            "vestibule":0,
            "electric":0,
            "store":0,
            "tankFarm":0,
            "environment":0
          }
        };
        var i = res.data.data[item].contentChecking
        oneData.checkCount.vestibule =8-( i['1']+i['2']+i['3']+i['4']+i['5']+i['6']+i['7']+i['8'])
        oneData.checkCount.store =3-( i['9']+i['10']+i['11'])
        oneData.checkCount.tankFarm =10- i['12']-i['13']-i['14']-i['15']-i['16']-i['17']-i['18']-i['19']-i['20']-i['21']
        oneData.checkCount.electric =5- i['22']-i['23']-i['24']-i['25']-i['26']
        oneData.checkCount.environment =2- i['27']-i['28']
        oneData.pid =  res.data.data[item].pid
           oneData.itemDescribe =res.data.data[item].itemDescribe
        for(let des in oneData.itemDescribe){
          if(oneData.itemDescribe[des] == "")oneData.itemDescribe[des] ="无"
        }

        tableData.value.push(oneData)

      }
    }
    else ElMessage.error(res.data.msg)
  })
}
else if(role==3){
  axios.get('/petrol/getPetrolSafeDailyList?page='+currentPage.value+'&size=10').then(res=>{
    lastPage.value=res.data.data.lastPage*10
    if(res.data.data.data){
      tableData.value = [] //更新前先清空之前的
      for(let item in res.data.data.data){
        var oneData = {
          checkCount:{
            "vestibule":0,
            "electric":0,
            "store":0,
            "tankFarm":0,
            "environment":0
          }
        };
        var i = res.data.data.data[item].contentChecking
        oneData.checkCount.vestibule =8-( i['1']+i['2']+i['3']+i['4']+i['5']+i['6']+i['7']+i['8'])
        oneData.checkCount.store =3-( i['9']+i['10']+i['11'])
        oneData.checkCount.tankFarm =10- i['12']-i['13']-i['14']-i['15']-i['16']-i['17']-i['18']-i['19']-i['20']-i['21']
        oneData.checkCount.electric =5- i['22']-i['23']-i['24']-i['25']-i['26']
        oneData.checkCount.environment =2- i['27']-i['28']
        oneData.pid =  res.data.data.data[item].pid
        oneData.itemDescribe =res.data.data.data[item].itemDescribe
        for(let des in oneData.itemDescribe){
          if(oneData.itemDescribe[des] == "")oneData.itemDescribe[des] ="无"
        }
        oneData.date= res.data.data.data[item].date
        tableData.value.push(oneData)

      }
    }else ElMessage.error(res.data.msg)

  })
}
console.log(tableData.value);
}
onMounted(()=>{
  getSafeList()
  

})


const value1 = ref('')

function handlePageChange(currentPage)
{
  page=currentPage

}
function handleDateChange(){
  getSafeList()
}


</script>

<template>
  <div class="bodyPagelSL" >
      
        <div class="demo-date-picker" v-if="role==2" style="margin: 20px 50px 0">  
            <!-- 日期选择器 -->
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

    
    <div class="tmainBody">
      <!-- 表格 -->
      <el-table stripe :data="tableData" style="width: 100%;max-height: 83vh;overflow-y: auto;margin-top: 20px;">
        <el-table-column prop="pid" label="加油站编号" align="center" width="100" />
        <el-table-column v-if="role==3" prop="date" label="日期" align="center" width="100" />
        <el-table-column label="巡检项目不合格数" align="center">
          <el-table-column prop="checkCount.vestibule" label="前庭" width="40" align="center" /> 
          <el-table-column prop="checkCount.store" label="便利店" width="40" align="center" />
          <el-table-column prop="checkCount.tankFarm" label="油罐区" width="40" align="center" />
          <el-table-column prop="checkCount.electric" label="电器设备" width="40" align="center" />
          <el-table-column prop="checkCount.environment" label="环保" width="40" align="center" />
          
        </el-table-column>
        <el-table-column label="巡检项目简述" align="center">
          <el-table-column show-overflow-tooltip prop="itemDescribe.vestibule" label="前庭"  width="150" align="center" />  

          <el-table-column show-overflow-tooltip prop="itemDescribe.store" label="便利店"  width="150" align="center" />  

          <el-table-column show-overflow-tooltip prop="itemDescribe.tankFarm" label="油罐区"  width="150" align="center" />  

          <el-table-column show-overflow-tooltip prop="itemDescribe.electric" label="电器设备"  width="150" align="center" /> 
          
          <el-table-column show-overflow-tooltip prop="itemDescribe.environment" label="环保"  width="150" align="center" /> 
          
          
        </el-table-column>
      </el-table>

      <!--    分页 -->
      <el-row v-if="role==3">
        <el-col style="">
          <el-pagination
            v-if="lastPage > 1"
            hide-on-single-page
            small
            background
            layout="prev, pager, next"
            :total="lastPage"
            class="mt-4"
            @current-change="handleChangePage"
          />
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

.el-table__header{
  margin: auto;
}
</style>
