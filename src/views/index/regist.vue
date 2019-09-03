<template>
    <div>
      <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
</template>

<script>
    export default {
        name: "regist",
        methods:{
          onClickLeft() {
            this.$router.push({ path:'/login'})
          },
        }
    }
</script>

<style scoped>

</style>
