<template>
  <!--导航-->
  <van-nav-bar title="修改密码"
               left-arrow
               @click-left="onClickLeft">
  </van-nav-bar>
</template>

<script>
    export default {
        name: "UpdatePassword",
        methods:{
          onClickLeft() {
            this.$router.push({ path:'/myinfo'})
          }
        }
    }
</script>

<style scoped>

</style>
