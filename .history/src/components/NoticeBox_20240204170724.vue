<script setup>

</script>

<template>
  <div class="bigBox">
    <view class="kind">公告</view>
    <view class="smallBox">
        <text class="title">关于上下班高峰期站内拥堵的解决措施</text>
        <text class="content">那就先挪车再开小票呗</text>
        <text class="time">2024.1.2 12:40</text>
    </view>

  </div>
</template>

<style scoped>
.bigBox{
    position: relative;
    width: 80%;
    max-width: 70vw;
    background-color: aqua;
    left: 50%;
    transform: translate(-50%,0);
    margin: 10px;
}
.smallBox{
    display: flex;
    flex-direction: column;
}
</style>