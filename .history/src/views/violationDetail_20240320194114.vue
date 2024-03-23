<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

var route  = useRoute()
var time = ref('')
var illegalType = ref('')    
var url = ref('')
var list = ref([])
var role = ref(localStorage.getItem('role'))
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
  switch(route.query.illegalType){
    case "1":
      illegalType.value = "打电话";
      break;
    case "2":
      illegalType.value = "检修区不规范";
      break;
    case "3":
      illegalType.value = "检修不带安全帽";
      break;
    case "4":
      illegalType.value = "员工不按规定收取顾客费用";
      break;
  
  }
})

    

</script>

<template>
  <div id="VDpage">
    <h1 id="title">违规行为详情</h1>
    <div class="topDetail">
      <p>时间：{{time}}</p>
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
      <h2 style="text-align: left;margin:10px 20px">描述</h2>
      <!-- {{route.query.description}} -->
      <p id="description" style="text-align: left;margin:10px 10%">
        {{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}{{route.query.description}}
      </p>
    </div>
    <div class="toAppeal" v-if="role==2">
      <button @click="openAppealBox">我要申訴</button>
    </div>
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
}
</style>