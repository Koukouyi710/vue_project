<template>
    <van-tabbar route v-model="active">
      <van-tabbar-item replace
                       to="/home"
                       icon="wap-home">
        主页
      </van-tabbar-item>

      <van-tabbar-item replace
                       to="/cart"
                       icon="shopping-cart-o">
        购物车
      </van-tabbar-item>

      <van-tabbar-item replace
                       to="/my"
                       icon="contact">
        我的
      </van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        name: "Tabbar",
        data() {
          return {
            active: 0
          }
      }
    }
</script>

<style scoped>

</style>
