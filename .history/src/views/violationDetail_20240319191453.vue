<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
var route  = useRoute()
var time = ref()
function renderTime(date) {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
onMounted(()=>{
  console.log(route.query);
  time.value = ref(renderTime(route.query.time))
})
</script>

<template>
  <h1 id="title">违规行为详情</h1>
  <div class="topDetail">
    <p>{{time}}</p>
    <p>加油站：{{route.query.petrolName}}</p>
  </div>
</template>

<style scoped>
#title{
  margin-top: 10px;
  color: var(--el-color-primary);
}
</style>