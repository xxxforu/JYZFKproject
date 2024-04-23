<script setup>
// import { ElMessage } from 'element-plus';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import func from 'vue-temp/vue-editor-bridge';

var role = localStorage.getItem('role')
var activeName = ref('vestibule') //当前tab
var year = ref(); // 获取年份
var month = ref(); // 注意：月份从 0 开始，需要加 1
var day = ref(); // 获取日期
var tabName = ref('vestibule')
var pid = ref()
var stationList = []
var SLData=ref({
  vestibule:[
    {
      num:"1",
      checkContent:"员工形象",
      checkStandard:"员工形象、劳动纪律符合规定员工形象、劳动纪律符合规定"
    },{
      num:"2",
      checkContent:"服务",
      checkStandard:"加油十三步、收银六步是否规范运用,及时投币"
    },{
      num:"3",
      checkContent:"现场安全",
      checkStandard:"无加油违规操作和违反安全十大禁令的行为"
    },{
      num:"4",
      checkContent:"场地",
      checkStandard:"无垃圾、积水、油污，标识牌警示牌完好"
    },{
      num:"5",
      checkContent:"消防器材",
      checkStandard:"数量齐全，压力正常，位置正确，卫生良好"
    },{
      num:"6",
      checkContent:"加油机",
      checkStandard:"外观完好无油污；加油枪无故障；视油器无气泡杂质；计数器显示清晰；内部完好。"
    },{
      num:"7",
      checkContent:"照明灯具",
      checkStandard:"照度正常，符合防爆要求"
    },{
      num:"8",
      checkContent:"罩棚",
      checkStandard:"无漏雨、无开裂、无材料脱落"
    }
  ],
  store:[
    {
      num:"9",
      checkContent:"卫生",
      checkStandard:"商品或物品摆放整齐有序，市内干净整洁"
    },
    {
      num:"10",
      checkContent:"服务",
      checkStandard:"按规范要求为顾客介绍商品及使用礼貌用语"
    },
    {
      num:"11",
      checkContent:"消防器材",
      checkStandard:"数量齐全，压力正常，位置正确，卫生良好"
    }
  ],
  tankFarm:[
    {
      num:"12",
      checkContent:"罐区",
      checkStandard:"罐区干净整洁无杂物、无易燃物、无明显油气味"
    },
    {
      num:"13",
      checkContent:"操作井",
      checkStandard:"无积水、油污、杂物，无明显油气味，无裂损、无锈蚀、无渗漏，跨接完好，量油口密闭"
    },
    {
      num:"14",
      checkContent:"通气管",
      checkStandard:"安装牢固，阻火器无油污，管线无腐蚀损坏，干燥剂是否变色（乙醇汽油）"
    },
    {
      num:"15",
      checkContent:"卸油区",
      checkStandard:"卸油区干净无油污和明显油气味，卸油口密闭，管件完好，开关灵活，无渗漏，无腐蚀"
    },
    {
      num:"16",
      checkContent:"消防器材",
      checkStandard:"配置齐全，压力正常，完好无损坏，摆放正确，卫生良好"
    },
    {
      num:"17",
      checkContent:"静电报警器",
      checkStandard:"接头紧固，无锈蚀损坏"
    },
    {
      num:"18",
      checkContent:"液位仪",
      checkStandard:"运行正常，信号线是否完好"
    },
    {
      num:"19",
      checkContent:"潜油泵",
      checkStandard:"运行正常，无异常声音，无渗漏"
    },
    {
      num:"20",
      checkContent:"油气回收",
      checkStandard:"无异常声音，无渗漏，无油气味"
    },
    {
      num:"21",
      checkContent:"油罐",
      checkStandard:"无明显下沉和上浮"
    },
  ],
  electric:[
    {
      num:"22",
      checkContent:"开关柜",
      checkStandard:"开关完整牢固，线路无搭连，无乱接"
    },{
      num:"23",
      checkContent:"配电箱",
      checkStandard:"仪表完好准确，线路规则有序，继电器动作灵敏，接地保护设施有效完好，无烧结，无乱接"
    },{
      num:"24",
      checkContent:"发电机",
      checkStandard:"安装牢固，无渗漏，皮带无松动龟裂"
    },{
      num:"25",
      checkContent:"照明设备",
      checkStandard:"线路规则，开关插座完好，灯具无过热、损坏"
    },{
      num:"26",
      checkContent:"消防器材",
      checkStandard:"附件齐全，压力正常，位置正确，卫生良好"
    }
  ],
  environment:[
    {
      num:"27",
      checkContent:"隔油池",
      checkStandard:"无开裂、无明显浮油、无杂物"
    },{
      num:"28",
      checkContent:"卫生间",
      checkStandard:"设备设施完好、无损坏；地面不湿滑"
    }
  ]
})


