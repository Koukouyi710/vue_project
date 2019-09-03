<template>
  <div>
    <!--导航-->
    <van-nav-bar title="我的订单"
                 left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <van-tabs v-model="active">
      <!--全部订单-->
      <van-tab title="全部订单">
        <full-order></full-order>
      </van-tab>

      <!--待付款-->
      <van-tab title="待付款">
        <unpaid-order></unpaid-order>
      </van-tab>

      <!--待发货-->
      <van-tab title="待发货">
        <paid-order></paid-order>
      </van-tab>

      <!--待收货-->
      <van-tab title="待收货">
        <send-order></send-order>
      </van-tab>

      <!--待评价-->
      <van-tab title="待评价">
        <p-j-order></p-j-order>
      </van-tab>

      <!--关闭或取消-->
      <van-tab title="取消/关闭">
        <over-order></over-order>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { List } from 'vant';
  import { Cell, CellGroup } from 'vant';
  import FullOrder from './FullOrder'
  import UnpaidOrder from './UnpaidOrder'
  import PaidOrder from './PaidOrder'
  import OverOrder from './OverOrder'
  import SendOrder from './SendOrder'
  import PJOrder from './PJOrder'

  export default {
      name: "Myorder",
      components: {
        FullOrder,
        UnpaidOrder,
        PaidOrder,
        OverOrder,
        SendOrder,
        PJOrder,
      },
      methods:{
        onClickLeft() {
          this.$router.push({ path:'/my'})
        },
      },
      data() {
        return {
          active: this.$route.params.act
        }
      }
    }
</script>

<style scoped>

</style>
