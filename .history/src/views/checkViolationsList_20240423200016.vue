<!--违规行为一览_列表查看-->
<script setup>
import axios from "axios";
import { ElMessage } from 'element-plus';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
var role = localStorage.getItem('role')
var isCompany = ref(true)
var lastPage = ref(0)
var total = ref(0)
var page=ref(1)
var time=ref();



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
function renderTime(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

function handleClick(index,row) {
console.log(row.time);
  sessionStorage.setItem('description',row.description)
  sessionStorage.setItem('id',row.id)
  sessionStorage.setItem('illegalType',row.illegalType)
  sessionStorage.setItem('petrolName',row.petrolName)
  sessionStorage.setItem('photo',row.photo)
  sessionStorage.setItem('pid',row.pid)
  sessionStorage.setItem('dateTime',row.time)

  router.push({
    path:'/main/violationDetail',
    //观感不好 尝试通过sessionStorage来存储
    // params:{
    //   date:row.date,
    //   description:row.description,
    //   id:row.id,
    //   illegalType:row.illegalType,
    //   petrolName:row.petrolName,
    //   photo:row.photo,
    //   pid:row.pid,
    //   time:row.time
    // }
  })
}
function pList(){
  axios.get('/petrol/getPetrolIllegalBehaviorList?page='+page.value+'&size=15').then(res=>{
    if(res.data.code!=0)  ElMessage.error(res.data.msg)
    else{
    tableData.value = res.data.data.data
    lastPage.value=res.data.data.lastPage*10
    total.value=res.data.data.total
    for(let i=0;i<total.value;i++){
      time.value=ref(tableData.value[i].date+" "+tableData.value[i].time)
      tableData.value[i].time=time.value
    }
    console.log(total.value)
    console.log(page.value)}
  }).catch(error=>{
    console.log('Error',error.message)
  })
}
function cList1(){
  axios.get('/central/getPetrolIllegalBehaviorList?page='+page.value+'&size=15').then(res=>{
    if(res.data.code!=0)  ElMessage.error(res.data.msg)
    else{
    tableData.value = res.data.data.data
    lastPage.value=res.data.data.lastPage*10
    total.value=res.data.data.total
    for(let i=0;i<total.value;i++){
      time.value=ref(tableData.value[i].date+" "+tableData.value[i].time)
      tableData.value[i].time=time.value
    }}
  }).catch(error=>{
    console.log('Error',error.message)
  })
}
function  cList2(){
  axios.get('/branch/getPetrolIllegalBehaviorList?page='+page.value+'&size=15').then(res=>{
    tableData.value = res.data.data.data
    lastPage.value=res.data.data.lastPage*10
    total.value=res.data.data.total
    for(let i=0;i<total.value;i++){
      time.value=ref(tableData.value[i].date+" "+tableData.value[i].time)
      tableData.value[i].time=time.value
    }
    
  }).catch(error=>{
    console.log('Error',error.message)
  })
}




onMounted(()=>{
  if(role==1){
    isCompany.value=true
    cList1()
    axios.get('/central/petrolList').then(res=>{
      for(let item in res.data.data.petrolList){
        gridData.push({
          'pid':res.data.data.petrolList[item].pid,
          'petrolName':res.data.data.petrolList[item].petrolName
        })
      }console.log(gridData);
    })
  }else if(role==2){
    isCompany.value=true
    axios.get('/branch/petrolList').then(res=>{
      for(let item in res.data.data.petrolList){
        gridData.push({
          'pid':res.data.data.petrolList[item].pid,
          'petrolName':res.data.data.petrolList[item].petrolName
        })
      }console.log(gridData);
    })
    cList2()
  }else {//某加油站
    isCompany.value=false
    pList()
  }
})
const formatter = (row, column, cellValue) => {
  //return row.illegalType=='1'?'是':'否'
  if(row.illegalType=='1'){ return '打手机'}else if(row.illegalType=='2'){return '未正确摆放护栏'}else if(row.illegalType=='3'){
    return '登高未戴安全帽'
  }else if(row.illegalType=='4'){
    return '火灾'
  }else{
    return '卸油区有人'
  }

}
function handlePageChange(currentPage)
{
  page.value=currentPage
  if(role==1){
    cList1()
  }else if(role==2){
    cList2()
  }else{
    pList()
  }

}

// 导出Excel模块
var exportDataFormVisible = ref(false)
var gridData = []
var exportPid = []
const value1 = ref('')
const handleExportDataRowChange = (val)=>{
  exportPid=[]
for(let i in val){
  exportPid.push(val[i].pid)
}
console.log(exportPid);
  // exportPid = currentRow.pid
}
const handleExport =()=>{
  exportDataFormVisible.value = false
  console.log(value1.value);

 var exporSiteFile = function() {
    let fileId = new Date().getTime(); // 使用当前时间戳作为 fileId
			let params = {
				PCTime: new Date().getTime(),
				RequestType: "File",
				Condition: {
					Action: "SiteParamFile",
					Config: {
						FileID: fileId
					}
				}
			};
      let requestURL = '';
      if(role == 1) requestURL= '/central/exportData'+'?startDate='+value1.value[0]+'&endDate='+value1.value[1]+'&pidList='+exportPid
      else if(role == 2) requestURL = '/branch/exportData'+'?startDate='+value1.value[0]+'&endDate='+value1.value[1]+'&pidList='+exportPid
      else if(role == 3) requestURL = '/petrol/exportData'+'?startDate='+value1.value[0]+'&endDate='+value1.value[1]
      axios.get(requestURL,{  responseType: 'blob' }).then(res => {
				if (res.data.size > 0) {
					const blob = new Blob([res.data]);
					let url = window.URL.createObjectURL(blob); //根据返回的流文件创建url；url指向流
					let link = document.createElement("a");
					link.style.display = "none";
					link.href = url;
					let fileName = decodeURIComponent(res.headers["filename"]);
					link.setAttribute("download", value1.value[0]+'To'+value1.value[1]+'By'+exportPid.join('&')+'.xlxs'); // 自定义下载文件名,此处命名为起始时间To结束时间By加油站1&加油站2
					document.body.appendChild(link); //添加不可见a标签
					link.click(); //代码触发a标签的点击事件进行文件下载
				}
			}).catch(error=>{
        ElMessage.error(error)
      });
		}
    exporSiteFile()

}
</script>

<template>
  <!--  ！总分公司页面-->
  <div v-if="isCompany">
    <div id="topBox">
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
      <el-button class="exportData" @click="exportDataFormVisible = true" type="primary" size="large" round>导出Excel表格</el-button>
    </div>


    
    <div class="t_background">
      <div class="tmainBody">
        <el-table stripe :data="tableData" empty-text="暂无违规信息" :header-cell-style="{'text-align':'center'}" style="width: 100%">
          <el-table-column prop="time" label="时间" align="center" />
          <el-table-column prop="pid" label="加油站" align="center" />
          <el-table-column prop="petrolName" label="加油站名称" align="center" />
          <el-table-column prop="description" label="描述" align="center"/>
          <el-table-column prop="links" label="" align="center" >
            <template #header>
              <!--              <el-input v-model="search" size="small" placeholder="Type to search" />-->
            </template>
            <template #default="scope">
              <!--              ！！链接-->
              <el-link class="link"  @click="handleClick(scope.$index, scope.row)">查看详情</el-link>
            </template>
          </el-table-column>

        </el-table>
        <!--    分页 -->
        <el-row>
          <el-col style="">
            <el-pagination
            background
            hide-on-single-page
            layout="prev, pager, next"
            @current-change="handlePageChange"
            :total="lastPage" />
          </el-col>
        </el-row>
        <!-- 导出excel弹窗 -->
        <el-dialog v-model="exportDataFormVisible" title="选择加油站导出Excel" width="500">
          <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
          <el-table :data="gridData"  @selection-change="handleExportDataRowChange">
            <el-table-column type="index" width="50" />
            <el-table-column type="selection" width="55" />
            <el-table-column property="pid" label="加油站编号" width="150" />
            <el-table-column property="petrolName" label="加油站名字" width="200" />
          </el-table>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="exportDataFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleExport">
                确认导出
              </el-button>
            </div>
          </template>
        </el-dialog>
      


      </div>
    </div>
  </div>

  <!--  某加油站页面-->
  <div v-else>
    <el-button class="exportData" @click="exportDataFormVisible = true" type="primary" size="large" round>导出Excel表格</el-button>
    <div  class="t_background">
      <div class="tmainBody">
        <el-table stripe :data="tableData" empty-text="暂无违规信息" :header-cell-style="{'text-align':'center'}" style="width: 100%">
          <el-table-column prop="time" label="时间" align="center" />
          
          <el-table-column prop="illegalType" label="类型" align="center" :formatter="formatter"/>
          <el-table-column prop="links" label="" align="center" >
            <template #header>
              <!--              <el-input v-model="search" size="small" placeholder="Type to search" />-->
            </template>
            <template #default="scope">
              <!--              ！！链接-->
              <el-link class="link" @click="handleClick(scope.$index, scope.row)">查看详情</el-link>
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
            <el-pagination
            hide-on-single-page
            background
              layout="prev, pager, next"
              @current-change="handlePageChange"
                :total="lastPage" />
          </el-col>
        </el-row>
      </div>
      <!-- 导出excel弹窗 -->
      <el-dialog v-model="exportDataFormVisible" title="选择时间段导出Excel" width="500">
        <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    />
        
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="exportDataFormVisible = false">取消</el-button>
            <el-button type="primary" @click="handleExport">
              确认导出
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
#topBox{
  margin-top: 2%;
  display: flex;
  justify-content: space-between;
}
.el-table__header-wrapper, .el-table__body-wrapper, .el-table__footer-wrapper{
  width:fit-content;
  margin:auto;
}

.exportData{
  width: fit-content;
  display: block;
}
.link{
  color: var(--el-color-primary);
  text-decoration: underline !important;
}
.t_background {
  width: 90%;
  background-color: #ffffff;
  margin:auto;
}
.tmainBody {
  width: 90%;
  margin: 2% auto 0;
  /*justify-content: center;*/
  /*margin: auto;*/
}
.el-pagination{
  margin:10px  auto;
  width:fit-content;
}
.tmainBody >>> .el-table__row>td{
  /* 去除表格线 */
  border: none;
}
/*.tmainBody >>> .el-table th.is-leaf {*/
/*  !* 去除上边框 *!*/
/*  border: none;*/
/*}*/
.el-table--fit.el-table--striped.el-table--enable-row-hover.el-table--enable-row-transition.el-table.el-table--layout-fixed.is-scrolling-none{
  margin:20px 0;
}

</style>