onMounted(()=>{
  
  
  let currentDate = new Date();

// 获取当天的年、月、日
year.value = currentDate.getFullYear(); // 获取年份
month.value = currentDate.getMonth() + 1; // 注意：月份从 0 开始，需要加 1
day.value = currentDate.getDate(); // 获取日期

axios.get('/branch/petrolList').then(res=>{
  let pl = res.data.data.petrolList
  for(let i in pl){
    stationList.push({
      value:pl[i].pid,
      label:pl[i].petrolName+'( '+pl[i].pid+' )'
    })
  }
})
})

var radioBox = ref({
  vestibule:{
  1: ['1','1','1','1'],
  2: ['1','1','1','1'],
  3: ['1','1','1','1'],
  4: ['1','1','1','1'],
  5: ['1','1','1','1'],
  6: ['1','1','1','1'],
  7: ['1','1','1','1'],
  8: ['1','1','1','1'],
  
  "description": ""
},
  store:{
    9: ['1','1','1','1'],
    10:['1','1','1','1'],
    11:['1','1','1','1'],
    "description":""
  },
  tankFarm:{
  12: ['1','1','1','1'],
  13: ['1','1','1','1'],
  14: ['1','1','1','1'],
  15: ['1','1','1','1'],
  16: ['1','1','1','1'],
  17: ['1','1','1','1'],
  18: ['1','1','1','1'],
  19: ['1','1','1','1'],
  20: ['1','1','1','1'],
  21:['1','1','1','1'],
  "description": ""
},
  electric:{
  22: ['1','1','1','1'],
  23: ['1','1','1','1'],
  24: ['1','1','1','1'],
  25: ['1','1','1','1'],
  26: ['1','1','1','1'],
  "description": ""
},
  environment:{
    27:['1','1','1','1'],
    28:['1','1','1','1'],
    "description":""
  }
})
const handleClick = (index, row) => {
  console.log(index,row);
  console.log(radioBox.value);
  console.log(radioBox.value[tabName.value][row.num]);
}

// 更换tabBar时触发，tabName即tabBar的英文名
const tabChange = (tabPaneName) =>{
 
  tabName.value= tabPaneName
 console.log(radioBox.value[tabName.value].description);
}

//提交表单
const toAnnounceBulletin =function(){
  var config = {
   method: 'post',
   url: 'https://ps.gwcampus.cn/api/petrol/fillDailyChecking',
   headers: { 
      'Authorization': localStorage.getItem('token'), 
      'Content-Type': 'application/json', 
      'Accept': '*/*', 
      'Connection': 'keep-alive'
   },
   data : JSON.stringify(radioBox.value)
};
  axios(config).then(res=>{
    if(res.data.code==0){
      //先重置内容
    radioBox.value = {
  vestibule:{
  1: ['1','1','1','1'],
  2: ['1','1','1','1'],
  3: ['1','1','1','1'],
  4: ['1','1','1','1'],
  5: ['1','1','1','1'],
  6: ['1','1','1','1'],
  7: ['1','1','1','1'],
  8: ['1','1','1','1'],
  
  "description": ""
},
  store:{
    9: ['1','1','1','1'],
    10:['1','1','1','1'],
    11:['1','1','1','1'],
    "description":""
  },
  tankFarm:{
  12: ['1','1','1','1'],
  13: ['1','1','1','1'],
  14: ['1','1','1','1'],
  15: ['1','1','1','1'],
  16: ['1','1','1','1'],
  17: ['1','1','1','1'],
  18: ['1','1','1','1'],
  19: ['1','1','1','1'],
  20: ['1','1','1','1'],
  21:['1','1','1','1'],
  "description": ""
},
  electric:{
  22: ['1','1','1','1'],
  23: ['1','1','1','1'],
  24: ['1','1','1','1'],
  25: ['1','1','1','1'],
  26: ['1','1','1','1'],
  "description": ""
},
  environment:{
    27:['1','1','1','1'],
    28:['1','1','1','1'],
    "description":""
  }
}
//再弹出提示框
activeName.value = 'vestibule'
      ElMessage({
    message: '今日已完成安全巡检填报！',
    type: 'success',
  })}else {
    ElMessage.error(res.data.msg)
  }
  })
}

