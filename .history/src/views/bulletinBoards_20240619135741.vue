<script setup>
import { Search } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NoticeBox from '../components/NoticeBox.vue';
const router = useRouter()
// const route = useRoute()
var search = ref('')
var activeName = ref('announcement')
var ableAnnounce = ref(false) //是否有权限发布通知
var annoucementList = ref([]) //当前页面需要渲染的通知详情数组，用于传参给组件NoticeBox
var currentPage = ref(1) //当前页，用于接口传参
var lastPage = ref(0) //最后一页，用于分页条
var type = ref(1) //当前查看的类别
var showCutLine = ref(false)
var role = localStorage.getItem("role") == 1 ? "central" : "branch";
// 后端补的加油站接口名不一样 所以得另起一个变量做url
var questURL = localStorage.getItem("role") == 3 ? "/petrol/getPetrolAnnouncementList?" : '/' + role + '/getAnnouncementList?'

onMounted(() => {
  if (role == "central") {//总/分公司管理员，那就可以发布通知
    ableAnnounce.value = true
  }
  // 一进页面就调接口
  if (role == "petrol") {
    axios.get(questURL + 'type=1&page=' + currentPage.value + '&size=8').then(res => {
      if (res.data.code != 0) ElMessage.error(res.data.msg)
      else {
        // console.log(res.data);
        annoucementList.value = res.data.data.data
        lastPage.value = res.data.data.lastPage * 10
        if (annoucementList.value.length < 8) showCutLine.value = true
      }
    })
  } else {
    axios.get(questURL + 'type=1&page=' + currentPage.value + '&size=8').then(res => {
      if (res.data.code != 0) ElMessage.error(res.data.msg)
      else {

        annoucementList.value = res.data.data.data
        lastPage.value = res.data.data.lastPage * 10
        if (annoucementList.value.length < 8) showCutLine.value = true
      }
    })
  }


})

// 类别改变
const handleClick = (tab, event) => {
  search.value = ""
  type.value = event.target.innerText == "公告" ? 1 : event.target.innerText == "通知" ? 2 : 3;

  axios.get(questURL + 'type=' + type.value + '&page=' + currentPage.value + '&size=8').then(res => {
    if (res.data.code != 0) ElMessage.error(res.data.msg)
    else {

      annoucementList.value = res.data.data.data
      lastPage.value = res.data.data.lastPage * 10
      if (annoucementList.value.length < 8) showCutLine.value = true
      else showCutLine.value = false
    }
  })

}

// 点击分页条
const handleChangePage = (value) => {
  currentPage.value = value
  axios.get(questURL + 'type=' + type.value + '&page=' + currentPage.value + '&size=8').then(res => {
    if (res.data.code != 0) ElMessage.error(res.data.msg)
    else {

      annoucementList.value = res.data.data.data
      lastPage.value = res.data.data.lastPage * 10
      if (annoucementList.value.length < 8) showCutLine.value = true
      else showCutLine.value = false
    }
  })
}



//搜索框内容改变后失焦/回车键触发搜索
const goSearch = (searchContent) => {
  const searchURL = localStorage.getItem("role") == 3 ? "/petrol/searchPetrolAnnouncement" : '/' + role + '/searchAnnouncement'
  axios.get(searchURL, {
    params: {
      type: type.value,
      keyWord: searchContent,
      page: 1,
      size: 8
    }
  }).then(res => {
    if (res.data.code != 0) ElMessage.error(res.data.msg)
    else {

      annoucementList.value = res.data.data.data
      if (annoucementList.value.length < 8) showCutLine.value = true
      else showCutLine.value = false
      lastPage.value = res.data.data.lastPage * 10
      currentPage.value = 1
    }
  })
}

// 转去发布公告页面
const toAnnounceBulletin = () => {
  router.push({
    path: '/main/announceBulletin'
  })
}
</script>

<template>
  <h1 id="title">公告板</h1>
  <div id="navSearchBar">
    <el-input v-model="search" class="w-50 m-2" placeholder="搜索当前类别主题" :prefix-icon="Search" clearable
      @change="goSearch" />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">

      <el-tab-pane label="公告" name="announcement">
        <NoticeBox v-for="item in annoucementList" :key="item.id" :content="item.content" :title="item.tittle"
          :type="item.type" :date="item.createDate" :file="item.file" /><el-pagination v-if="lastPage > 1"
          hide-on-single-page background layout="prev, pager, next" :total="lastPage" class="mt-4"
          @current-change="handleChangePage" />
        <el-divider v-if="showCutLine">
          *
        </el-divider>

      </el-tab-pane>
      <el-tab-pane label="通知" name="notice">
        <NoticeBox v-for="item in annoucementList" :key="item.id" :content="item.content" :title="item.tittle"
          :type="item.type" :date="item.createDate" :file="item.file" /><el-pagination v-if="lastPage > 1"
          hide-on-single-page background layout="prev, pager, next" :total="lastPage" class="mt-4"
          @current-change="handleChangePage" />
        <el-divider v-if="showCutLine">
          *
        </el-divider>

      </el-tab-pane>
      <el-tab-pane label="安全知识普及" name="popularize">
        <NoticeBox v-for="item in annoucementList" :key="item.id" :content="item.content" :title="item.tittle"
          :type="item.type" :date="item.createDate" :file="item.file" /><el-pagination v-if="lastPage > 1"
          hide-on-single-page background layout="prev, pager, next" :total="lastPage" class="mt-4" />
        <el-divider v-if="showCutLine">
          *
        </el-divider>

      </el-tab-pane>
    </el-tabs>

  </div>
  <el-pagination hide-on-single-page background layout="prev, pager, next" :total="50" class="mt-4" />
  <div v-if="ableAnnounce" id="annouce">
    <button id="annouceButton" @click="toAnnounceBulletin">+</button>
  </div>


</template>

<style scoped>
#annouceButton {
  background-color: var(--el-color-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  color: #fff;
}

#annouce {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 7vh;
  z-index: 10;
  background-color: #d9d9d9;
  border-radius: 20px 20px 0 0;

}

.el-tab-pane {
  height: 80vh;
  overflow: auto;
  scroll-behavior: smooth;
  margin-bottom: 7vh;
}

::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}

.container-wrapper {
  overflow: hidden
}

#navSearchBar {
  margin-top: 2vh;
  position: relative;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;

}

.demo-tabs {
  padding: 0 3%;
}

.el-icon svg {
  margin-right: 0 !important;
}

#title {
  margin-top: 10px;
  color: var(--el-color-primary);
}

.el-input {
  z-index: 10;
  width: 25%;
  position: absolute;
  top: 0;
  right: 5%;
}

.el-pagination {
  width: fit-content;
  margin: 10px auto;
}
</style>