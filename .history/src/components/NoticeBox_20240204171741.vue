<script setup>
    import ref from 'vue';
    const showContent = ref('false')
</script>

<template>
  <div class="bigBox">
    <view class="kind">公告</view>
    <view class="smallBox">
        <text class="title">关于上下班高峰期站内拥堵的解决措施</text>
        <text v-if="showContent" class="content">那就先挪车再开小票呗</text>
        <text class="time">2024.1.2 12:40</text>
    </view>

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