//更改选择的加油站时要清空内容
var changeSelectStation = function(){
  radioBox.value = {
  vestibule:{
  1: ['1','1','1','1'],
  2: ['1','1','1','1'],
  3: ['1','1','1','1'],
  4: ['1','1','1','1'],
  5: ['1','1','1','1'],
  6: ['1','1','1','1'],
  7: ['1','1','1','1'],
  8: ['1','1','1','1'],
  
  "description": ""
},
  store:{
    9: ['1','1','1','1'],
    10:['1','1','1','1'],
    11:['1','1','1','1'],
    "description":""
  },
  tankFarm:{
  12: ['1','1','1','1'],
  13: ['1','1','1','1'],
  14: ['1','1','1','1'],
  15: ['1','1','1','1'],
  16: ['1','1','1','1'],
  17: ['1','1','1','1'],
  18: ['1','1','1','1'],
  19: ['1','1','1','1'],
  20: ['1','1','1','1'],
  21:['1','1','1','1'],
  "description": ""
},
  electric:{
  22: ['1','1','1','1'],
  23: ['1','1','1','1'],
  24: ['1','1','1','1'],
  25: ['1','1','1','1'],
  26: ['1','1','1','1'],
  "description": ""
},
  environment:{
    27:['1','1','1','1'],
    28:['1','1','1','1'],
    "description":""
  }
}
}
</script>

<template>
  <div id="block" >
  <el-select
  id="selectStation"
  v-if="role==2"
  v-model="pid"
  placeholder="选择巡检的加油站"
  style="width: 240px"
  @change="changeSelectStation"
>
  <el-option
    v-for="item in stationList"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  />
</el-select>
    <h1 id="title">日常巡检报告</h1>
    <div id="navSearchBar">
        <div id="date"><span>日期： </span>{{year}}年{{month}}月{{day}}日</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
        <div class="SLbox">
          <el-tab-pane label="前庭" name="vestibule">
            <el-table stripe :data="SLData.vestibule" style="width: 100%;height:100%">
              <el-table-column prop="num" label="序号" width="50" />
              <el-table-column prop="checkContent" label="巡检内容" width="100" />
              <el-table-column show-overflow-tooltip prop="checkStandard" label="检查标准" width="400" />
              <el-table-column label="检查时间及结果">
                <el-table-column prop="checkTime4" label="4时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['vestibule'][scope.row.num][0]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime9" label="9时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['vestibule'][scope.row.num][1]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime17" label="17时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['vestibule'][scope.row.num][2]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime23" label="23时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['vestibule'][scope.row.num][3]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </div>
        <div class="SLbox">
          <el-tab-pane label="营业室/便利店" name="store">
              <el-table stripe :data="SLData.store" style="width: 100%;height:100%">
                <el-table-column prop="num" label="序号" width="50" />
                <el-table-column prop="checkContent" label="巡检内容" width="100" />
                <el-table-column show-overflow-tooltip prop="checkStandard" label="检查标准" width="400" />
                <el-table-column label="检查时间及结果">
                  <el-table-column prop="checkTime4" label="4时" width="140">
                    <template #default="scope">
                      <div class="my-2 flex items-center text-sm" style="display:flex;">
                      <el-radio-group v-model="radioBox['store'][scope.row.num][0]" class="ml-4">
                        <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                        <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                      </el-radio-group>
                    </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="checkTime9" label="9时" width="140">
                    <template #default="scope">
                      <div class="my-2 flex items-center text-sm" style="display:flex;">
                      <el-radio-group v-model="radioBox['store'][scope.row.num][1]" class="ml-4">
                        <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                        <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                      </el-radio-group>
                    </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="checkTime17" label="17时" width="140">
                    <template #default="scope">
                      <div class="my-2 flex items-center text-sm" style="display:flex;">
                      <el-radio-group v-model="radioBox['store'][scope.row.num][2]" class="ml-4">
                        <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                        <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                      </el-radio-group>
                    </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="checkTime23" label="23时" width="140">
                    <template #default="scope">
                      <div class="my-2 flex items-center text-sm" style="display:flex;">
                      <el-radio-group v-model="radioBox['store'][scope.row.num][3]" class="ml-4">
                        <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                        <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                      </el-radio-group>
                    </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
          </el-tab-pane>
        </div>
        <div class="SLbox">
          <el-tab-pane label="油罐区" name="tankFarm">
            <el-table stripe :data="SLData.tankFarm" style="width: 100%;height:100%">
              <el-table-column prop="num" label="序号" width="50" />
              <el-table-column prop="checkContent" label="巡检内容" width="100" />
              <el-table-column show-overflow-tooltip prop="checkStandard" label="检查标准" width="400" />
              <el-table-column label="检查时间及结果">
                <el-table-column prop="checkTime4" label="4时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['tankFarm'][scope.row.num][0]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime9" label="9时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['tankFarm'][scope.row.num][1]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime17" label="17时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['tankFarm'][scope.row.num][2]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime23" label="23时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['tankFarm'][scope.row.num][3]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </div>
        <div class="SLbox">
          <el-tab-pane label="电器设备" name="electric">
            <el-table stripe :data="SLData.electric" style="width: 100%;height:100%">
              <el-table-column prop="num" label="序号" width="50" />
              <el-table-column prop="checkContent" label="巡检内容" width="100" />
              <el-table-column show-overflow-tooltip prop="checkStandard" label="检查标准" width="400" />
              <el-table-column label="检查时间及结果">
                <el-table-column prop="checkTime4" label="4时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['electric'][scope.row.num][0]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime9" label="9时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['electric'][scope.row.num][1]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime17" label="17时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['electric'][scope.row.num][2]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime23" label="23时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['electric'][scope.row.num][3]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </div>
        <div class="SLbox">
          <el-tab-pane label="环保" name="environment">
            <el-table stripe :data="SLData.environment" style="width: 100%;height:100%">
              <el-table-column prop="num" label="序号" width="50" />
              <el-table-column prop="checkContent" label="巡检内容" width="100" />
              <el-table-column show-overflow-tooltip prop="checkStandard" label="检查标准" width="400" />
              <el-table-column label="检查时间及结果">
                <el-table-column prop="checkTime4" label="4时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['environment'][scope.row.num][0]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime9" label="9时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['environment'][scope.row.num][1]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime17" label="17时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['environment'][scope.row.num][2]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
                <el-table-column prop="checkTime23" label="23时" width="140">
                  <template #default="scope">
                    <div class="my-2 flex items-center text-sm" style="display:flex;">
                    <el-radio-group v-model="radioBox['environment'][scope.row.num][3]" class="ml-4">
                      <el-radio class="radio" label=1 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"></path></svg></el-radio>
                      <el-radio label=0 @click="handleClick(scope.$index,scope.row)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg></el-radio>
                    </el-radio-group>
                  </div>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </div>
            
        </el-tabs>
         
    </div>
    <div class="desciptBox">
      <h5>经理巡查及存在问题处理情况：</h5>
      <textarea v-model="radioBox[tabName]['description']" rows="5" placeholder="请填写相关内容"></textarea>
    </div>
    <div id="annouce">
      <button id="annouceButton" @click="toAnnounceBulletin">提交</button>
    </div>
  </div>

  <!-- <div id="lock" v-else>
    <el-empty description="您无须填写该内容" />
  </div> -->
