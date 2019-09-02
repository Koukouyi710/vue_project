<template>
  <div>

    <!--导航-->
    <van-nav-bar title="设置"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>

    <!--头像 用户名-->
    <div class="user_box">
      <div class="user_img">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="user_info">
        <div v-if="Object.keys(userInfo).length!=0">
          <span><a href="/#/myinfo" style="color: black">{{userInfo.username}}</a></span>
        </div>
      </div>
    </div>

    <div>
      <!--文字部分-->
      <van-cell-group>
        <van-cell title="用户ID" :value="userInfo.id" title-style="position:absolute;margin-left:1rem"/>
        <van-cell title="用户名" :value="userInfo.username" is-link to=""  title-style="position:absolute;margin-left:1rem"/>
        <van-cell title="修改密码" value=" " is-link to=""  title-style="position:absolute;margin-left:1rem"/>
        <van-cell title="邮箱" :value="userInfo.email" is-link to=""  title-style="position:absolute;margin-left:1rem"/>
        <van-cell title="手机号码" :value="userInfo.phone.substring(0,3)+'****'+userInfo.phone.substring(userInfo.phone.length-4)" is-link to="" title-style="position:absolute;margin-left:1rem"/>
        <van-cell title="注册时间" :value="userInfo.createTime"  title-style="position:absolute;margin-left:1rem"/>
      </van-cell-group>
    </div>

  </div>
</template>

<script>
    import { Cell, CellGroup } from 'vant';
    export default {
        name: "MyInfo",
        data(){
          return{
            userInfo:{
            }
          }
        },
        mounted(){
          this.getUserInfo()
        },
        methods: {
          getUserInfo:function () {
            var _vue=this
            this.service.get("/user/get_user_info.do")
              .then(function (response) {
                /*console.log(response)
                console.log(response.status)
                console.log(response.data.status)
                console.log(response.data.data)*/
                _vue.userInfo=response.data.data
              })
              .catch(function (error) {
                console.log(error)
              })
          },
          onClickLeft() {
            this.$router.push({ path:'/my'})
          }
        }
    }
</script>

<style scoped>
  .user_box{
    display: flex;
  }
  .user_img{
    margin:1rem 2rem;
  }
  .user_info{
    font-size: 1.38rem;
    margin-top: 2.3rem;
  }
</style>
