<template>
  <div>
    <!--导航-->
    <van-nav-bar title="订单详情"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div class="status_box">
      <span class="status_text">...订单{{orderDetail.statusDesc}}</span>
    </div>
    <van-cell  icon="location-o">
      <span>{{orderDetail.receiverName+' '+orderDetail.shippingVo.receiverPhone+'-'+orderDetail.shippingVo.receiverMobile}}</span><br>
      <span>{{orderDetail.shippingVo.receiverProvince+' '+orderDetail.shippingVo.receiverCity+' '+orderDetail.shippingVo.receiverDistrict+' '+orderDetail.shippingVo.receiverAddress}}</span>
      <span style="float: right">{{orderDetail.shippingVo.receiverZip}}</span>
    </van-cell>
    <div style="margin-top: 1rem;text-align: left">
      <div v-for="(product,p_index) of orderDetail.orderItemVoList" :key="p_index">
        <router-link :to="{name:'ProductItem',params:{productNo:product.productId}}">
        <van-card
          :num="product.quantity"
          :price="product.currentUnitPrice"
          :desc="'商品Id:'+product.productId"
          :title="product.productName"
          :thumb="'http://img.cdn.imbession.top/'+product.productImage"
          @click="toProductDetail"
        />
        </router-link>
      </div>
    </div>
    <van-divider />
    <van-panel style="text-align: left" title="订单信息" :desc="'订单编号：'+orderDetail.orderNo" :status="orderDetail.statusDesc">
      <div style="color: #999999;font-size: 0.76rem">
        <span style="margin: 0.2rem 1rem">支付方式</span>
        <span style="float: right;margin: 0.2rem 1rem">{{orderDetail.paymentTypeDesc}}</span><br>
        <span style="margin: 0.2rem 1rem">商品总价</span>
        <span style="float: right;margin: 0.2rem 1rem">￥{{orderDetail.payment.toFixed(2)}}</span><br>
        <span style="margin: 0.2rem 1rem">运费（快递）</span>
        <span style="float: right;margin: 0.2rem 1rem">￥{{orderDetail.postage.toFixed(2)}}</span>
      </div>
      <div style="font-size: 0.9rem">
        <span style="margin: 0.2rem 1rem">订单总价</span>
        <span style="float: right;margin: 0.2rem 1rem;color: red">￥{{(orderDetail.payment+orderDetail.postage).toFixed(2)}}</span>
      </div>
      <div style="float: right;margin: 1rem">
        <div v-if="orderDetail.status==10">
          <router-link to="#">
            <van-button type="info" size="small">确认付款</van-button >
          </router-link>
          <router-link to="#">
            <van-button color="gray" size="small">取消订单</van-button >
          </router-link>
        </div>
        <div v-if="orderDetail.status==20" style="margin-left: 3rem">
          <router-link to="#">
            <van-button type="warning" size="small">提醒卖家发货</van-button >
          </router-link>
        </div>
        <div v-if="orderDetail.status==40" style="margin-left: 4rem">
          <router-link to="#">
            <van-button type="info" size="small">确认收货</van-button >
          </router-link>
        </div>
        <div v-if="orderDetail.status==50">
          <router-link to="#">
            <van-button type="primary" size="small">进行评价</van-button >
            <van-button type="danger" size="small">退款/售后</van-button >
          </router-link>
        </div>
      </div>
      <!--<div style="color: #999999;font-size: 0.76rem">
        <span style="margin: 0.2rem 1rem">支付方式</span>
        <span style="float: right;margin: 0.2rem 1rem">{{orderDetail.paymentTypeDesc}}</span><br>
      </div> -->
    </van-panel>
  </div>
</template>

<script>
    export default {
      name: "OrderDetail",
      data(){
        return{
          orderNo:this.$route.params.orderNo, //订单号
          orderDetail:{},
          act:this.$route.params.active
        }
      },
      mounted(){
        this.getOrderDetail(this.orderNo)
      },
      methods:{
        onClickLeft() {
          this.$router.push({ name:'Myorder',params:{act:this.act}})
        },
        toProductDetail(){
          /*this.$router.push({ path:'/myorder/0'})*/
        },
        getOrderDetail:function (orderNo) {
          var _vue=this
          this.service.get("/order/detail.do",{
            params:{
              orderNo:orderNo,
            }
          })
            .then(function (response) {
               console.log(response)
               console.log(response.status)
               console.log(response.data.status)
               console.log(response.data.data)
               _vue.orderDetail=response.data.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
      }
    }
</script>

<style scoped>
  .status_box{
    height: 5rem;
    background-color: sandybrown;
  }
  .status_text{
    font-size: 1.38rem;
    font-weight: bold;
    color: white;
    margin-top: 1.5rem;
    margin-right: 10rem;
  }
</style>
