<template>
  <div>
    <!--全订单列表-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) of sumList"
        :key="index"
      >
        <router-link :to="{name:'OrderDetail',params:{active:4,orderNo:item.orderNo}}">
          <van-panel :title="'订单号:'+item.orderNo" :desc="'支付方式—'+item.paymentTypeDesc" :status="item.statusDesc"/>
          <div v-for="(product,p_index) of item.orderItemVoList" :key="p_index">
            <van-card
              :num="product.quantity"
              :price="product.currentUnitPrice"
              :desc="'商品Id:'+product.productId"
              :title="product.productName"
              :thumb="'http://img.cdn.imbession.top/'+product.productImage"
            />
          </div>
          <div style="float: right"><span style="color: black">合计：</span>
            <span style="color: red"> ￥{{item.payment.toFixed(2)}}元</span>
            <div>
              <router-link to="#">
              <van-button type="primary" size="small">进行评价</van-button >
                <van-button type="danger" size="small">退款/售后</van-button >
              </router-link>
            </div>
          </div>
        </router-link>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
    export default {
        name: "PJOrder",
      data() {
        return {
          sumList: [],
          list: [],
          loading: false,
          error:false,
          currentPage: 0,
          finished: false,
          total:0,    //记录总记录数
          count:0,
        };
      },
      mounted(){
        this.getOrderList(this.currentPage)
      },
      /*updated(){
        this.getOrderList(this.currentPage)
      },*/
      methods:{
        /*onClick(orderNo) {
          this.$router.push({ path:'/orderDetail',
            params:{
              orderNo:orderNo
            }
          })
        },*/
        onLoad() {
          // 异步更新数据
          setTimeout(() => {
            for (let i = 0; i < this.list.length; i++) {
              if(this.list[i].status==50){
                this.sumList.push(this.list[i])
              }
              this.count++
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.count >= this.total) {
              this.finished = true;
            }
          }, 500)
          this.currentPage++
          this.getOrderList(this.currentPage)
        },
        getOrderList:function (pagenum) {
          var _vue=this
          this.service.get("/order/list.do",{
            params:{
              pageNum:pagenum
            }
          })
            .then(function (response) {
              /* console.log(response)
               console.log(response.status)
               console.log(response.data.status)
               console.log(response.data.data.list)*/
              _vue.list=response.data.data.list
              _vue.total=response.data.data.total
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
