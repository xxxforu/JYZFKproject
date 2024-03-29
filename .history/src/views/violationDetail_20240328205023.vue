<script setup>
import axios from 'axios';
import { ElMessage, genFileId } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
var route  = useRoute()
var router  = useRouter()
var time = ref('')
var illegalType = ref('')    
var url = ref('')
var list = ref([])
var role = ref(localStorage.getItem('role'))
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const formLabelWidth = '140px'
const upload = ref();
const formData = new FormData
const description =ref('')
const comment =ref('')
const postRequst = axios.create({
  baseURLrl: 'http://111.230.198.4:7001/'
})

postRequst.defaults.headers.common['Authorization'] = localStorage.getItem("token")
postRequst.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8'
//申诉
const loading = ref(false)
const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);

};
function handleRemove(file, fileList) {
        console.log(file, fileList);
      }
function handlePreview(file) {
        console.log(file);
      }
      // 处理文件上传操作
function handleFileUpload(file) {
  loading.value = true;
  
      }
  function upLoadData(e){
    console.log(e.target.files);
  }
  function handleChange(e){
    formData.append('prove',e.raw)
  console.log(formData.get('prove'));
  }

//提交申诉
  function goToAppeal(){
    // dialogVisible.value = false
    formData.append('description',description.value)
    
    formData.append('illegalBehaviorId',parseInt(route.query.id))
    var config={
      method:'post',
      url:'http://111.230.198.4:7001/api/petrol/appeal',
      headers:{
        'Authorization':localStorage.getItem("token"),
        'Content-Type':'multipart/form-data',
        'Accept': '*/*', 
      },
      data:formData
    }
    axios(config).then(res=>{
      if(res.code==0)
      {
        dialogVisible.value=false
        formData.delete('prove')
        formData.delete('description')
        ElMessage({
          showClose: true,
          message: '申诉发送成功！',
          type: 'success',
        })
      }
      else{
        ElMessage({
        showClose: true,
        message: '好像出了问题哦',
        type: 'error',
      })
      }
    })
    
  }
//处理申诉
function handleAppeal(agree){
  var config = {
           method: 'put',
           url: 'https://ps.gwcampus.cn/api/central/processAppeal',
           headers: { 
              'Content-Type': 'application/json', 
              'Accept': '*/*', 
           },
           data : JSON.stringify({
            "aid":route.query.aid,
            "agree":agree,
            comment:comment.value
           })
        };
        axios(config).then(res=>{
          if(res.data.code==0){
            ElMessage({
              message: '审核结果提交成功！',
              type: 'success',
            })
            router.push({
              path:'/main/allCheckAppeal'
            })
          }else{
            ElMessage.error(res.data.msg)
          }
        })
}


function renderTime(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}  
onMounted(()=>{
  console.log(route.query);
  time.value = ref(renderTime(route.query.time))
  time.value = time.value.value
  url.value = route.query.photo
  list.value.push(url.value)
  console.log(route.query.illegalType);
  if(route.query.illegalType.length==1){
  switch(route.query.illegalType){
    case "1":
      illegalType.value = "打电话";
      break;
    case "2":
      illegalType.value = "未正确摆放护栏";
      break;
    case "3":
      illegalType.value = "登高不戴安全帽";
      break;
    case "4":
      illegalType.value = "火灾";
      break;
    case "5":
      illegalType.value = "卸油区有人";
      break;
  
  }
}else illegalType.value = route.query.illegalType
})

    

</script>


<template>
  <div id="VDpage">
    <h1 id="title">违规行为详情</h1>
    <div class="topDetail">
      <p v-if="route.query.appealDate">申诉时间：{{route.query.appealDate}}</p>
      <p>违规时间：{{time}}</p>
      <p>加油站：{{route.query.petrolName}}</p>
      <p>违规类型：{{illegalType}}</p>
    </div>
    <div class="demo-image__preview">
      <el-image
      style="height: 50%; width:60%;margin:20px 0 0"
      :src="url"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="list"
      :initial-index="4"
      fit="scale-down"
    />
    
    </div>
    <div class="descript">
      <h2 v-if="route.query.appealDate" style="text-align: left;margin:10px 20px">申述内容</h2>
      <h2 v-else style="text-align: left;margin:10px 20px">描述</h2>
      <p id="description" style="text-align: left;margin:10px 10%">
        {{route.query.description}}
      </p>
    </div>
    <div class="toAppeal" v-if="role==3">
      <button @click="dialogVisible = true">我要申诉</button>
    </div>
    <div class="toAppeal" v-if="route.query.appealDate">
      <button @click="dialogVisible1 = true">处理申诉</button>
    </div>


    <!-- 申訴弹窗 -->
  
  
    <el-dialog v-model="dialogVisible" title="上传申诉" width="500">
      <el-upload
    id="uploadPic"
  class="upload-demo"
  action="#"
  ref="upload"
  :on-change="handleChange"
  accept="image/*"
  auto-upload="false"
  :limit="1"
  :on-exceed="handleExceed"
  :file-list="fileList"
  :http-request="handleFileUpload"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">
    <em>点击选取图片</em>
  </div>
      </el-upload>
      <el-input
        v-model="description"
        style="width: 70%;margin:20px 0"
        :autosize="{ minRows: 4 }"
        type="textarea"
        resize="none"
        placeholder="填写申述内容"
        clearable
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="goToAppeal">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 处理申诉弹窗 -->
    <el-dialog v-model="dialogVisible1" title="处理申诉" width="500">
      <el-input
        v-model="comment"
        style="width: 70%;margin:20px 0"
        :autosize="{ minRows: 4 }"
        type="textarea"
        resize="none"
        placeholder="填写审核意见"
        clearable
      />
      <template #footer>
        <div class="dialog-footer">
          
          <el-button type="primary" @click="handleAppeal(1)">
            通过
          </el-button>
          <el-button type="wrong" @click="handleAppeal(0)">不通过</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  
</template>


<style scoped>
#VDpage{
  overflow-y: scroll;
  height: 100vh;
  flex-direction: column;
}
#title{
  margin: 20px auto ;
  color: var(--el-color-primary);
}
.topDetail{
  display: flex;
  justify-content: space-around;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.descript{
  border-radius:25px;
  box-shadow: 0 4px 10px 2px rgba(102,102,102,.4);
  background-color: #fffefa;
  width: 60%;
  padding: 20px 10px;
  margin:20px  auto;
}
.toAppeal> button{
  padding: 20px 40px;
  border-radius:15px;
  box-shadow: 0 4px 10px 2px rgba(107, 153, 135,.4);
  background-color: #fffefa;
  border: none;
  margin-bottom: 40px;
}
.avatar-uploader .avatar {
  width: 110px;
  height: 110px;
  display: block;
}
.el-upload__text{
  text-decoration: underline;
  color: var(--el-color-primary);
  font-size: 18px;
}
</style>

