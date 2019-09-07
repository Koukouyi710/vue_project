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

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
        <!--商品卡-->
          <van-cell
            v-for="(item,index) of isHotList"
            :key="index"
          >
          <router-link :to="{name:'ProductItem',params:{productNo:item.id}}">
          <van-card
            tag="热卖"
            :price="item.price"
            :desc="item.subtitle"
            :title="item.title"
            :thumb="'http://img.cdn.imbession.top/'+item.mainImage"
            :origin-price="item.price+300"
          />
          </router-link>
          </van-cell>
        </van-list>
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
            currentPage: 0,
            isHotList:[],
            list: [],
            loading: false,
            error:false,
            finished: false,
            total:0,     //记录总记录数
            totalPage:0,
            size:5
          };
        },
      mounted(){
        this.getHot(this.currentPage,this.size)
      },
      methods:{
        onLoad() {
          // 异步更新数据
          setTimeout(() => {
            for (let i = 0; i < this.list.length; i++) {
              this.isHotList.push(this.list[i])
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.isHotList.length >= this.count) {
              this.finished = true;
            }
          }, 500)
            .catch(() => {
              this.error = true;
            })
          this.currentPage++
          this.getHot(this.currentPage,this.size)
        },
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
             /* console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.list)*/
              _vue.count=response.data.data.total
              _vue.totalPage=response.data.data.pages
              _vue.list=response.data.data.list
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        /*change(){
          if (this.currentPage>=this.totalPage) {
            this.currentPage=1;
          }
          if (this.currentPage<this.totalPage){
            this.currentPage++
          }
        }*/
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
