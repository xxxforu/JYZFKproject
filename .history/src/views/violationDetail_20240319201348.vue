<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import swiper from '../components/swiperBox.vue';

var route  = useRoute()
var time = ref('')
var illegalType = ref('')    
      
const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
    
      function renderTime(date) {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  
onMounted(()=>{
  console.log(route.query);
  time.value = ref(renderTime(route.query.time))
  time.value = time.value.value
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
  <h1 id="title">违规行为详情</h1>
  <div class="topDetail">
    <p>时间：{{time}}</p>
    <p>加油站：{{route.query.petrolName}}</p>
    <p>违规类型：{{illegalType}}</p>
  </div>
  <swiper></swiper>
</template>

<style scoped>
#title{
  margin: 20px auto ;
  color: var(--el-color-primary);
}
.topDetail{
  display: flex;
  justify-content: space-around;
}
</style>../components/swiperBox.vue