<template>
    <div>
      <van-nav-bar
        title="忘记密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-cell value="用户名" />
      <van-cell-group>
        <van-field v-model="username" placeholder="请输入用户名" clearable/>
      </van-cell-group>
      <van-button type="default" size="large" @click="getQuestion">查询密保问题</van-button>
      <div v-if="username==''" hidden>{{status=100}}</div>
      <div v-else-if="status==0">
        <van-cell value="密保问题" />
        <van-cell-group>
          <van-field v-model="question" disabled="true" />
        </van-cell-group>
        <van-cell value="密保问题答案" />
        <van-cell-group>
          <van-field v-model="answer" placeholder="请输入密保问题答案" clearable/>
        </van-cell-group>
        <van-button type="default" size="large" @click="getToken">下一步</van-button>
      </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
      name: "forgetPassword",
      data(){
        return{
          status:100,
          username:"",
          question:"",
          answer:"",
          error_msg:"",
          forgetToken:""
        }
      },
      methods:{
        onClickLeft() {
          this.$router.push({ path:'/login'})
        },
        getQuestion:function () {
          var _vue=this
          this.service.get("/user/forget_get_question.do",{
            params:{
              username:_vue.username
            }
          })
            .then(function (response) {
             /* console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.msg)*/
             /* _vue.error_msg=response.data.msg*/
              _vue.status=response.data.status
              if(response.data.status==100){
                Toast(response.data.msg);
              }
              if(response.data.status==0){
                _vue.question=response.data.msg
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        getToken:function () {
          var _vue=this
          this.service.get("/user/forget_check_answer.do",{
            params:{
              username:_vue.username,
              question:_vue.question,
              answer: _vue.answer,
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.msg)*/
              /* _vue.error_msg=response.data.msg*/
              /*_vue.status=response.data.status*/
              if(response.data.status==100){
                Toast(response.data.msg);
              }
              if(response.data.status==0){
                /*_vue.forgetToken=response.data.msg*/
                _vue.$router.push({name:'ResetPassword',params:{forgetToken:response.data.msg,username:_vue.username}})
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>

</style>
