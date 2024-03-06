<script setup>
// import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
var activeName = ref('vestibule') //当前tab
var year = ref(); // 获取年份
var month = ref(); // 注意：月份从 0 开始，需要加 1
var day = ref(); // 获取日期
var tabName = 'vestibule'
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
  ]
})
onMounted(()=>{
  if(role==3){
    havaRightToCheck.value=true
    
  }else{
    havaRightToCheck.value=false
  }
  let currentDate = new Date();

// 获取当天的年、月、日
year.value = currentDate.getFullYear(); // 获取年份
month.value = currentDate.getMonth() + 1; // 注意：月份从 0 开始，需要加 1
day.value = currentDate.getDate(); // 获取日期

})

var radioBox = ref({
  vestibule:{
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  
  "description": "前庭"
},
  store:{
    9: [],
    10:[],
    11:[],
    "description":"便利店"
  },
  tankFarm:{
  12: [],
  13: [],
  14: [],
  15: [],
  16: [],
  17: [],
  18: [],
  19: [],
  20: [],
  "description": "油罐区"
},
  electric:{
  22: [],
  23: [],
  24: [],
  25: [],
  26: [],
  "description": "电器设备"
},
  environment:{
    27:[],
    28:[],
    "description":"环保"
  }
})
var fillDailyChecking = ({
  vestibule:{},
  store:{},
  tankFarm:{},
  electric:{},
  environment:{}
})
const handleClick = (index, row) => {
  console.log(index,row.num);
  console.log(radioBox.value[tabName][row.num]);
  
  // fillDailyChecking[activeName.value][row.num] = []
  // fillDailyChecking[activeName.value][row.num][0]=radioBox.value[activeName.value][index][0]
  // console.log(radioBox.value['vestibule']['1']);
  // console.log(fillDailyChecking);
}

// 更换tabBar时触发，tabName即tabBar的英文名
const tabChange = (tabPaneName) =>{
  tabName.value = tabPaneName
  console.log(tabName.value);

}
</script>

<template>
  <div id="block" v-if="havaRightToCheck">
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

          <el-tab-pane label="油罐区" name="tankFarm">
            
          </el-tab-pane>
          <el-tab-pane label="电器设备" name="electric">
            
          </el-tab-pane>
          <el-tab-pane label="环保" name="environment">
            
          </el-tab-pane>
        </el-tabs>
        
    </div>
    <div class="desciptBox">
      <h5>加油站经理巡查及存在问题处理情况</h5>
      <textArea></textArea>
      <p>加油站经理：<input type="text"></p>
    </div>
    <div  id="annouce">
      <button id="annouceButton" @click="toAnnounceBulletin">提交</button>
    </div>
  </div>

  <div id="lock" v-else>
    <el-empty description="您无须填写该内容" />
  </div>
</template>

<style scoped>
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
  background-color: aqua;
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
  background-color: #f4f3f3;
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
  width: 90%;
  background-color: aqua;
}
</style>