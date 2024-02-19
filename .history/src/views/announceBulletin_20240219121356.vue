<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
var router = useRouter()
var form = reactive({
  topic: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: '',
  content: '',
})
var CP = ref({})
var options =ref([
  {
    value:[],
    label:'全部分公司',
    children:[]
  },{
    value:'allGasStation',
    label:'全部加油站',
    children:[
      {
        value:"分公司1",
        label:"分公司1",
        children:[
          {
            value:"加油站1",
            label:"加油站1",
          },
          {
            value:"加油站2",
            label:"加油站2",
          },
          {
            value:"加油站3",
            label:"加油站3",
          }
        ]
      },
      {
        value:"分公司2",
        label:"分公司2",
        children:[
          {
            value:"加油站1",
            label:"加油站1",
          },
          {
            value:"加油站2",
            label:"加油站2",
          },
          {
            value:"加油站3",
            label:"加油站3",
          }
        ]
      },
      {
        value:"分公司3",
        label:"分公司3",
        children:[
          {
            value:"加油站1",
            label:"加油站1",
          },
          {
            value:"加油站2",
            label:"加油站2",
          },
          {
            value:"加油站3",
            label:"加油站3",
          }
        ]
      }
    ]
  }
])
onMounted(()=>{
  axios.get('/central/companyList').then(res=>{
    res.data.data.forEach(el => {
      CP.value[el.companyId]=[]
      options.value[0].value.push(el.companyId)
      options.value[0].children.push({label:el.companyName,value:el.companyId})
    });

  axios.get('/central/petrolList').then(res=>{
    console.log(options.value);
    res.data.data.petrolList.forEach(el => {
      CP.value[el.belongCompany].push(el)
    });

    //循环赋值完成后再放回options 
  })
  
    
  })
})
var props = {
  multiple: true,
}
var onSubmit = () => {
  console.log('submit!')
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
        <el-radio label="通知" />
        <el-radio label="安全知识普及" />
      </el-radio-group>
    </el-form-item>
    
    <el-form-item label="接收者">
      <div class="m-4">
        <el-cascader
          placeholder="Try searchingL Guide"
          :options="options"
          :props="props"
          size="large"
          collapse-tags
          filterable
          clearable
          collapse-tags-tooltip
        />
      </div>
      <!-- <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col> -->
      <!-- <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col> -->
    </el-form-item>

    <el-form-item label="发布主题">
      <el-input placeholder="输入主题" v-model="form.topic" />
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