</template>

<style scoped>
.el-select{
  margin:20px 50px 0;
  float: left;
}
#annouceButton{
  background-color: var(--el-color-primary);
  padding:5px 20px;
  border-radius: 15px;
  border: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 20px;
  color: #fff;
}
#annouce{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 7vh;
  z-index: 10;
  background-color: #d9d9d9;
  border-radius: 20px 20px 0 0;
  
}
.el-tab-pane{
  height: 50vh;
  overflow: auto;
  scroll-behavior: smooth;
  /* margin-bottom: 7vh;*/
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
  }
.container-wrapper{
   overflow:hidden
}
#navSearchBar{
  margin-top: 2vh;
  position: relative;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  
}
.demo-tabs{
  padding: 0 3%;
}
.el-icon svg{
  margin-right: 0 !important;
}
#title{
  margin-top: 10px;
  color: var(--el-color-primary);
}
#date{
  z-index: 10;
  width: 25%;
position: absolute;
top: 0;
right: 5%;
}
.el-pagination{
  width: fit-content;
  float: right;
  padding-bottom: 7vh;
}
.radio span{
  display: flex;
  justify-content: center;
  align-items: center;
}
svg{
  width: 18px;
  height: 100%;
}







#block{
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background-color: #f5faf8;
}
#lock{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#title{
  margin-top: 10px;
  color: var(--el-color-primary);
}
#date{
  width: fit-content;
  float: left;
  font-size: 20px;
  color: var(--el-color-primary);
  font-weight: bold;
}
#date span{
  font-weight: normal;
}
.SLbox{
  width: fit-content !important;
  margin: 0 auto 0;
}
.desciptBox{
  margin:10px  auto 0;
  width: 70%;
}
.desciptBox h5{
  text-align: left;
  font-size: 20px;
  font-weight: normal;
}
.desciptBox textarea{
  padding: 10px;
  border: none;
  box-sizing: border-box;
  border-radius: 20px;
  resize: none;
  float: left;
  width: 100%;
  margin: 10px 0;
}
.desciptBox p{
  text-align: right;
}.desciptBox p input{
  width: 100px;
  border: none ;
  border-bottom: 1px solid #000;
  background-color: transparent;
  padding-bottom: 2px;
  font-size: 18px;
}
.desciptBox p input:focus , .desciptBox textarea:focus{
  outline: none;
}
</style>