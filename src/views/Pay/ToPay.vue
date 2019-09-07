<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!--导航-->
    <van-nav-bar title="支付"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div style="margin: 2rem 0">
      <p>订单编号</p>
      <p style="font-weight: bold">{{orderNo}}</p>
    </div>
    <img :src="qrCode"/>
    <p>扫码付款</p>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {Toast} from 'vant'
    export default {
        name: "ToPay",
      data(){
          return{
            orderNo:this.$route.params.orderNo,
            qrCode:"",
            isLoading: false,
            timer:null
          }
      },
      mounted(){
          this.toPay()
        this.timer=setInterval(() => {
          setTimeout(this.checkStatus, 0)
        }, 3000)
      },
      destroyed(){
          clearInterval(this.timer)
      },
      methods:{
        onClickLeft(){this.$router.push('/my')},
        onRefresh() {
          setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false;
            this.count++;
          }, 500);
        },
        toPay() {
          var _vue=this
          this.service.get("/order/pay.do",{
            params:{
              orderNo:this.orderNo
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.qrCode)*/
              _vue.qrCode=response.data.data.qrCode
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        checkStatus(){
          var _vue=this
          this.service.get("/order/query_order_pay_status.do",{
            params:{
              orderNo:this.orderNo
            }
          })
            .then(function (response) {
              console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data)
              if (response.data.data==true){
                Toast.success("支付成功！")
                _vue.$router.push({name:'Myorder',params:{act:2}})
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
