<!--用户登录-->
<template>
  <div>
    <h1>用户登录</h1>
    <input-box placeholder="请输入用户名" v-model="username"></input-box>
    <br><br>
    <pass-word-box placeholder="请输入密码" v-model="password"></pass-word-box>
    <br><br>
    <span @click="Login"><submit-button value="登录"></submit-button></span>
    <!--<p>用户名：{{username}} 密码:{{password}}</p>-->
    <p>{{massage}}</p>
  </div>
</template>

<script>
  import InputBox from '../../components/InputBox'
  import PassWordBox from '../../components/PassWordBox'
  import SubmitButton from '../../components/SubmitButton'
    export default {
      name: "login",
      data(){
        return{
          username:"",
          password:"",
          massage:""
        }
      },
      components: {
        InputBox,
        SubmitButton,
        PassWordBox
      },
      methods:{
        /*登录*/
        Login:function () {
          var _vue=this
          /*this.$http("http://api.neuedu.com:729/user/login.do" ,{*/
          this.service.get("/user/login.do" ,{
              params:{
              username:this.username,
              password:this.password
            }
          })
          /*post请求方式*/
          /*this.service.post("/user/login.do" ,{
            username:this.username,
            password:this.password
          })*/
            .then(function (response) {
              var json = response.data
              console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(json.data)
               //sessionStorage.setItem("useInfo",response.data.data)
              if (response.data.status!=0){
                _vue.massage=response.data.msg
              }
              if (response.data.status==0){
                _vue.massage="登录成功"
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
    }
</script>

<style>

</style>
