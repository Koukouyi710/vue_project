<template>
  <div>
    <!--导航-->
    <van-nav-bar title="修改密码"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>

    <!--输入-->
    <van-cell-group>
      <van-field
        v-model="oldPassword"
        type="password"
        required
        clearable
        label="旧密码"
        placeholder="请输入旧密码"
      />

      <van-field
        v-model="newPassword"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        required
        clearable
      />
      <van-field
        v-model="checkNewPassword"
        type="password"
        label="确定新密码"
        placeholder="请再次输入新密码"
        required
        clearable
        :error-message="this.error"
      />
    </van-cell-group>
    <div v-if="type==0">
      <van-button type="default" size="large" @click="type=1">修改密保问题</van-button>
      <van-button type="danger" size="large" @click="toChange">确认修改</van-button>
    </div>

    <div v-if="type==1">
      <van-button type="default" size="large" @click="type=0">取消修改密保问题</van-button>
      <van-field
        v-model="question"
        label="密保问题"
        placeholder="请输入密保问题"
        required
        clearable
      />
      <van-field
        v-model="answer"
        label="密保问题"
        placeholder="请输入密保问题"
        required
        clearable
      />
      <van-button type="danger" size="large" @click="Change">确认修改</van-button>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "UpdatePassword",
      data(){
        return{
          oldPassword:"",
          newPassword:"",
          checkNewPassword:"",
          error:"",
          type:0,
          question:"",
          answer:""
        }
      },
        methods:{
          onClickLeft() {
            this.$router.push({ path:'/myinfo'})
          },
          /*带有密保*/
          Change:function(){
            if (this.oldPassword==""){
              Toast('旧密码为空!')
            }
            else if (this.newPassword==""){
              Toast('新密码为空!')
            }
            else if (this.checkNewPassword==""){
              Toast('请再次输入新密码!')
            }
            else if (this.error!=""){
              Toast(this.error)
            }
            else if (this.question==""){
              Toast('密保问题为空!')
            }
            else if (this.answer==""){
              Toast('密保答案为空!')
            }
            var _vue=this

            this.service.get("/user/reset_password.do",{
              params:{
                passwordOld: this.oldPassword,
                passwordNew: this.newPassword
              }
            })
              .then(function (response) {
                if(response.data.status==100){
                  Toast.fail(response.data.msg)
                  _vue.error=response.data.msg
                }
                else if(response.data.status==0){
                  _vue.service.get("/user/update_information.do",{
                    params:{
                      question: _vue.question,
                      answer: _vue.answer
                    }
                  })
                    .then(function (response) {
                      Toast.success('修改成功！');
                      _vue.$router.push({ path:'/myinfo'})
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          },
          /*只改密码*/
          toChange:function() {
            if (this.oldPassword==""){
              Toast('旧密码为空!')
            }
            else if (this.newPassword==""){
              Toast('新密码为空!')
            }
            else if (this.checkNewPassword==""){
              Toast('请再次输入新密码!')
            }
            else if (this.error!=""){
              Toast(this.error)
            }

            else{
              var _vue=this
              this.service.get("/user/reset_password.do",{
                params:{
                  passwordOld: this.oldPassword,
                  passwordNew: this.newPassword
                }
              })
                .then(function (response) {
                  /*console.log(response)
                  console.log(response.status)
                  console.log(response.data.status)
                  console.log(response.data.msg)*/
                  if(response.data.status==100){
                    Toast.fail(response.data.msg)
                  }
                  else if(response.data.status==0){
                    Toast.success(response.data.msg)
                    _vue.$router.push({ path:'/myinfo'})
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          }
        },
        updated(){
          if (this.newPassword!=this.checkNewPassword){
            this.error="两次输入的密码不一致！"
          }
          else if (this.newPassword==this.checkNewPassword){
            this.error=""
          }
        },
    }
</script>

<style scoped>

</style>
