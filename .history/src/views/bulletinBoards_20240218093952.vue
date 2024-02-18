<script setup>
import { Search } from '@element-plus/icons-vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NoticeBox from '../components/NoticeBox.vue';
  const router = useRouter()
  // const route = useRoute()
  const search = ref('')
  const activeName = ref('announcement')
  const ableAnnounce = ref(false) //是否有权限发布通知
  
  const handleClick = (tab,event)=>{
    console.log(tab,event);
  }
  onMounted(()=>{
    const role = localStorage.getItem("role")
    console.log(role);
    if(role=="1"||role=="2"){//总/分公司管理员，那就可以发布通知
      ableAnnounce.value = true
    }

    // 不同的身份接口不一样
    switch(role){
    case "1":{
      axios.get('/central/getAnnouncementList?type=1&page=1&size=8').then(res=>{
        console.log(res.data);
    })
    break;
    }
    case "2" :{
      axios.get('/branch/getAnnouncementList?type=1&page=1&size=8').then(res=>{
        console.log(res.data);
    })
    break;
    }
  }
  
  })

  const toAnnounceBulletin =()=>{
    router.push({
      path:'/main/announceBulletin'
  })
  }
  </script>

<template>
  <h1 id="title">公告板</h1>
  <div id="navSearchBar">
    <el-input
        v-model="search"
        class="w-50 m-2"
        placeholder="搜索主题 / 内容"
        :prefix-icon="Search"
        clearable
      />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      
        <el-tab-pane label="公告" name="announcement">
          <NoticeBox /><NoticeBox /><NoticeBox />
          <NoticeBox /><NoticeBox /><NoticeBox />
  <el-pagination
    hide-on-single-page
    small
    background
    layout="prev, pager, next"
    :total="50"
    class="mt-4"
  />
        </el-tab-pane>
        <el-tab-pane label="通知" name="notice">
          <NoticeBox /><NoticeBox /><NoticeBox />
  <el-pagination
    hide-on-single-page
    small
    background
    layout="prev, pager, next"
    :total="50"
    class="mt-4"
  />
        </el-tab-pane>
        <el-tab-pane label="安全知识普及" name="popularize">
          <NoticeBox /><NoticeBox />
  <el-pagination
    hide-on-single-page
    small
    background
    layout="prev, pager, next"
    :total="50"
    class="mt-4"
  />
        </el-tab-pane>
      </el-tabs>
      
  </div>
  <el-pagination
    hide-on-single-page
    small
    background
    layout="prev, pager, next"
    :total="50"
    class="mt-4"
  />
  <div v-if="ableAnnounce" id="annouce">
    <button id="annouceButton" @click="toAnnounceBulletin">+</button>
  </div>
  
  
</template>

<style scoped> 
#annouceButton{
  background-color: var(--el-color-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 28px;
  color: #fff;
}
#annouce{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 7vh;
  z-index: 10;
  background-color: #d9d9d9;
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
.el-input{
  z-index: 10;
  width: 25%;
position: absolute;
top: 0;
right: 5%;
}
.el-pagination{
  width: fit-content;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
}
</style>