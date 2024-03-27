<!--违规行为一览_可视化统计-->
<script setup>
import axios from "axios";
import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router'

import * as echarts from "echarts";


var role = localStorage.getItem("role")==1?"central":localStorage.getItem("role")==2?"branch":"petrol";
var belong = localStorage.getItem('belong')
var status = ref('central')


const radio1 = ref('当天')
var flag = ref(1)

onMounted(()=>{
  init1()
  init2()
})
const clickTest = function () {
  if(radio1.value == "当天") flag.value= 1
  else flag.value=0
  init1()
  
}




//图表1
const echart1=ref()
function init1() {
  var eInfo0 = {}
  axios.get('/'+role+'/getPetrolIllegalBehavior?flag='+flag.value).then(res => {
  eInfo0={...res.data.data}
  console.log(eInfo0);

  var myChart1 = echarts.init(echart1.value);
  var option1 = {
    title: {
      text: '违规行为的类型分布',
      x: 'center',
      bottom: '50px',
    },
    tooltip: {
      trigger: 'item',
      left: 'left',
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
          {value: eInfo0.checking, name: '未正确摆放护栏'},
          {value: eInfo0.existPerson, name: '卸油区有人'},
          {value: eInfo0.fire, name: '发生火灾'},
          {value: eInfo0.hat, name: '检修区未戴安全帽'},
          {value: eInfo0.phone, name: '打电话'},
        ],
        //.value.map(d => d.value),
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

//图表2


const echart2=ref()
function init2(){
  axios.get('/'+role+'/getPetrolIllegalBehaviorCount?type='+typeValue.value).then(res=>{
    console.log(res.data.data);
    var data = res.data.data
    const data2 = ref([
  {value: data.month1, month: '1月'},
  {value: data.month2, month: '2月'},
  {value: data.month3, month: '3月'},
  {value: data.month4, month: '4月'},
  {value: data.month5, month: '5月'},
  {value: data.month6, month: '6月'},
])
var myChart2=echarts.init(echart2.value);
  var option2={
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
      data: data2.value.map(d => d.month)
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data2.value.map(d =>d.value),
        type: 'line',

      }
    ]

  };

  myChart2.setOption(option2);

  })

  

}

const typeValue = ref(1)
const optionb = [
  {
    value: 1,
    label: '打电话',
  },
  {
    value: 2,
    label: '未正确摆放护栏',
  },
  {
    value: 3,
    label: '未带安全帽',
  },
  {
    value: 4,
    label: '发生火灾',
  },
  {
    value: 5,
    label: '卸油区有人',
  },
]
const changeRadio = function(){
  console.log(typeValue.value);
  init2()
}


</script>

<template>
  <div class="bodyPagevSL">
      <div class="box">
        <div style="float: right ; margin-right: 20px; margin-top: 10px">
          <el-radio-group v-model="radio1" @change="clickTest" >
            <el-radio-button label="当天"></el-radio-button>
            <el-radio-button label="近七天"></el-radio-button>
          </el-radio-group>
        </div>


        <div class="chart" ref="echart1" style="margin-right: 20px; float: left"></div>

      </div>
      <div class="box">
        <div style="float: left; margin-left: 20px; margin-top: 10px; color: #ffde59;">
          <el-select
              v-model="typeValue"
              class="m-2"
              placeholder=""
              size=""
              style="width: 150px"
              @change="changeRadio"
          >
            <el-option
                v-for="item in optionb"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>


        <div class="chart" ref="echart2" style="float: left; margin-left: 30px;"></div>
      </div>
  </div>



</template>



<style scoped>
.bodyPagevSL {
  background-color: #f4f3f3;
  height: 100vh;
  background-size:cover;
  z-index:-1;
}
.chart {
  height: 400px;
  width: 90%;
  margin: 10px
  display: inline-block;
  /*padding-right: -20px;*/
}
.box {
  height: 400px;
  width: 47%;
  background-color: #ffffff;
  display: inline-block;
  margin-left: 5px;

}
</style>
