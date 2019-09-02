<template>
    <div>
      <!--<van-swipe :autoplay="3000" indicator-color="white" touchable="true">
        <van-swipe-item><div style="background-color: indianred;height: 10rem;color: white">1</div></van-swipe-item>
        <van-swipe-item><div style="background-color: lightpink;height: 10rem;color: white">2</div></van-swipe-item>
        <van-swipe-item><div style="background-color: deepskyblue;height: 10rem;color: white">3</div></van-swipe-item>
        <van-swipe-item><div style="background-color: yellowgreen;height: 10rem;color: white">4</div></van-swipe-item>
      </van-swipe>-->
      <van-swipe :autoplay="3000" indicator-color="white" touchable="true">
        <van-swipe-item v-for="(item,index) of isBannerList" :key="index">
          <van-image :src="'http://img.cdn.imbession.top/'+item.mainImage" height="7rem" fit="cover"/>
        </van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant';
  import { Image } from 'vant';
  export default {
    name: "HomeCarousel",
    data() {
      return {
        count:0,
        isBannerList:[]
      };
    },
    mounted(){
      this.getBanner()
    },
    methods:{
      getBanner:function () {
        var _vue=this
        this.service.get("/product/detail.do",{
          params:{
            is_new:null,
            is_hot:null,
            is_banner:1,
          }
        })
          .then(function (response) {
            /*console.log(response)
            console.log(response.status)
            console.log(response.data.status)
            console.log(response.data.data.list)*/
            _vue.isBannerList=response.data.data.list
            _vue.count=response.data.data.total
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    }
    }
</script>

<style scoped>

</style>
