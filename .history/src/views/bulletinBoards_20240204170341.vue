<script setup>
  import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import NoticeBox from '../components/NoticeBox.vue';
  const search = ref('')
  const activeName = ref('first')
  const handleClick = (tab,event)=>{
    console.log(tab,event);
  }
  
  </script>

<template>
  <h1 id="title">公告板</h1>
  <div id="navSearchBar">
    <el-input
        v-model="search"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
      />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="公告" name="announcement"><NoticeBox /></el-tab-pane>
        <el-tab-pane label="通知" name="notice">通知</el-tab-pane>
        <el-tab-pane label="安全知识普及" name="popularize">安全知识普及</el-tab-pane>
      </el-tabs>
  </div>
  
  
  
</template>

<style scoped> 
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
  width: 20%;
position: absolute;
top: 0;
right: 5%;
}
</style>