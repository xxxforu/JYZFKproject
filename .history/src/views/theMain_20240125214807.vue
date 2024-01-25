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
  <!-- 可纵向收缩的导航 暂时没有这个设计 -->
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu> -->
    <router-link to="/main/checkViolations">
      <el-menu-item index="1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z"></path><path fill="currentColor" d="M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512z"></path></svg>
      <template #title>违规行为一览</template>
      
      </el-menu-item>
    </router-link>
  <router-link to="/main/gasStation">
    <el-menu-item index="2">
      <!-- <el-icon><House /></el-icon> -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M224 128v704h576V128zm-32-64h640a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32"></path><path fill="currentColor" d="M64 832h896v64H64zm256-640h128v96H320z"></path><path fill="currentColor" d="M384 832h256v-64a128 128 0 1 0-256 0zm128-256a192 192 0 0 1 192 192v128H320V768a192 192 0 0 1 192-192M320 384h128v96H320zm256-192h128v96H576zm0 192h128v96H576z"></path></svg><template #title>加油站管理</template>
    </el-menu-item>
  </router-link>
  <router-link to="/main/checkSL">
    <el-menu-item index="3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64z"></path></svg>
      <template #title>安全日志查看</template>
    </el-menu-item>
  </router-link>
<router-link to="/main/writeGSI">
    <el-menu-item index="4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"></path><path fill="currentColor" d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"></path></svg>
      <template #title>站点信息修改</template>
    </el-menu-item>
    </router-link>
    <router-link to="/main/writeSL">
    <el-menu-item index="5">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h192v64H320zm0 384h384v64H320z"></path></svg><template #title>安全日志填报</template>
    </el-menu-item>
  </router-link>
  <router-link to="/main/urgentAsk">
    <el-menu-item index="6">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.056 461.056 0 0 1-206.912-48.384l-175.616 58.56z"></path><path fill="currentColor" d="M352 576h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32m32-192h256q32 0 32 32t-32 32H384q-32 0-32-32t32-32"></path></svg>
      <template #title>智能紧急问答</template>
    </el-menu-item>
  </router-link>
  <div>
     <el-menu-item index="7" id="exitLogin" @click="open">
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></svg>
      <template #title><el-button  type="text">退出登录</el-button></template>
    </el-menu-item>
  </div>
   
    <!-- 如果要禁用 就在el-menu-item 标签里加一个属性disabled 可以考虑在权限分配时加入 -->
    <!-- <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item> -->
    <!-- <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item> -->
  </el-menu>
  <div id="radioBox">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
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
import { ref } from 'vue';

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

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
          this.$router.push('/')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
         
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消退出'
          // });          
        });
      }
    }
  }
</script>
<style>
.el-radio-button{
  --el-radio-button-checked-bg-color:#9f2f2e!important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  padding-top: 10vh;
  text-decoration: none;
}
.el-button > span{
  color: #606266;
}
.el-menu-item{
  font-weight: bold;
  font-size: 20px;
}
.is-active{
  font-weight: bold;
  font-size: 20px;
}
li{
  text-decoration: none;
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
  width:var(--el-menu-icon-width);
  height:var(--el-menu-icon-width);
}
#radioBox svg{
  color: #9f2f2e;
  margin: 0;
}
#container{
  width: 100%;
  height: 100%;
}
#exitLogin{
  color: #606266 !important;
  width: 100%;
  position: absolute;
  bottom: 10px;
}
svg{
  margin-right: 5px;
    width: var(--el-menu-icon-width);
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
}
</style>
