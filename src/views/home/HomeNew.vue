<template>
    <div class="new">
      <div>
        <van-divider>本周上新</van-divider>

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >

        <!--商品卡-->
        <div v-for="(item,index) of isNewList" :key="index">
          <router-link :to="{name:'ProductItem',params:{productNo:item.id}}">
          <van-card
            tag="新品"
            :price="item.price"
            :desc="item.subtitle"
            :title="item.title"
            :thumb="'http://img.cdn.imbession.top/'+item.mainImage"
            :origin-price="item.price+300"
          />
          </router-link>
        </div>
        </van-list>
        <!--<van-pagination
          v-model="currentPage"
          :total-items="count"
          :items-per-page="size"
          @change="getNew(currentPage,size)"
          mode="simple"
        >
        </van-pagination>-->
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
            currentPage: 0,
            isNewList:[],
            list: [],
            loading: false,
            error:false,
            finished: false,
            totalPage:0,
            size: 5
          };
        },
      mounted(){
          this.getNew(this.currentPage,this.size)
      },
      methods:{
        onLoad() {
          // 异步更新数据
          setTimeout(() => {
            for (let i = 0; i < this.list.length; i++) {
              this.isNewList.push(this.list[i])
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.isNewList.length >= this.count) {
              this.finished = true;
            }
          }, 500)
            .catch(() => {
              this.error = true;
            })
          this.currentPage++
          this.getNew(this.currentPage,this.size)
        },
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
              _vue.count=response.data.data.total
              _vue.list=response.data.data.list
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
