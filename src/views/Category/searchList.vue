<template>
  <div>
    <!--导航-->
    <van-nav-bar title="商品列表"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <!-- <van-dropdown-menu>
       <van-dropdown-item v-model="value1" :options="option1" />
       <van-dropdown-item v-model="value2" :options="option2" />
     </van-dropdown-menu>-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >

        <!--商品卡-->
        <div v-for="(item,index) of productList" :key="index">
          <router-link :to="{name:'ProductItem',params:{productNo:item.id}}">
            <van-card
              :price="item.price"
              :desc="item.subtitle"
              :title="item.name"
              :thumb="'http://img.cdn.imbession.top/'+item.mainImage"
              :origin-price="item.price+300"
            />
          </router-link>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  export default {
    name: "productList",
    data() {
      return {
        categoryId:this.$route.params.categoryId,
        keyword:this.$route.params.keyword,
        categoryList:[],
        count:0,
        isLoading : false,
        p_count:0,
        value1: 0,
        value2: 'a',
        currentPage: 1,
        productList:[],
        list: [],
        loading: false,
        error:false,
        finished: false,
        totalPage:0,
        option1: [
          {text: '全部分类', value: 0},
          {text: '详细分类', value: 1},
        ],
        option2: [
          { text: '默认排序', value: 'a' },
        ]
      }
    },
    mounted(){
      this.getProduct(this.currentPage)
    },
    methods:{
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.finished = false;
          this.categoryList=[],
            this.isLoading = false;
          this.count=0,
            this.p_count=0,
            this.currentPage= 1,
            this.productList=[],
            this.list=[],
            this.loading= false,
            this.error=false,
            this.totalPage=0
          this.getProduct(this.currentPage)
        }, 500);
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < this.list.length; i++) {
            this.productList.push(this.list[i])
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.productList.length >= this.p_count) {
            this.finished = true;
          }
          this.currentPage++
          this.getProduct(this.currentPage)
        }, 500)
          .catch(() => {
            this.error = true;
          })
      },
      onClickLeft(){this.$router.back(-1)},
      getProduct(currentPage){
        var _vue=this
        this.service.get("/product/list.do", {
          params:{
            keyword:this.keyword,
            pageNum:currentPage
          }
        })
          .then(function (response) {
            /*console.log(response)
            console.log(response.status)
            console.log(response.data.status)
            console.log(response.data.data.list)*/
            _vue.p_count=response.data.data.total
            _vue.list=response.data.data.list
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
