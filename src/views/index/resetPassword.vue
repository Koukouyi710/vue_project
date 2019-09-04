<template>
  <div>
    <van-nav-bar
      title="重置密码"
      left-text="取消"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell value="用户名" />
    <van-cell-group>
      <van-field v-model="username" disabled="true" />
    </van-cell-group>
    <van-cell value="密码" />
    <van-cell-group>
      <van-field v-model="password" placeholder="请输入密码" clearable/>
    </van-cell-group>
    <van-cell value="确认密码" />
    <van-cell-group>
      <van-field v-model="check" placeholder="请再次输入密码" clearable/>
    </van-cell-group>
    <van-button type="default" size="large" @click="toReset">确认修改</van-button>
  </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "resetPassword",
      data(){
        return{
          forgetToken:this.$route.params.forgetToken, //token
          username:this.$route.params.username,
          password:"",
          check:""
        }
      },
      methods:{
        onClickLeft() {
          this.$router.push({ path:'/login'})
        },
        toReset:function () {
          if (this.password!=this.check){
            Toast.fail('两次输入的密码不一致！');
          }
          else{
            var _vue=this
            this.service.get("/user/forget_reset_password.do",{
              params:{
                username:_vue.username,
                forgetToken:_vue.forgetToken,
                password: _vue.password,
              }
            })
              .then(function (response) {
                console.log(response)
                console.log(response.status)
                console.log(response.data.status)
                console.log(response.data.msg)
                if(response.data.status==100){
                  Toast.fail(response.data.msg);
                }
                if(response.data.status==0){
                  Toast.success(response.data.msg);
                  _vue.$router.push({path:'/login'})
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
        }
      }
    }
</script>

<style scoped>

</style>
