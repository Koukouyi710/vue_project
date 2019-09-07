<template>
    <div>
      <!--导航-->
      <van-nav-bar title="确认订单"
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>
      <!--地址部分-->
      <div style="margin: 1rem 0.3rem;">
        <router-link :to="{name:'ShippingList',params:{shippingId:s_index}}">
          <van-cell  icon="location-o" style="border-radius: 0.6rem;">
            <span>{{shippingList[s_index].receiverName+' '+shippingList[s_index].receiverPhone+'-'+shippingList[s_index].receiverMobile}}</span><br>
            <van-icon name="arrow" style="float: right;margin:0 0.3rem 1rem 1rem" size="1rem" color="#999999"/>
            <span>{{shippingList[s_index].receiverProvince+' '+shippingList[s_index].receiverCity+' '+shippingList[s_index].receiverDistrict+' '+shippingList[s_index].receiverAddress}}</span>
            <span style="float: right;margin-right: 0.3rem">{{shippingList[s_index].receiverZip}}</span>
          </van-cell>
        </router-link>
      </div>
      <!--商品部分-->
      <div style="margin: 1rem 0.3rem;">
        <div v-for="(product,p_index) of orderItemVoList" :key="p_index" style="border-radius: 0.6rem;">
          <router-link :to="{name:'ProductItem',params:{productNo:product.productId}}">
            <van-card
              :num="product.quantity"
              :price="product.currentUnitPrice"
              :desc="'规格：默认规格'"
              :title="product.productName"
              :thumb="'http://img.cdn.imbession.top/'+product.productImage"
              @click="toProductDetail"
              style="text-align: left"
            />
          </router-link>
        </div>
      </div>
      <!--底部提交-->
      <van-submit-bar
        button-text="提交订单"
        @submit="onSubmit"
      >
        <span>合计：</span>
        <span style="color:red;">￥</span>
        <span style="color:red;font-size: 1.3rem;margin-right: 0.3rem">{{productTotalPrice.toFixed(2)}}</span>
      </van-submit-bar>
    </div>
</template>

<script>
  import {Toast} from 'vant'
    export default {
        name: "CheckOrder",
      mounted(){
          this.getShipping()
        this.getCart()
      },
      data(){
        return{
          shippingList:[],
          s_index:this.$route.params.shippingId,
          orderItemVoList:[],
          productTotalPrice:0,
          orderNo:0
        }
      },
      methods:{
        onClickLeft(){this.$router.back(-1)},
        getShipping() {
          var _vue=this
          this.service.get("/shipping/list.do")
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.list)*/
              _vue.shippingList=response.data.data.list
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        getCart() {
          var _vue=this
          this.service.get("/order/get_order_cart_product.do")
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.orderItemVoList)*/
              _vue.orderItemVoList=response.data.data.orderItemVoList
              _vue.productTotalPrice=response.data.data.productTotalPrice
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        onSubmit:function () {
          var _vue=this
          this.service.get("/order/create.do",{
            params:{
              shippingId:this.shippingList[this.s_index].id
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.orderNo)*/
              _vue.orderNo=response.data.data.orderNo
              _vue.$router.push({name:'ToPay',params:{orderNo:_vue.orderNo}})
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
