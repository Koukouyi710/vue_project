<!--用户登录-->
<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="user_box">
      <div class="user_img">
        <van-image
          round
          width="6rem"
          height="6rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        /><br>
      </div>
      <div class="user_text">
        <input-box placeholder="请输入用户名" v-model="userInfo.username"></input-box>
        <br><br>
        <pass-word-box placeholder="请输入密码" v-model="userInfo.password"></pass-word-box>
        <br>
      </div>
      <div class="user_submit">
        <span @click="Login"><submit-button value="登录"></submit-button></span>
      </div>
    </div>
    <br>
    <a href="/#/forgetPassword" style="font-size: 0.9rem;color: #20a0ff">忘记密码？</a>
    <!--<p>用户名：{{userInfo.username}} 密码:{{userInfo.password}}</p>-->
    <!--<p>{{massage}}</p>-->
  </div>
</template>

<script>
  import { NavBar } from 'vant';
  import {mapActions} from 'vuex'
  import InputBox from '../../components/InputBox'
  import PassWordBox from '../../components/PassWordBox'
  import SubmitButton from '../../components/SubmitButton'
  import { Toast } from 'mint-ui'
    export default {
      name: "login",
      data(){
        return{
          massage:"",
          userInfo:{
            username:"",
            password:"",
          }
        }
      },
      components: {
        InputBox,
        SubmitButton,
        PassWordBox
      },
      methods:{
        ...mapActions(['setUserInfo']),
        /*登录*/
        Login:function () {
          var _vue=this
          /*this.$http("http://api.neuedu.com:729/user/login.do" ,{*/
          this.service.get("/user/login.do" ,{
              params:{
              username:this.userInfo.username,
              password:this.userInfo.password
            }
          })
          /*post请求方式*/
          /*this.service.post("/user/login.do" ,{
            username:this.username,
            password:this.password
          })*/
            .then(function (response) {
              var json = response.data
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(json.data)*/
               //sessionStorage.setItem("useInfo",response.data.data)
              if (response.data.status!=0){
                _vue.massage=response.data.msg
                Toast(_vue.massage);
              }
              if (response.data.status==0){
                _vue.massage="登录成功"
                _vue.setUserInfo(_vue.userInfo)
                _vue.$router.push({ path:'/my'})
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        onClickLeft() {
          this.$router.push({ path:'/my'})
        },
        onClickRight() {
          this.$router.push({ path:'/regist'})
        }
      },
    }
</script>

<style scoped>
  .user_box{
    display: flex;
    flex-direction:column ;
    margin-top: 2rem;
  }
  .user_img,.user_text,.user_submit{
    width: 100%;
    margin-top: 1rem;
  }
</style>
