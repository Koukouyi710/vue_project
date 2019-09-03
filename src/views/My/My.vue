<template>
    <div>
      <!--导航-->
      <van-nav-bar title="个人中心">
        <van-icon name="setting-o" slot="right" @click="onClickRight" size="1.3rem"/>
      </van-nav-bar>
      <!--头像 用户名-->
      <div class="user_box">
        <div class="user_img">
          <van-image
            round
            width="4rem"
            height="4rem"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            @click="onClickRight"
          />
        </div>
        <div class="user_info">
          <div v-if="Object.keys(userInfo).length!=0">
            <span><a href="/#/myinfo" style="color: black">{{userInfo.username}}</a></span>
          </div>
          <!--<a @click="setUserInfo(userInfo)">请登录</a>-->
          <div v-if="Object.keys(userInfo).length==0">
            <a href="/#/login" style="color: orange">请登录</a>
          </div>
        </div>
      </div>

      <!--订单-->
      <div class="user_order">
        <!--文字-->
        <router-link :to="{name:'Myorder',params:{act:0}}">
          <span style="float: left;font-size: 0.83rem;margin-left: 1rem;margin-top:0.5rem;color: black">我的订单</span>
          <span style="float: right;margin-right: 1rem;margin-top:0.5rem;font-size: 0.83rem;color: gray">查看全部订单 <van-icon name="arrow" size="0.83rem"/></span></router-link><br>
        <!--分割线-->
        <van-divider></van-divider>
        <!--订单宫格框-->
        <van-grid clickable :column-num="5" :border="false">
          <van-grid-item
            icon="paid"
            text="待付款"
            :to="{name:'Myorder',params:{act:1}}"
          />
          <van-grid-item
            icon="send-gift-o"
            text="待发货"
            :to="{name:'Myorder',params:{act:2}}"
          />
          <van-grid-item
            icon="logistics"
            text="待收货"
            :to="{name:'Myorder',params:{act:3}}"
          />
          <van-grid-item
            icon="comment-o"
            text="评价"
            :to="{name:'Myorder',params:{act:4}}"
          />
          <van-grid-item
            icon="after-sale"
            text="退款/售后"
            :to="{name:'Myorder',params:{act:4}}"
          />
        </van-grid>

      </div>

      <!--底部标签栏-->
      <tabbar></tabbar>
    </div>
</template>

<script>
    import { Grid, GridItem } from 'vant';
    import { Icon } from 'vant';
    import { Divider } from 'vant';
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import Tabbar from "../../components/Tabbar";
    export default {
        name: "My",
      components: {Tabbar},
      computed:{
          ...mapGetters(['getUser']),
          /*userInfo(){
            return this.$store.state.userInfo;
          }*/
      },
      data(){
          return{
            userInfo:{
             /* username:"",
              password:""*/
            }
          }
      },
      mounted(){
        this.getUserInfo()
      },
      methods:{
          ...mapActions(['setUserInfo']),
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
        onClickRight(){
          this.$router.push({ path:'/myinfo'})
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
  .user_order{
    margin: auto 1rem;
    background: white;
    height: 9.3rem;
    border-radius:1rem;
  }
</style>
