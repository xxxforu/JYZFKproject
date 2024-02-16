<!--违规行为一览_可视化统计-->
<script setup>
import { ref, onMounted } from 'vue';

import * as echarts from "echarts";

const radio1 = ref('当天')

const echart1=ref()
onMounted(
    ()=>{
      init0()
    }
)
function init0() {
  var myChart0 = echarts.init(echart1.value);
  var option0 = {
    title: {
      text: '违规行为的类型分布',
      x: 'center',
      // y: 'bottom',
      bottom: '50px'
    },
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
        center: ['40%','35%'],
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

  myChart0.setOption(option0);
}

const main=ref()
onMounted(
    ()=>{
      init1()
    }
)
function init1(){
  var myChart=echarts.init(main.value);
  var option1={
    title: {
      text: '违规类型次数统计',
      x: 'center',
      // y: 'bottom',
      bottom: '50px'
    },
    grid: {
      top: 30,
      bottom: 120,
      left: 30,
      x: 45,
      x2: 30,
      y2: 80,
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [75, 153, 124, 218, 135, 47, 60],
        type: 'line',

      }
    ]

  };

  myChart.setOption(option1);

}

const valuea = ref('所有加油站')
const optiona = [
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

const valueb = ref('违规收费')
const optionb = [
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
    <div style="color:#999999; text-align: left; font-size: 12px; padding-left: 6px; margin-top: 6px">查看方式</div>

    <div style="text-align: left; padding-left: 20px; margin-top: 5px; margin-bottom: 20px">
      <el-select
          v-model="valuea"
          class="m-2"
          placeholder="所有加油站"
          size="large"
          style="width: 240px"
      >
        <el-option
            v-for="item in optiona"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button type="primary" style="margin-left: 30px">一键导出</el-button>
    </div>


<div>


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

      <div class="chart" ref="main" style="float: left; margin-left: 30px;"></div>
    </div>

</div>



  </div>



</template>



<style scoped>
.bodyPagevSL {
  background-color: #f4f3f3;
  height: 100vh;
}
.chart {
  height: 400px;
  /*!*background-color: #ffffff;*!*/
  width: 90%;
  /*margin-top: 50px;*/
  display: inline-block;
  /*padding-right: -20px;*/
}
.box {
  height: 400px;
  width: 48%;
  background-color: #ffffff;
  display: inline-block;
  margin-left: 5px;

}
</style>