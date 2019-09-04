<template>
    <div>
      <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <van-field  v-model="username"
                  label="用户名"
                  required
                  clearable
                  placeholder="请输入用户名"
                  :error-message="username_error_msg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        clearable
        :error-message="password_error_msg"
      />
      <van-field
        v-model="checkPassword"
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
        clearable
        :error-message="error"
      />
      <van-field  v-model="email"
                  label="电子邮箱"
                  clearable
                  required
                  placeholder="请输入邮箱"
                  :error-message="email_error_msg"
      />

      <van-field  v-model="phone"
                  label="手机号码"
                  clearable
                  required
                  placeholder="请输入手机号码"
                  :error-message="phone_error_msg"
      />
      <van-field
        v-model="question"
        required
        clearable
        label="密保问题"
        right-icon="question-o"
        placeholder="请输入密保问题"
        @click-right-icon="$notify({ type: 'warning', message: '用于找回登录密码，请牢记密保问题及答案！' })"
        :error-message="question_error_msg"
      />
      <van-field
        v-model="answer"
        required
        clearable
        label="问题答案"
        placeholder="请输入密保问题答案"
        :error-message="answer_error_msg"
      />
      <van-button type="info" size="large" @click="toRegist" style="font-size: 1rem">注册</van-button>
    </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "regist",
        data(){
          return{
            username:"",
            password:"",
            checkPassword:"",
            email:"",
            phone:"",
            question:"",
            answer:"",

            username_error_msg:"",
            password_error_msg:"",
            error:"",
            email_error_msg:"",
            phone_error_msg:"",
            question_error_msg:"",
            answer_error_msg:"",
        }
      },
      updated(){
        if (this.username!=""){
          this.username_error_msg=""
        }
        if (this.password!=""){
          this.password_error_msg=""
        }
        if (this.checkPassword!=""&&this.checkPassword==this.password){
          this.error=""
        }
        if (this.email!=""){
          this.email_error_msg=""
        }
        if (this.phone!=""){
          this.phone_error_msg=""
        }
        if (this.question!=""){
          this.question_error_msg=""
        }
        if (this.answer!=""){
          this.answer_error_msg=""
        }
      },
        methods:{
          onClickLeft() {
            this.$router.push({ path:'/login'})
          },
          toRegist:function(){
            if (this.username==""){
              this.username_error_msg="用户名不能为空!"
            }
            else if (this.password==""){
              this.password_error_msg="密码不能为空!"
            }
            else if (this.checkPassword==""){
              this.error="请再次输入密码!"
            }
            else if(this.password!=this.checkPassword){
              this.error="两次输入的密码不一致!"
            }
            else if (this.email==""){
              this.email_error_msg="邮箱不能为空!"
            }
            else if (this.phone==""){
              this.phone_error_msg="手机号码不能为空!"
            }
            else if (this.question==""){
              this.question_error_msg="密保问题不能为空!"
            }
            else if (this.answer==""){
              this.answer_error_msg="请输入密保问题答案!"
            }
            else{
              var _vue=this
              this.service.get("/user/register.do",{
                params:{
                  username:_vue.username,
                  password:_vue.password,
                  checkPassword:_vue.checkPassword,
                  email:_vue.email,
                  phone:_vue.phone,
                  question:_vue.question,
                  answer:_vue.answer,
                }
              })
                .then(function (response) {
                  console.log(response)
                  console.log(response.status)
                  console.log(response.data.status)
                  console.log(response.data.msg)
                  if(response.data.status==0){
                    Toast.success("注册成功！")
                    _vue.$router.push({path:'/login'})
                  }
                  if(response.data.status==100){
                    Toast.fail(response.data.msg)
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
          },
        }
    }
</script>

<style scoped>

</style>
