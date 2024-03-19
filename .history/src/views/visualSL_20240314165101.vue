<!--安全日志查看_可视化统计-->
<script setup>
import { onMounted, ref } from 'vue';

import * as echarts from "echarts";

const radio1 = ref('当天')
const radio2 = ref('当天')

//!111
const eInfo1 =ref([])
// axios.get(' http://127.0.0.1:4523/m1/3942191-0-default/branch/getItemException?flag=1').then(res => {
//   eInfo1.value= res.data.data
//   console.log(res.data);
//   console.log('!!!')
//   console.log(eInfo1.value);

// })


//图表一
const echart1=ref()
onMounted(
    ()=>{
      init1()
    }
)
function init1() {
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
      x: '400px',
      y: '50px',
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
//图表二
const echart2=ref()
onMounted(
    ()=>{
      init2()
    }
)
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

const valuea = ref('qian')
const optiona = [
  {
    value: 'qian',
    label: '前庭',
  },
  {
    value: 'bian',
    label: '便利店',
  },
  {
    value: 'you',
    label: '油罐区',
  },
  {
    value: 'dian',
    label: '电器设备',
  },
  {
    value: 'huan',
    label: '环保',
  },
]
const valueb = ref('qian')
const optionb = [
  {
    value: 'qian',
    label: '前庭',
  },
  {
    value: 'bian',
    label: '便利店',
  },
  {
    value: 'you',
    label: '油罐区',
  },
  {
    value: 'dian',
    label: '电器设备',
  },
  {
    value: 'huan',
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

      <span style="display: inline-block; height: 32px; margin:0 10px">
        <svg style="transform:translate(0,6px)"  width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" size="14px"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </span>
    </div>
    <!-- <div>
      <div class="VL_title" >存有异常的巡检项目分布</div>
      <div class="VL_title" >某巡检项目的存有异常的巡检内容分布</div>
    </div> -->

    <div class="gridBox">
      <div class="box">
        <div class="dayChoose">
          <el-radio-group v-model="radio1" >
            <el-radio-button label="当天" />
            <el-radio-button label="近七天" />
          </el-radio-group>
        </div>
        <div class="chart" ref="echart1"></div>
  
      </div>
  
  
      <div class="box">
        <div style="float: left; margin-left: 20px; margin-top: 10px; color: #ffde59;">
          <el-select
              v-model="valuea"
              class="m-2"
              placeholder=""
              size=""
              style="width: 150px"
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
              v-model="valueb"
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