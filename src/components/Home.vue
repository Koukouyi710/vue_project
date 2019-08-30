<template>
    <div>
      这是Home组件

 <!--     <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索">
      </mt-search>
-->
      <mt-switch v-model="value">开关</mt-switch>

      <mt-button type="default">default</mt-button>
      <mt-button type="primary">primary</mt-button>
      <mt-button type="danger">danger</mt-button>
      <mt-button size="small">small</mt-button>
      <mt-button size="large">large</mt-button>
      <mt-button size="normal">normal</mt-button>
      <mt-button disabled>disabled</mt-button>
      <mt-button plain>plain</mt-button>
      <mt-button icon="back">back</mt-button>
      <mt-button icon="more">更多</mt-button>

      <mt-tabbar v-model="selected">
        <mt-tab-item id="home">
          <!--<img slot="icon" src="../assets/100x100.png">-->
          首页
        </mt-tab-item>
        <mt-tab-item id="message">
          消息
        </mt-tab-item>
        <mt-tab-item id="shopcart">
          购物车
        </mt-tab-item>
        <mt-tab-item id="my">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style>

</style>
