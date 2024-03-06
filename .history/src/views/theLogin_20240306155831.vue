
<template>
  
  <div class="container">
    <div :class="widthOK?'both loginbox':'loginbox'">
      
      <div id="loginForm">
        <h2>登录</h2>
        <div class="inputbox">
          <label >您是：</label>
          <div class="radiobox">
            <div>
              <input v-model="loginType" value="1" type="radio" id="aLLManager" name="Worktype" checked>
              <label for="manager">总公司管理员</label>
            </div>
            <div>
              <input v-model="loginType" value="2" type="radio" id="partManager" name="Worktype">
              <label for="manager">分公司管理员</label>
            </div>
            
            <div>
            <input v-model="loginType" value="3" type="radio" id="gasWorker" name="Worktype" >
            <label for="gasWorker">加油站人员</label>
            </div>
          </div>
        </div>
        <div class="inputbox">
          <label for="number">账号：</label>
          <input id="number" required type="text" v-model="number" name="number" placeholder="请输入账号">
        </div>
        <div class="inputbox">
          <label for="password">密码：</label>
          <input @keyup.enter="goLogin" id="passeword" required type="password" v-model="password" name="password"  placeholder="请输入密码">
        </div>
        <!-- <router-link to="/main"> -->
          <button type="submit" @click="goLogin">登录</button>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="image" v-show="widthOK">
      <img src="../assets/image/首页图.png" alt="图片无法显示">
    </div>
  </div>
  
</template>



  <script >
    export default {
    data(){
      return{
        widthOK:true,
        number:"",
        password:"",
        loginType:""
      }
    },
    mounted() {
      this.getWindowWidth();
      window.addEventListener('resize', this.getWindowWidth);
      
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.getWindowWidth);
    },
    methods: {
      
      //获取浏览器窗口宽度 如果小于990 就不要图片了
      getWindowWidth() {
        console.log(window.innerWidth)
        if(window.innerWidth<990){
          this.widthOK=false
        } else{
          this.widthOK=true
        }
      },
      // 登录接口
      goLogin(){
        // this.$message.error('Oops, this is a error message.')
        var axios = require('axios');
        var body = JSON.stringify({
           "number": this.number,
           "password": this.password
        });

        var config = {
           method: 'post',
           url: 'http://111.230.198.4:7001/api/user/login',
           headers: { 
              'Content-Type': 'application/json', 
              'Accept': '*/*', 
           },
           data : body
        };
        var that = this;
        axios(config)
        .then(function (response) {
           var code = response.data.code
           var data= response.data.data;
           if(code==200&&data.role==that.loginType){
            localStorage.setItem("token",data.token)
           localStorage.setItem("role",data.role)
           localStorage.setItem("belong",data.belong);
           that.$axios.defaults.headers.common['Authorization']= localStorage.getItem("token")
          //  设置好localStorage后再跳转页面
           that.$router.push({path:"/main"})
           }else if(code==200&&data.role!=that.loginType){
console.log("pp");
           }
           
        })
        .catch(function (error) {
           console.log(error);
        });
        
    }
  }
  };
  </script>

<style scoped>
.container{
 display: flex; 
}
input {
  padding: 8px ;
  border: none;
  border-radius: 10px;
  accent-color: #9f2f2e;
}
h2{
  margin-bottom: 40px;
}
.both{
  position: relative;
  flex: 1;
}
.image{
  flex: 1;
  height: 100vh;
}
.image img{
  height: 95%;
  margin: auto;
}
#loginForm{
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  margin: auto;
  background-color:#f4f3f3;
  padding: 60px 45px;
}
.inputbox{
  display: flex;
  margin: 15px 0;
}
input:focus{
  outline: none;
}
button{
  padding: 10px 30px;
  margin-top: 10px;
  border-radius: 5px;
  background-color:#9f2f2e;
  color: #fff;
  border: none;
  font-weight: bold;
}
.radiobox{
  display: flex;
  flex-direction: column;
}.radiobox>div>label{
  float: left;
}
.radiobox>div>input{
  float: left;
  transform: translate(0,30%);
  margin-right: 5px;
}
</style>