<script setup>

</script>

<template>
  <!-- <router-link to="/main">登录</router-link> -->
  <div class="container">
    <div class="loginBox">
      
      <form action="/user/login" method="post" id="loginForm">
        <h2>登录</h2>
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
input[type="radio"]:checked + label::before {
  background-color: ; /* 设置选中小圆点的颜色 */
}
input {
  accent-color: #9f2f2e;
}
.loginBox{
  position: relative;
  flex: 1;
}
.image{
  flex: 1;
}
#loginForm{
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  margin: auto;
  background-color:#f4f3f3;
  padding: 30px 20px;
}
.inputbox{
  margin: 15px 0;
}
button{
  padding: 5px 15px;
  border-radius: 5px;
  background-color:#9f2f2e;
  color: #fff;
  border: none;
  font-weight: bold;
}
.inputbox{
  display: flex;
}


</style>