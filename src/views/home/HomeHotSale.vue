<template>
    <div class="hot_sale">
      <div>
        <!--倒计时-->
        <div class="timedown">
          <van-divider content-position="right">
            <van-count-down
              :time="time"
              format="倒计时：DD 天 HH 时 mm 分 ss 秒"
              style="color: red"
            />
          </van-divider>
        </div>
        <!--商品卡-->
        <div v-for="(item,index) of isHotList" :key="index">
          <van-card
            tag="热卖"
            :price="item.price"
            :desc="item.subtitle"
            :title="item.title"
            :thumb="'http://img.cdn.imbession.top/'+item.mainImage"
            :origin-price="item.price+300"
          />
        </div>
        <van-pagination
        v-model="currentPage"
        :total-items="count"
        :items-per-page="3"
        @change="getHot(currentPage,3)"
        mode="simple"
      >
      </van-pagination>
      </div>

    </div>
</template>

<script>
    import { Card } from 'vant';
    import { CountDown } from 'vant';
    import { Divider } from 'vant';
    export default {
        name: "HomeHotSale",
        data() {
          return {
            time: 30 * 60 * 60 * 1000,
            count:0,
            currentPage: 1,
            isHotList:[]
          };
        },
      mounted(){
        this.getHot(1,3)
      },
      methods:{
        getHot:function (pageNum,pageSize) {
          var _vue=this
          this.service.get("/product/detail.do",{
            params:{
              is_new:null,
              is_hot:1,
              is_banner:0,
              pageNum:pageNum,
              pageSize:pageSize
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.list)*/
              _vue.isHotList=response.data.data.list
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
  .hot_sale{
    margin: 1rem auto;
    background: white;
    margin-bottom: 3rem;
  }
</style>
