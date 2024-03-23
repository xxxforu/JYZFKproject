<script setup>
    import { defineProps, onMounted, ref } from 'vue';
    defineProps(['title','content','type','date','file'])
    var showContent = ref(false)
    var rotationDegrees = ref(0)
    function changeShowContent(){
        showContent.value = !showContent.value
        rotationDegrees.value += 180;
    }
    onMounted(()=>{
        console.log(file.value);
    })
</script>

<template>
  <div class="bigBox">
    <!-- 本来该处应展示对应公告的接受者，但后端还没写，先简化 -->
    <view class="kind">{{type==1?"公告":type==2?"通知":"安全知识普及"}}</view>
    <view class="smallBox">
        <text class="title">{{title}}</text>
        <transition name="expand">
            <text v-if="showContent" class="content">{{content}}</text>
            
        </transition>
        <a href="{{file}}" v-if="showContent" >点击跳转查看附件</a>
        
    </view>
        <text class="time">{{date}}</text>
        <view @click="changeShowContent"  class="changeShowContent"><svg :style="{ 'transform': `rotate(${rotationDegrees}deg)` }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg></view>

  </div>
</template>

<style scoped>
.bigBox{
    position: relative;
    width: 75%;
    max-width: 60vw;
    box-shadow: 0 4px 10px 2px rgba(102,102,102,.4);
    background-color: #fffefa;
    border-radius:25px;
    padding:45px;
    left: 50%;
    transform: translate(-50%,0);
    margin: 40px 0;
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