<!--违规行为一览_可视化统计-->
<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from 'vue';
// import { useRoute } from 'vue-router'

import * as echarts from "echarts";
var role = localStorage.getItem("role")==1?"central":localStorage.getItem("role")==2?"branch":"petrol";
var belong = localStorage.getItem('belong')
var status = ref('central')


const radio1 = ref('当天')
var flag = ref(1)

const clickTest = function () {
  if(radio1.value == "当天") flag.value= 1
  else flag.value=0

  init1()
}



//!图一数据 ||缺少判断是哪个加油站/分公司
var eInfo0 =reactive({})
var eInfo1 =reactive({})



//!图二数据 ||传eg：type=1(/2/3/4) （某违规类型）缺传某个加油站/分公司的编号？
const eInfo2 =ref([])
// axios.get('http://127.0.0.1:4523/m1/3942191-0-default/petrol/getPetrolIllegalBehaviorCount?type=1').then(res => {
//   eInfo2.value= res.data.data
//   console.log(res.data);

//   console.log(eInfo2.value)

//   console.log('aaa-aaa');
//   console.log(eInfo2.value.month1)
//   console.log('!!!')
// })






const echart1=ref()

// var myChart1 = echarts.init(echart1.value);
function init1() {
  axios.get('/'+role+'/getPetrolIllegalBehavior?flag='+flag.value).then(res => {
  eInfo0= res.data.data
  console.log(res.data.data);
})
  console.log(eInfo1.value);
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
          {value: eInfo1.value.checking, name: '违规收费'},//=> value: checking
          {value: eInfo1.value.phone, name: '打手机'},//=> value: phone
          {value: eInfo1.value.work, name: '检修区不规范'},//=> value: work
          {value: eInfo1.value.hat, name: '未戴安全帽'},//=> value: hat
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
}

//图表2
const data2 = ref([
  {value: 170, month: '1月'},
  {value: 100, month: '2月'},
  {value: 220, month: '3月'},
  {value: 250, month: '4月'},
])

const echart2=ref()
onMounted(
    ()=>{
      init2()
    }
)
function init2(){
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

}

const valuea = ref('所有加油站')
const optiona = [
  {
    value: 'All',
    label: '所有加油站',
  },
  {
    value: 'Option2',
    label: '(分公司xx / )加油站1',
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
//接口

// const route = useRoute()
// // const dataList1 = ref([])
// //
// // const getFindInfo1 = async () => {
// //   const res = await getFindInfo1(route.query.FindInfo1)
// //   dataList1.value = res.result
// //    }
// // onMounted(() => getFindInfo1())
// (async () => {
//   const ins = axios.create({
//     baseURL: 'http://localhost:8080/main'
//   })
//   const res1 = await ins.get('/get',{
//     params: {
//       name: 'zhangs',
//       age: 18
//     }
//   })
//
// })

// var msg =ref('123')
// let eventOut = function () {
//
//  msg.value++
// }
//导出接口
// const route = useRoute()

// axios.get('http://111.230.198.4:7001/api/central/exportData?startDate=2024-02-01&endDate=2024-02-29&pidList=77101').then(res => {
//   console.log(res.data);
// })
// const eventOut = (tab,event)=>{
//  console.log(tab,event);
// }

//  let eventOut = function (){
//    var axios = require('axios');
//
//    var queryParam = {
//      startDate: '2024-02-01',// !'***' => this.startDate!
//      endDate: '2024-02-29',// !'***' => this.endDate!
//      pidList: '77101'// !'***' => this.pid! //加油站编号
//    }
//
//    var config = {
//      method: 'get',
//      url: 'http://127.0.0.1:4523/m1/3942191-0-default/central/getPetrolIllegalBehavior',
//      headers: {
//        'Content-Type': 'application/json',
//        'Accept': '*/*',
//        // 'Host': '111.230.198.4:7001',
//        // 'Connection': 'keep-alive'
//      },
//      params: queryParam
//    };
//    var that = this;
//    axios(config)
//        .then(function (response) {
//          var data= response.data.data;
//          localStorage.setItem("token",data.token)
//          localStorage.setItem("role",data.role)
//          localStorage.setItem("belong",data.belong);
//          //  设置好localStorage后再跳转页面
//          that.$router.push({path:"/visualSL"})
//        })
//        .catch(function (error) {
//          console.log(error);
//        });
//
//  }


</script>

<template>
  <!--  <div>可视化设计8899</div>-->
  <!--  <div>-->
  <!--    <e-charts class="chart" :option="option" />-->
  <!--  </div>-->
  <div class="bodyPagevSL">
    <!-- <div>
      <div style="width: 500px; height:100px; float: left;"></div>
      <div style="width: 35%; height:100px; float: right;">
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
          <el-button type="primary" style="margin-left: 30px" @click="eventOut">一键导出</el-button>

        </div>
      </div>
    </div> -->
    <br/>


    <div>


      <div class="box">
        <div style="float: right ; margin-right: 20px; margin-top: 10px">
          <el-radio-group v-model="radio1" @change="clickTest" >
            <el-radio-button label="当天"></el-radio-button>
            <el-radio-button label="近七天"></el-radio-button>
          </el-radio-group>
        </div>


        <div class="chart" ref="echart1" style="margin-right: 20px; float: left"></div>

      </div>
      <div class="box" style="height: 400px; width: 25px; opacity: 0"></div>
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


        <div class="chart" ref="echart2" style="float: left; margin-left: 30px;"></div>
      </div>

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
  /*!*background-color: #ffffff;*!*/
  width: 90%;
  /*margin-top: 50px;*/
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
