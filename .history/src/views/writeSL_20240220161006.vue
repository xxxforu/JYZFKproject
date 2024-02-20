<script setup>
// import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
var role = localStorage.getItem('role')
var havaRightToCheck = ref(true)
var year = ref(); // 获取年份
var month = ref(); // 注意：月份从 0 开始，需要加 1
var day = ref(); // 获取日期
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
</script>

<template>
  <div id="block" v-if="havaRightToCheck">
    <h1 id="title">日常巡检报告</h1>
    <!-- <div id="date"><span>日期： </span>{{year}}年{{month}}月{{day}}日</div>
    <div id="projectSelect">
      <div>巡检项目<br/><span>选择项目巡检项目</span></div>
      
    </div> -->
    <div id="navSearchBar">
        <div id="date"><span>日期： </span>{{year}}年{{month}}月{{day}}日</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        
          <el-tab-pane label="公告" name="announcement">
            <NoticeBox
              v-for="item in annoucementList"
              :key="item.id"
              :content="item.content"
              :title="item.tittle"
              :type="item.type"
              :date="item.createDate"
            />
            <el-divider v-if="showCutLine">
              *
            </el-divider>
            <el-pagination
              v-if="lastPage > 1"
              hide-on-single-page
              small
              background
              layout="prev, pager, next"
              :total="lastPage"
              class="mt-4"
              @current-change="handleChangePage"
            />
          </el-tab-pane>
          <el-tab-pane label="通知" name="notice">
            <NoticeBox
              v-for="item in annoucementList"
              :key="item.id"
              :content="item.content"
              :title="item.tittle"
              :type="item.type"
              :date="item.createDate"
            />
            <el-divider v-if="showCutLine">
             *
            </el-divider>
            <el-pagination
              v-if="lastPage > 1"
              hide-on-single-page
              small
              background
              layout="prev, pager, next"
              :total="lastPage"
              class="mt-4"
              @current-change="handleChangePage"
            />
          </el-tab-pane>
          <el-tab-pane label="安全知识普及" name="popularize">
            <NoticeBox
              v-for="item in annoucementList"
              :key="item.id"
              :content="item.content"
              :title="item.tittle"
              :type="item.type"
              :date="item.createDate"
            />
            <el-divider  v-if="showCutLine">
              *
            </el-divider>
            <el-pagination
              v-if="lastPage > 1"
              hide-on-single-page
              small
              background
              layout="prev, pager, next"
              :total="lastPage"
              class="mt-4"
            />
          </el-tab-pane>
        </el-tabs>
        
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
  border-radius: 20px 20px 0 0;
  
}
.el-tab-pane{
  height: 80vh;
  overflow: auto;
  scroll-behavior: smooth;
  margin-bottom: 7vh;
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
</style>