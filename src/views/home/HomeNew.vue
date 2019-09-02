<template>
    <div class="new">
      <div>
        <van-divider>本周上新</van-divider>
        <!--商品卡-->
        <div v-for="(item,index) of isNewList" :key="index">
          <van-card
            tag="新品"
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
          @change="getNew(currentPage,3)"
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
    import { Tag } from 'vant';
    import { Pagination } from 'vant';
    export default {
        name: "HomeNew",
        data() {
          return {
            count:0,
            currentPage: 1,
            isNewList:[]
          };
        },
      mounted(){
          this.getNew(1,3)
      },
      methods:{
        getNew:function (pageNum,pageSize) {
          var _vue=this
          this.service.get("/product/detail.do",{
            params:{
              is_new:1,
              is_hot:0,
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
              _vue.isNewList=response.data.data.list
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
  .new{
    margin: 1rem auto;
    background: white;
    margin-bottom: 3rem;
  }
</style>
