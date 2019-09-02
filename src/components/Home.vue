<template>
    <div>
      <home-header></home-header>
      <home-carousel></home-carousel>
      <home-category></home-category>
      <van-tabs v-model="activeName" type="card" animated>
        <van-tab title="新品上市" name="a">
          <home-new></home-new>
        </van-tab>
        <van-tab title="近期热销" name="b">
          <home-hot-sale></home-hot-sale>
        </van-tab>
      </van-tabs>
      <tabbar></tabbar>
    </div>
</template>

<script>
  import HomeHeader from '../views/home/Header'
  import HomeCarousel from '../views/home/HomeCarousel'
  import HomeCategory from '../views/home/HomeCategory'
  import HomeHotSale from '../views/home/HomeHotSale'
  import HomeNew from '../views/home/HomeNew'
  import Tabbar from '../components/Tabbar'
  import { Tab, Tabs } from 'vant';
    export default {
      name: "Home",
      components:{
        HomeHotSale,
        HomeCategory,
        HomeCarousel,
        HomeHeader,
        HomeNew,
        Tabbar
      }
    }
</script>

<style scoped>

</style>
