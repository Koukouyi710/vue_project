<template>
  <div>

    <!--导航-->
    <div v-if="username_error_msg==''&&email_error_msg==''&&phone_error_msg==''">
      <van-nav-bar title="设置"
                   right-text="完成"
                   left-arrow
                   @click-left="onClickLeft"
                   @click-right="onClickRight()">
      </van-nav-bar>
    </div>
    <div v-if="username_error_msg!=''||email_error_msg!=''||phone_error_msg!=''">
      <van-nav-bar title="设置"
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>
    </div>
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
        <van-cell title="修改收货地址" value=" " is-link :to="{name:'ShippingList',params:{shippingId:-1}}"  title-style="position:absolute;margin-left:1rem"/>
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell title="用户ID" :value="userInfo.id" title-style="position:absolute;margin-left:1rem"/>
        <van-field  v-model="userInfo.username"
                    label="用户名 . .  "
                    clearable
                    placeholder="请输入用户名"
                    input-align="right"
                    :error-message="username_error_msg"
                    error-message-align="right"
                    />

        <van-cell title="修改密码" value=" " is-link to="/updatePassword"  title-style="position:absolute;margin-left:1rem"/>

        <van-field  v-model="userInfo.email"
                    label="电子邮箱"
                    clearable
                    placeholder="请输入邮箱"
                    input-align="right"
                    :error-message="email_error_msg"
                    error-message-align="right"
        />

        <van-field  v-model="userInfo.phone"
                    label="手机号码"
                    clearable
                    placeholder="请输入手机号码"
                    input-align="right"
                    :error-message="phone_error_msg"
                    error-message-align="right"
        />

        <!--<van-cell title="用户名" :value="userInfo.username "
                  is-link to=""
                  title-style="position:absolute;margin-left:1rem"/>

        <van-cell title="修改密码" value=" " is-link to=""  title-style="position:absolute;margin-left:1rem"/>

        <van-cell title="邮箱" :value="userInfo.email"
                  is-link to=""
                  title-style="position:absolute;margin-left:1rem"/>
        <van-cell title="手机号码" :value="userInfo.phone.substring(0,3)+'****'+userInfo.phone.substring(userInfo.phone.length-4)"
                  is-link to=""
                  title-style="position:absolute;margin-left:1rem"/>-->

        <van-cell title="注册时间" :value="userInfo.createTime"  title-style="position:absolute;margin-left:1rem"/>
      </van-cell-group>

      <van-cell-group title=" ">
        <van-cell title="退出当前账号" value=" " title-style="position:absolute;margin-left:1rem" @click="exit"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
    import { Cell, CellGroup } from 'vant';
    import { Toast } from 'vant';
    import { Dialog } from 'vant';
    export default {
        name: "MyInfo",
        data(){
          return{
            userInfo:{},
            username_error_msg:"",
            email_error_msg:"",
            phone_error_msg:"",
          }
        },
        mounted(){
          this.getUserInfo()
        },
        updated(){
          this.check(this.userInfo.username,"username")
          this.check(this.userInfo.email,"email")
          if (this.userInfo.phone==''){
            this.phone_error_msg="手机号码不能为空！"
          }
          else {
            this.phone_error_msg=""
          }
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
          check:function (str,type) {
            var _vue=this
            this.service.get("/user/check_valid.do",{
              params:{
                str:str,
                type:type,
              }
            })
              .then(function (response) {
               /* console.log(response)
                console.log(response.status)
                console.log(response.data.status)
                console.log(response.data)*/
                if (type=="username") {
                  if (response.data.msg=="用户名或者邮箱不能为空!"){
                    _vue.username_error_msg="用户名不能为空"
                  }
                  else if (response.data.msg=="用户名可用！"){
                    _vue.username_error_msg=""
                  }
                  else {
                    _vue.username_error_msg=response.data.msg
                  }
                }
                if (type=="email") {
                  if (response.data.msg=="用户名或者邮箱不能为空!"){
                    _vue.email_error_msg="邮箱不能为空"
                  }
                  else if (response.data.msg=="该邮箱可注册！"){
                    _vue.email_error_msg=""
                  }
                  else{
                    _vue.email_error_msg=response.data.msg
                  }
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
            var _vue=this
            this.service.get("/user/update_information.do",{
              params:{
                username:this.userInfo.username,
                phone:this.userInfo.phone,
                email:this.userInfo.email
              }
            })
              .then(function (response) {
                /*console.log(response)
                console.log(response.status)
                console.log(response.data.status)
                console.log(response.data.data)*/
                Toast.success('修改成功！');
              })
              .catch(function (error) {
                console.log(error)
              })
          },
          exit:function () {
            var _vue=this
            Dialog.confirm({
              title: '提示',
              message: '您确定要退出当前账号吗？'
            }).then(action =>{
              if(action == 'confirm'){
                this.service.get("/user/logout.do")
                  .then(function (response) {
                    console.log(response)
                    console.log(response.status)
                    console.log(response.data.status)
                    console.log(response.data.data)
                    Toast.success('登出成功！');
                    _vue.$router.push({path:'/my'})

                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              }
            }).catch(() => {
              console.log('取消删除')
            });
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
