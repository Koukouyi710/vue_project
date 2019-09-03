<template>
    <div>
      <van-nav-bar
        title="忘记密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
</template>

<script>
    export default {
      name: "forgetPassword",
      methods:{
        onClickLeft() {
          this.$router.push({ path:'/login'})
        },
      }
    }
</script>

<style scoped>

</style>
