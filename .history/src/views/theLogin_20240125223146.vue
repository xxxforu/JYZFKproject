<script setup>

</script>

<template>
  <!-- <router-link to="/main">登录</router-link> -->
  <div class="container">
    <div class="loginBox">
      <form action="/user/login" method="post" id="loginForm">
        <div class="inputbox">
          <label >您是：</label>
          <div class="radiobox">
            <input type="radio" id="manager" name="Worktype">
            <label for="manager">管理员</label>
            <br>
            <input  type="radio" id="gasWorker" name="Worktype" >
            <label for="gasWorker">加油站人员</label>
          </div>
        </div>
        <div class="inputbox">
          <label for="number">账号：</label>
          <input id="number" required type="text" name="number" placeholder="请输入账号">
        </div>
        <div class="inputbox">
          <label for="password">密码：</label>
          <input id="passeword" required type="password" name="password" >
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
    <div class="image">
      <img src="../assets/image/首页图.png" alt="图片无法显示">
    </div>
  </div>

</template>

<style scoped>
.container{
 display: flex; 
}
.loginBox{
  position: relative;
  flex: 1;
}
.image{
  flex: 1;
}
#loginForm{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  margin: auto;
  background-color:#f4f3f3;
  padding: 50px;
}
.inputbox{
  display: flex;
}


</style>