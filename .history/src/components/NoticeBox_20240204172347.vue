<script setup>
    import { ref } from 'vue';
    const showContent = ref(false)
    function changeShowContent(){
        console.log("changeShowContent");
        showContent = !showContent
    }
</script>

<template>
  <div class="bigBox">
    <view class="kind">公告</view>
    <view class="smallBox">
        <text class="title">关于上下班高峰期站内拥堵的解决措施</text>
        <text v-if="showContent" class="content">那就先挪车再开小票呗</text>
        <text class="time">2024.1.2 12:40</text>
    </view>
    <view @click="changeShowContent" class="changeShowContent"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg></view>

  </div>
</template>

<style scoped>
.bigBox{
    position: relative;
    width: 80%;
    max-width: 70vw;
    background-color: #d9d9d9;
    border-radius:25px;
    padding: 20px;
    left: 50%;
    transform: translate(-50%,0);
    margin: 35px;
}
.changeShowContent > svg{
    width: 24px;
    height: 24px;
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
</style>