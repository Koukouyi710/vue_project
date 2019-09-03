<template>
  <div>
    <!--导航-->
    <van-nav-bar title="订单详情"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    {{orderDetail}}
  </div>
</template>

<script>
    export default {
      name: "OrderDetail",
      data(){
        return{
          orderNo:this.$route.params.orderNo, //订单号
          orderDetail:{}
        }
      },
      mounted(){
        this.getOrderDetail(this.orderNo)
      },
      methods:{
        onClickLeft() {
          this.$router.push({ path:'/myorder'})
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

</style>
