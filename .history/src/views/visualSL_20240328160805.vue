<!--安全日志查看_可视化统计-->
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

import * as echarts from "echarts";

const radio1 = ref('当天')
const radio2 = ref('当天')
const flag1=ref(1)
const flag2=ref(1)
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



//图表一
const echart1=ref()
onMounted(
    ()=>{
      init1()
    }
)
function init1() {
  // 由于全都没有数据 所以都还没有绑定渲染处的数据
  var requesrURL = localStorage.getItem('role')==3?'/petrol/getPetrolItemException':'/branch/getItemException'
  axios.get(requesrURL+'?flag='+flag1.value).then(res=>{
    // console.log(res.data);
    var data = res.data.data

    var myChart1 = echarts.init(echart1.value);
  var option1 = {
     title: {
       text: '存有异常的巡检项目分布',
       x: 'center',
       top:'10px',
       y: 'center',
       bottom: 'auto'
     },
    tooltip: {
      trigger: 'item',
      left: 'left'
    },
    legend: {
      orient: 'vertical',
      x: '80%',
      y: '10%',
      textStyle: {
        fontWeight: 700,
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['50%','50%'],
        radius: '50%',
        data: [
          { value: data.vestibule, name: '前庭' },
          { value: data.store, name: '便利店' },
          { value: data.tankFarm, name: '油罐区' },
          { value: data.electric, name: '电器设备' },
          { value: data.environment, name: '环保' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]

  };

  myChart1.setOption(option1);
  })
  
}
function radio1Change(){
  if(radio1.value == "当天") flag1.value= 1
  else flag1.value=0
  init1()
}


//图表二
const echart2=ref()
onMounted(
    ()=>{
      init2()
    }
)
function init2() {
  var requesrURL = localStorage.getItem('role')==3?'/petrol/getPetrolOneItemContentException':'/branch/getOneItemContentException'
  axios.get(requesrURL+'?item='+select.value+'&flag='+flag2.value).then(res=>{
    var requestData =  res.data.data
    var selected = ""
    switch (select.value){
      case '前庭':
        selected='vestibule'
        break;
      case '便利店':
        selected='store'
        break;
      case '油罐区':
        selected='bankFarm'
        break;
      case '电器设备':
        selected='electric'
        break;
      case '环保':
        selected='environment'
        break;
    }
    var currentItems = SLData.value[selected]
    console.log(currentItems)
    var data = []
    for(let i in requestData){
      // console.log(i);
      for(let j in currentItems){
        console.log(j);
        if(i==j.num) console.log(j.checkContent);
      }
    }
  })
  var myChart2 = echarts.init(echart2.value);
  var option2 = {
    tooltip: {
      trigger: 'item',
      left: 'left'
    },
    legend: {
      orient: 'vertical',
      x: '10%',
      y: '10%',
      textStyle: {
        fontWeight: 700,
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['75%','40%'],
        radius: '50%',
        data: [
          { value: 735, name: '前庭(/xx)内容1' },
          { value: 580, name: '前庭(/xx)内容2' },
          { value: 484, name: '前庭(/xx)内容3' },
          { value: 300, name: '前庭(/xx)内容4' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]

  };

  myChart2.setOption(option2);
}
function changeChart2(){
  select1.value = optionb[select.value][0].label
  console.log("changeChart2:"+select.value);
  if(radio2.value == "当天") flag2.value= 1
  else flag2.value=0
  init2()
}
function changeChart4(){
  console.log(select1.value);
  init4()
}

//图表三
const echart3=ref()
onMounted(
    ()=>{
      init3()
    }
)
function init3(){
  var requesrURL = localStorage.getItem('role')==3?'/petrol/getPetrolItemTotalException':'/branch/getItemTotalException'
  axios.get(requesrURL).then(res=>{
    if(res.data.data){

  var myChart3=echarts.init(echart3.value);
  var option3={
    title: {
      text: '存有异常的巡检内容总次数统计',
      x: 'center',
      y: 'top',
    },
    grid: {
      top: '55px',
      bottom:'15%',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',

      }
    ]

  };
  for(let i in res.data.data){
    option3.xAxis.data.push(i)
    option3.series[0].data.push(res.data.data[i])
  }
  myChart3.setOption(option3);
    }
  })
  

}

//图表四
const echart4=ref()
onMounted(
    ()=>{
      init4()
    }
)
function init4(){
  var requesrURL = localStorage.getItem('role')==3?'/petrol/getPetrolOneContentException':'/branch/getOneContentException'
  axios.get(requesrURL+'?content='+select1.value).then(res=>{
    if(res.data.data){

  var myChart4=echarts.init(echart4.value);
  var option4={
    title: {
      text: '某巡检内容出现异常的次数统计',
      x: 'center',
      y:'top',
    },
    grid: {
      // x: '20px',
      // y:'32px',
      top: '55px',
      bottom:'15%',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',

      }
    ]

  };
  for(let i in res.data.data){
    option4.xAxis.data.push(i)
    option4.series[0].data.push(res.data.data[i])
  }
  myChart4.setOption(option4);
    }
  })
  

}

const select = ref('前庭')
const optiona = [
  {
    value: '前庭',
    label: '前庭',
  },
  {
    value: '便利店',
    label: '便利店',
  },
  {
    value: '油罐区',
    label: '油罐区',
  },
  {
    value: '电器设备',
    label: '电器设备',
  },
  {
    value: '环保',
    label: '环保',
  },
]

const optionb = {
  '前庭':[
    {
      value:1,
      label:"员工形象"
    },{
      value:2,
      label:"服务"
    },{
      value:3,
      label:"现场安全"
    },{
      value:4,
      label:"场地"
    },{
      value:5,
      label:"消防器材"
    },{
      value:6,
      label:"加油机"
    },{
      value:7,
      label:"照明灯具"
    },{
      value:8,
      label:"罩棚"
    }
  ],
  '便利店':[
    {
      value:9,
      label:"卫生"
    },
    {
      value:10,
      label:"服务"
    },
    {
      value:11,
      label:"消防器材"
    }
  ],
  '油罐区':[
    {
      value:12,
      label:"罐区"
    },
    {
      value:13,
      label:"操作井"
    },
    {
      value:14,
      label:"通气管"
    },
    {
      value:15,
      label:"卸油区"
    },
    {
      value:16,
      label:"消防器材"
    },
    {
      value:17,
      label:"静电报警器"
    },
    {
      value:18,
      label:"液位仪"
    },
    {
      value:19,
      label:"潜油泵"
    },
    {
      value:20,
      label:"油气回收"
    },
    {
      value:21,
      label:"油罐"
    }
  ],
  '电器设备':[
    {
      value:22,
      label:"开关柜"
    },{
      value:23,
      label:"配电箱"
    },{
      value:24,
      label:"发电机"
    },{
      value:25,
      label:"照明设备"
    },{
      value:26,
      label:"消防器材"
    }
  ],
  '环保':[
    {
      value:27,
      label:"隔油池"
    },{
      value:28,
      label:"卫生间"
    }
  ]
}
const select1 = ref(optionb[select.value][0].value)

</script>

<template>
  <div class="bodyPagevSL">

    <div class="gridBox">
      <div class="box">
        <div class="dayChoose">
          <el-radio-group v-model="radio1" @change="radio1Change" >
            <el-radio-button label="当天"/>
            <el-radio-button label="近七天" />
          </el-radio-group>
        </div>
        <div class="chart" ref="echart1"></div>
  
      </div>
  
  
      <div class="box">
        <div style="float: left; margin-left: 20px; margin-top: 10px; color: #ffde59;">
          <el-select
              v-model="select"
              class="m-2"
              placeholder=""
              size=""
              style="width: 150px"
              @change="changeChart2"
          >
            <el-option
                v-for="item in optiona"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
  
        <div class="dayChoose" >
          <el-radio-group v-model="radio2"  @change="changeChart2">
            <el-radio-button label="当天" />
            <el-radio-button label="近七天" />
          </el-radio-group>
        </div>
        <div class="chart" ref="echart2" style="float: left"></div>
      </div>
  
      <!-- <div>
        <div class="VL_title" >存有异常的巡检内容总次数统计</div>
        <div class="VL_title" >某巡检项目出现异常的次数统计</div>
      </div> -->
  
      <div class="box">
        <div class="chart" ref="echart3" style="width: 95%;"></div>
      </div>


      <div class="box">
        <div style="color: #ffde59;position:relative;top:0;left:0;width:fit-content;transform:translate(0,-100%)">
          <el-select
              v-model="select1"
              class="m-2"
              placeholder=""
              size=""
              style="width: 150px"
              @change="changeChart4"
          >
            <el-option
                v-for="item in optionb[select]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
  
        <div class="chart" ref="echart4" style="position:relative;top:-32px;left:0; width: 95%;"></div>
  
  
      </div>
  
    </div>
    


  </div>



</template>



<style scoped>
/*page {*/
/*  background-color: #f4f3f3;*/
/*  height: 100vh;*/
/*}*/
.bodyPagevSL {
  background-color: #f4f3f3;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
/*body {*/
/*  background-color: #f4f3f3;*/
/*  height: 100vh;*/
/*}*/
.chart {
  min-width: 30vw;
  min-height: 30vh;
  height: 100%;
  margin: auto;
  width: 90%;
}
.box {
  position: relative;
  min-width: min-content;
  background-color: #ffffff;
  display: inline-block;
  /*margin-left: 15px;*/
  /*margin-top: 15px;*/
  /*margin-bottom: 10px;*/

}
.select_item {
  font-size: 14px;
}
.VL_title {
  display: inline-block;
  width: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  padding-top: 5px
}

/* pp添加部分 */
.topBox{
  float: right;
  display: block;
  margin-right: 20px;
}
.gridBox{
  margin: auto;
  height: 90%;
  width: 95%;
  display: grid;
  grid-template-columns: 45% 45%;
  grid-template-rows: 45% 45%;
  row-gap: 10%;
  column-gap: 10%;
}
.dayChoose{
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(0,-50%);
}
</style>