<template>
    <div>
      <!--导航-->
      <van-nav-bar title="商品详情"
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>
    </div>
</template>

<script>
    export default {
        name: "productItem",
      data(){
        return{
          productNo:this.$route.params.productNo, //订单号
        }
      },
      methods:{
        onClickLeft(){this.$router.back(-1)}
      }
    }
</script>

<style scoped>

</style>
