<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
var router = useRouter()
var form = reactive({
  receiver:[],
  title: '',
  type: 1,
  content: '',
})
var CP = ref({})
var options =ref([
  {
    value:[],
    label:'全部分公司',
    children:[]
  },{
    value:[],
    label:'全部加油站',
    children:[]
  }
])
onMounted(()=>{
  axios.get('/central/companyList').then(res=>{
    res.data.data.forEach(el => {
      CP.value[el.companyId]=[]
      // options.value[0].value.push(el.companyId)
      options.value[0].children.push({label:el.companyName,value:el.companyId})
      
      options.value[1].children.push({label:el.companyName,value:el.companyId})
    });

  axios.get('/central/petrolList').then(res=>{
    res.data.data.petrolList.forEach(el => {
      options.value[1].value.push(el.pid)
      CP.value[el.belongCompany].push(el)
    });
    options.value[1].children.forEach(el=>{
      var list = CP.value[el.value]
      el.children=[]
      list.forEach(item =>{
        el.children.push({label:item.petrolName,value:item.pid})
      })
    })
    //循环赋值完成后再放回options 
  })
  
    
  })
})

// 接收者选择器可多选
var props = {
  multiple: true,
}
// 提交表单发布
var onSubmit = () => {
  form.type=form.type=="公告"?1:form.type=="通知"?2:3
  var newReceive = []
  form.receiver.forEach(item=>{
    const len = item.length
    newReceive.push(item[len-1])
  })
  form.receiver = newReceive
  
  axios.post('/central/publishAnnouncement',JSON.stringify(form)).then(res=>{
    console.log();
  })
  var data = JSON.stringify(form);

var config = {
   method: 'post',
   url: 'http://111.230.198.4:7001/api/central/publishAnnouncement',
   headers: { 
      'Authorization': localStorage.getItem('token'), 
      'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)', 
      'Content-Type': 'application/json', 
      'Accept': '*/*', 
      'Host': '111.230.198.4:7001', 
      'Connection': 'keep-alive'
   },
   data : data
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
})
.catch(function (error) {
   console.log(error);
});

}



var backToBB =()=>{
  router.push({
      path:'/main/bulletinBoards'
  })
}
</script>

<template>
  <h1 id="title">发布公告</h1>
  <el-form :model="form" label-width="120px">
    <el-form-item label="发布类型">
      <el-radio-group v-model="form.type">
        <el-radio label="公告" />
        <el-radio label="通知"  />
        <el-radio label="安全知识普及"  />
      </el-radio-group>
    </el-form-item>
    
    <el-form-item label="接收者">
      <div class="m-4">
        <el-cascader
          v-model="form.receiver"
          placeholder="选择接收者"
          :options="options"
          :props="props"
          :show-all-levels="false"
          size="large"
          collapse-tags
          filterable
          clearable
          collapse-tags-tooltip
        />
      </div>
    </el-form-item>

    <el-form-item label="发布主题">
      <el-input placeholder="输入主题" v-model="form.title" />
    </el-form-item>

    <el-form-item label="发布内容">
      <el-input rows="10" placeholder="输入内容" v-model="form.content" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">发送</el-button>
      <el-button @click="backToBB">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
#title{
  margin-top: 10px;
  color: var(--el-color-primary);
}
.el-form{
  background-color: #d9d9d9;
  padding:50px  40px;
  box-sizing: border-box;
  margin:30px;
  border-radius: 20px;
}
.el-form{
  --el-form-label-font-size: 18px

}
.el-form-item__label{
  color: var(--el-color-primary) !important;
}
</style>