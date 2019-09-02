<template>
    <div>
      <home-header></home-header>
      <home-carousel></home-carousel>
      <home-category></home-category>
      <home-new></home-new>
      <home-hot-sale></home-hot-sale>
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
