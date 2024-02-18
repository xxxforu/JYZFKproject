<script setup>
    import { defineProps, ref } from 'vue';
    defineProps(['createDate'])
    console.log(createDate);
    // var type = data.type==1?"公告":data.type==2?"通知":"安全知识普及"
    var showContent = ref(false)
    var rotationDegrees = ref(0)
    function changeShowContent(){
        showContent.value = !showContent.value
        rotationDegrees.value += 180;
    }
</script>

<template>
  <div class="bigBox">
    <view class="kind"></view>
    <view class="smallBox">
        <text class="title"></text>
        <transition name="expand">
            <text v-if="showContent" class="content"></text>
        </transition>
        
    </view>
        <text class="time">{{createDate}}</text>
        <view @click="changeShowContent"  class="changeShowContent"><svg :style="{ 'transform': `rotate(${rotationDegrees}deg)` }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg></view>

  </div>
</template>

<style scoped>
.bigBox{
    position: relative;
    width: 75%;
    max-width: 60vw;
    background-color: #d9d9d9;
    border-radius:25px;
    padding:40px;
    left: 50%;
    transform: translate(-50%,0);
    margin: 35px;
}
.changeShowContent > svg{
    width: 24px;
    height: 24px;
    transition: transform 0.5s ease-in-out;
    transform: rotate(180deg);
}.changeShowContent{
    position: absolute;
    right: 10%;
    top: 10%;
}
.kind{
    position: absolute;
    top:0;
    left: 0;
    transform: translate(-50%,-50%);
    background-color: var(--el-color-primary);
    padding:5px 30px;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
}
.smallBox{
    display: flex;
    flex-direction: column;
}
.title{
    font-weight: bold;
    font-size: 20px;
    color: var(--el-color-primary);
}
.content{
    margin: 20px 0;
}
.time{
    position: absolute;
    bottom: 10%;
    right: 10%;
    color: #666666;
    font-size: 14px;
}
/* 进入过渡的开始状态 */
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

/* 进入过渡的结束状态 */
.expand-enter-to,
.expand-leave-from {
  max-height: 500px; /* 假设内容的最大高度为500px，可根据实际情况调整 */
  opacity: 1;
}

/* 过渡的激活状态 */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.4s ease-in-out,max-height 0.5s ease-in-out ;
  overflow: hidden;
}
</style>