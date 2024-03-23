<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

var route  = useRoute()
var time = ref('')
var illegalType = ref('')    
var url = ref('')
var list = ref([])
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
      <!-- <el-image style="width: 70%;" :src="url" :fit="contain" /> -->
      <el-image
      style="height: 60%; width:60%;margin:40px 0 0"
      :src="url"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="list"
      :initial-index="4"
      fit="scale-down"
    />
    </div>
    <div class="discript">

    </div>
  </div>
  
</template>

<style scoped>
#VDpage{
  overflow-y: auto;
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
</style>