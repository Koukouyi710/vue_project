<template>
    <div>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item><div style="background-color: indianred;height: 10rem;color: white">1</div></van-swipe-item>
        <van-swipe-item><div style="background-color: lightpink;height: 10rem;color: white">2</div></van-swipe-item>
        <van-swipe-item><div style="background-color: deepskyblue;height: 10rem;color: white">3</div></van-swipe-item>
        <van-swipe-item><div style="background-color: yellowgreen;height: 10rem;color: white">4</div></van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant';
  export default {
    name: "HomeCarousel"
    }
</script>

<style scoped>

</style>
