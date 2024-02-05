<script setup>
import { Search } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import NoticeBox from '../components/NoticeBox.vue';
  const search = ref('')
  const activeName = ref('announcement')

  const handleClick = (tab,event)=>{
    console.log(tab,event);
  }
  onMounted(()=>{
    localStorage.setItem('role',0)
    // const role = localStorage.getItem("role")
  })
  </script>

<template>
  <h1 id="title">公告板</h1>
  <div id="navSearchBar">
    <el-input
        v-model="search"
        class="w-50 m-2"
        placeholder="搜索主题/内容"
        :prefix-icon="Search"
        clearable
      />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="公告" name="announcement">
          <NoticeBox /><NoticeBox /><NoticeBox />
          <NoticeBox /><NoticeBox /><NoticeBox />
        </el-tab-pane>
        <el-tab-pane label="通知" name="notice">
          <NoticeBox /><NoticeBox /><NoticeBox />
        </el-tab-pane>
        <el-tab-pane label="安全知识普及" name="popularize">
          <NoticeBox /><NoticeBox />
        </el-tab-pane>
      </el-tabs>
      
  </div>
  <div id="annouce">11111111</div>
  
  
</template>

<style scoped> 
#annouce{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 7vh;
  z-index: 10;
  background-color: #d9d9d9;
  border-radius: 20px 20px 0 0;
  scroll-behavior: smooth;
}
.el-tab-pane{
  height: 80vh;
  background-color:aquamarine;
  overflow: scroll;
  
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
.el-input{
  z-index: 10;
  width: 25%;
position: absolute;
top: 0;
right: 5%;
}
</style>