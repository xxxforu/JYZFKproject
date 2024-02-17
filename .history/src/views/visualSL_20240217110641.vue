<!--安全日志查看_可视化统计-->
<script setup>
import { onMounted, ref } from 'vue';

import * as echarts from "echarts";

const radio1 = ref('当天')
const radio2 = ref('当天')

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
    // title: {
    //   text: '存有异常的巡检项目分布',
    //   x: 'center',
    //   //y: 'top',
    //   top:'0px',
    //   // y: 'bottom',
    //   //bottom: '50px'
    // },
    tooltip: {
      trigger: 'item',
      left: 'left'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      y: '30px',
      textStyle: {
        fontWeight: 700,
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['45%','40%'],
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
    // title: {
    //   text: '某巡检项目的存有异常的巡检内容分布',
    //   x: 'center',
    //   // y: 'bottom'
    //   // y: 'bottom',
    //   bottom: '50px'
    // },
    tooltip: {
      trigger: 'item',
      left: 'left'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      y: '30px',
      textStyle: {
        fontWeight: 700,
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['65%','40%'],
        radius: '50%',
        data: [
          { value: 735, name: '违规收费' },
          { value: 580, name: '未戴安全帽' },
          { value: 484, name: '打手机' },
          { value: 300, name: '检修区不规范' }
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
      y: 'top',
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

const valuea = ref('违规收费')
const optiona = [
  {
    value: 'All',
    label: '违规收费',
  },
  {
    value: 'Option2',
    label: '未戴安全帽',
  },
  {
    value: 'Option3',
    label: '打手机',
  },
  {
    value: 'Option4',
    label: '检修区不规范',
  },
]

</script>

<template>
<!--  <div>可视化设计8899</div>-->
<!--  <div>-->
<!--    <e-charts class="chart" :option="option" />-->
<!--  </div>-->
  <div class="bodyPagevSL">

    <div style="text-align: left; padding-left: 15px;padding-top: 10px;  margin-bottom: 20px">
      <div style="float: left; color:#999999; text-align: left; font-size: 14px; padding-left: 6px; margin-top: 6px">所有加油站（默认）</div>

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

      <span style="display: inline-block; height: 32px; align-items: center">
      <svg  width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20" size="14px"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </span>
    </div>
<div>
  <div style="display: inline-block; width: 50%; text-align: center;float: left;">存有异常的巡检项目分布</div>
  <div style="display: inline-block; width: 50%; text-align: center">某巡检项目的存有异常的巡检内容分布</div>
</div>

    <div class="box">
      <div style="float: right ; margin-right: 20px; margin-top: 10px">
        <el-radio-group v-model="radio1" >
          <el-radio-button label="当天" />
          <el-radio-button label="近七天" />
        </el-radio-group>
      </div>
      <div class="chart" ref="echart1" style="margin-right: 20px; float: left"></div>

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

      <div style="float: right ; margin-right: 20px; margin-top: 10px">
        <el-radio-group v-model="radio2" >
          <el-radio-button label="当天" />
          <el-radio-button label="近七天" />
        </el-radio-group>
      </div>
      <div class="chart" ref="echart2" style="float: left"></div>
    </div>

    <div class="box">
      <div class="chart" ref="echart3" style="margin-right: 20px; float: left"></div>
    </div>
    <div class="box">
      <div class="chart" ref="echart4" style=""></div>
    </div>



  </div>



</template>



<style scoped>
.bodyPagevSL {
  background-color: #f4f3f3;
  height: 100vh;
}
.chart {
  height: 320px;
  /*!*background-color: #ffffff;*!*/
  width: 85%;
  /*margin-top: 50px;*/
  /*margin-bottom: 10px;*/
  display: inline-block;
  /*padding-right: -20px;*/
}
.box {
  height: 310px;
  width: 46%;
  background-color: #ffffff;
  display: inline-block;
  margin: 15px 15px 10px 20px;
  /*margin-left: 15px;*/
  /*margin-top: 15px;*/
  /*margin-bottom: 10px;*/

}
.select_item {
  font-size: 14px;
}
.el-select > span{
  display: flex;
  justify-content: center;
  align-items: center;
}
.DocSearch-Search-Icon{
  margin-top: 20px;
}
</style>