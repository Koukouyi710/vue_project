<template>
    <div>
      <home-header></home-header>
      <home-carousel></home-carousel>
      <home-category></home-category>
      <home-hot-sale></home-hot-sale>
      <tabbar></tabbar>
      这是Home组件
    </div>
</template>

<script>
  import HomeHeader from '../views/home/Header'
  import HomeCarousel from '../views/home/HomeCarousel'
  import HomeCategory from '../views/home/HomeCategory'
  import HomeHotSale from '../views/home/HomeHotSale'
  import Tabbar from '../components/Tabbar'
    export default {
      name: "Home",
      components:{
        HomeHotSale,
        HomeCategory,
        HomeCarousel,
        HomeHeader,
        Tabbar
      }
    }
</script>

<style scoped>

</style>
