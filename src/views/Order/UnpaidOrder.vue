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
        <router-link :to="{name:'OrderDetail',params:{active:1,orderNo:item.orderNo}}">
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
        </router-link>
          <div style="float: right"><span style="color: black">合计：</span>
            <span style="color: red"> ￥{{item.payment.toFixed(2)}}元</span>
            <div >
              <router-link :to="{name:'ToPay',params:{active:0,orderNo:item.orderNo}}">
              <van-button type="info" size="small">确认付款</van-button >
              </router-link>
              <van-button color="gray" size="small" @click="onCancel(item.orderNo)">取消订单</van-button >
            </div>
          </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
  import {Toast} from 'vant'
    export default {
        name: "UnpaidOrder",
      inject:['reload'],
      data() {
        return {
          sumList: [],
          list: [],
          loading: false,
          error:false,
          currentPage: 0,
          finished: false,
          total:0,     //记录总记录数
          count:0
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
              if(this.list[i].status==10){
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
        onCancel:function (orderNo) {
          var _vue=this
          this.service.get("/order/cancel.do",{
            params:{
              orderNo:orderNo
            }
          })
            .then(function (response) {
              /* console.log(response)
               console.log(response.status)
               console.log(response.data.status)
               console.log(response.data.data.list)*/
              if(response.data.status==0){
                Toast('取消订单成功！')
                _vue.reload()
              }
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
