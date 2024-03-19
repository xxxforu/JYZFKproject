<template>
  <div id="page">
    <div id="navAside">
      <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    active-text-color="#9f2f2e"
    popper-effect="light"
    background-color="#958b8c"
    text-color="#ffffff"
  >
  <div>
    <el-menu-item  id="message">
     <img id="navBarAvatar" v-show="!isCollapse"  src="../assets/image/未命名1677596819.png" alt="">
      <span v-show="!isCollapse">{{belong}}</span>
   </el-menu-item>
 </div>
  <router-link to="/main/bulletinBoards">
    <el-menu-item index="1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M192 413.952V896h640V413.952L512 147.328zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576"></path></svg>
      <template #title>公告板</template>
    </el-menu-item>
  </router-link>

    <el-sub-menu index="2">
      <template #title>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z"></path><path fill="currentColor" d="M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512z"></path></svg>
        <span>违规行为一览</span>
      </template>
      <el-menu-item-group>
        <router-link to="/main/checkViolationsVisual">
          <el-menu-item index="2-1">可视化设计</el-menu-item>
        </router-link>
        <router-link to="/main/checkViolationsList">
          <el-menu-item index="2-2">列表查看</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>

    <div v-if="role!=3">
  <router-link to="/main/gasStation">
    <el-menu-item index="3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M224 128v704h576V128zm-32-64h640a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32"></path><path fill="currentColor" d="M64 832h896v64H64zm256-640h128v96H320z"></path><path fill="currentColor" d="M384 832h256v-64a128 128 0 1 0-256 0zm128-256a192 192 0 0 1 192 192v128H320V768a192 192 0 0 1 192-192M320 384h128v96H320zm256-192h128v96H576zm0 192h128v96H576z"></path></svg>
      <template #title>加油站管理</template>
    </el-menu-item>
  </router-link>
</div>
    <el-sub-menu index="4">
      <template #title>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64z"></path></svg>
        <span>安全日志查看</span>
      </template>
      <el-menu-item-group>
        <router-link to="/main/visualSL">
          <el-menu-item index="4-1">可视化设计</el-menu-item>
        </router-link>
        <router-link to="/main/listSL">
          <el-menu-item index="4-2">列表查看</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-sub-menu>

    <div v-if="role==3">
    <router-link to="/main/writeSL">
    <el-menu-item index="6">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h192v64H320zm0 384h384v64H320z"></path></svg><template #title>安全巡检</template>
    </el-menu-item>
  </router-link>
  </div>

  <div>
     <el-menu-item  id="exitLogin" @click="open">
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></svg>
      <template #title><el-button  type="text">退出登录</el-button></template>
    </el-menu-item>
  </div>
  
   
  </el-menu>
  <div id="radioBox">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;position:absolute;z-index: 100;">
    <div v-show="isCollapse">
      <el-radio-button :label="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"></path></svg></el-radio-button>
    </div>
    <div v-show="!isCollapse">
    <el-radio-button :label="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"></path></svg></el-radio-button>
    </div>
  </el-radio-group>
  </div>
  </div>


  <div id="container">
    
    
    <router-view></router-view>
  </div>
</div>
  
  
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {}
const handleClose = (key, keyPath) => {}
const belong = localStorage.getItem("belong")
const role = localStorage.getItem("role")
var SLData={
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
}

onMounted(()=>{
  localStorage.setItem('SLData',SLData)
})
</script>

<script>
  export default {
    
    methods: {
      open() {
        this.$confirm('是否确定退出登录?', '提示', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 成功退出时清除缓存信息
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          localStorage.removeItem("belong")

          this.$router.push('/')
          //此组件自带的提示样式
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
         
        }).catch(() => {     
        });
      }
    }
  }
</script>
<style>
#container{
  position: relative;
  overflow: hidden;
  background-color: #f4f3f3;
}
.el-radio-button{
  --el-radio-button-checked-bg-color:#9f2f2e!important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  padding-top: 5vh;
  text-decoration: none;
}
#exitLogin .el-button > span{
  color: #fff;
}
#navAside > ul > li > div{
  font-weight: bold;
  font-size: 14px;
}
.el-menu-item{
  font-weight: bold;
  font-size: 20px;
}
.el-menu .is-active{
  font-weight: bold;
  font-size: 20px !important;
}
a{
  text-decoration: none !important;
}
#page{
  display: flex;
}
#navAside{
  height: 100vh;
  position: relative;
}
#radioBox{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  font-weight: bold;
  transform: translate(-50%,0);
  width:var(--el-menu-icon-width);
  height:var(--el-menu-icon-width);
}
#radioBox svg{
  color: #9f2f2e;
  margin: 0;
}
#container{
  width: 100%;
  height: 100vh;
}
#exitLogin{
  color: #fff !important;
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.el-menu-vertical-demo  svg,.el-radio-button__inner svg{
  margin-right: 5px;
  width: var(--el-menu-icon-width);
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
.el-sub-menu{
  height: fit-content;
}
.el-menu--inline{
  height: fit-content;
  padding-top: 0 !important;
}
#navBarAvatar{
  width: 50px;
  height: 50px;
  margin-right:10%;
}
#message{
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5vh;
}
.el-menu-item-group__title{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
#message span {
  font-size: 20px;
}
</style>
