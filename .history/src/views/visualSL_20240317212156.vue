<!--安全日志查看_可视化统计-->
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

import * as echarts from "echarts";

const radio1 = ref('当天')
const radio2 = ref('当天')
const flag1=ref(1)
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
  axios.get('/petrol/getPetrolItemException?flag='+flag1.value).then(res=>{
    console.log(res.data);
    // var data = res.data.data
  })
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
          { value: 735, name: '前庭' },
          { value: 580, name: '便利店' },
          { value: 484, name: '油罐区' },
          { value: 300, name: '电器设备' },
          { value: 300, name: '环保' },
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
}
function radio1Change(){
  if(radio1.value == "当天") flag1.value= 1
  else flag1.value=0
  init1()
}
//图表二
const echart2=ref()
function init2() {
  var myChart2 = echarts.init(echart2.value);
  var option2 = {
    tooltip: {
      trigger: 'item',
      left: 'left'
    },
    legend: {
      orient: 'vertical',
      x: '40px',
      y: '30px',
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

//图表三
const echart3=ref()
onMounted(
    ()=>{
      init3()
    }
)
function init3(){
  var myChart3=echarts.init(echart3.value);
  var option3={
    title: {
      text: '存有异常的巡检内容总次数统计',
      x: 'center',
      y: 'top',
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',

      }
    ]

  };

  myChart3.setOption(option3);

}

//图表四
const echart4=ref()
onMounted(
    ()=>{
      init4()
    }
)
function init4(){
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',

      }
    ]

  };

  myChart4.setOption(option4);

}

const value = ref('')
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

const select = ref('vestibule')
const optiona = [
  {
    value: 'vestibule',
    label: '前庭',
  },
  {
    value: 'store',
    label: '便利店',
  },
  {
    value: 'tankFarm',
    label: '油罐区',
  },
  {
    value: 'electric',
    label: '电器设备',
  },
  {
    value: 'environment',
    label: '环保',
  },
]
const select1 = ref('vestibule')
const optionb = [
  {
    value: 'vestibule',
    label: '前庭',
  },
  {
    value: 'store',
    label: '便利店',
  },
  {
    value: 'tankFarm',
    label: '油罐区',
  },
  {
    value: 'electric',
    label: '电器设备',
  },
  {
    value: 'environment',
    label: '环保',
  },
]

</script>

<template>
  <!--  <div>可视化设计8899</div>-->
  <!--  <div>-->
  <!--    <e-charts class="chart" :option="option" />-->
  <!--  </div>-->
  <div class="bodyPagevSL">

    <div class="topBox" style="text-align: right; padding-left: 15px;padding-top: 10px;  margin-bottom: 20px">
      <div style="float: left; color:#999999; text-align: left; font-size: 14px; padding-left: 6px; margin-top: 6px"></div>
      <el-select
          v-model="value"
          filterable
          placeholder="所有加油站（默认）"
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

      <!-- <span style="display: inline-block; height: 32px; margin:0 10px">
        <svg style="transform:translate(0,6px)"  width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" size="14px"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </span> -->
    </div>
    <!-- <div>
      <div class="VL_title" >存有异常的巡检项目分布</div>
      <div class="VL_title" >某巡检项目的存有异常的巡检内容分布</div>
    </div> -->

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
              @change="change"
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
          <el-radio-group v-model="radio2" >
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
          >
            <el-option
                v-for="item in optionb"
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