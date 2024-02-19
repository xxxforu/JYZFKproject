<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
var router = useRouter()
const loading = ref(false) //用来控制加载遮罩是否显示
var form = ref({
  receiver:[],
  tittle: '',
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
  })
  
    
  })
})
// const rules = reactive<FormRules<RuleForm>>({
//   title:[{
//     required:true
//   }]
// })

// 接收者选择器可多选
var props = {
  multiple: true,
}
// 提交表单发布
var onSubmit = () => {
  loading.value=true
  form.value.type=form.value.type=="公告"?1:form.value.type=="通知"?2:3
  var newReceive = []
  form.value.receiver.forEach(item=>{
    const len = item.length
    newReceive.push(item[len-1])
  })
  form.value.receiver = newReceive

  console.log(form.value);
  axios.post('/central/publishAnnouncement',form.value).then(res=>{
    console.log(res.data);
  })
  // var data = JSON.stringify(form);

// var config = {
//    method: 'post',
//    url: 'http://111.230.198.4:7001/api/central/publishAnnouncement',
//    headers: { 
//       'Authorization': localStorage.getItem('token'), 
//       'Content-Type': 'application/json', 
//       'Accept': '*/*', 
//    },
//    data : data
// };

// axios(config)
// .then(function (res) {
//    console.log(JSON.stringify(res.data));
//    loading.value=false
// })
// .catch(function (error) {
//    console.log(error);
//    loading.value=false
// });

}



var backToBB =()=>{
  router.push({
      path:'/main/bulletinBoards'
  })
}
</script>

<template>
    <div v-loading="loading">
  <h1 id="title">发布公告</h1>
  <el-form 
  :model="form" 
  label-width="120px"
  :rules="rules"
  >
    <el-form-item label="发布类型">
      <el-radio-group v-model="form.type" required>
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
          required
        />
      </div>
    </el-form-item>

    <el-form-item label="发布主题">
      <el-input placeholder="输入主题" required v-model="form.title" />
    </el-form-item>

    <el-form-item label="发布内容">
      <el-input rows="10" placeholder="输入内容" v-model="form.content" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">发送</el-button>
      <el-button @click="backToBB">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<style scoped>
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
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