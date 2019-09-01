<template>
    <div class="header">
      <form action="" v-on:submit.prevent="" class="searchFrom">
          <div style="display: flex;align-items: center">
            <div style="flex: 1">
              <van-search
                background="gainsboro"
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
                @cancel="onCancel"
                shape="round"
              >
                <div slot="action" @click="" style="color: black">搜索</div>
              </van-search>
            </div>
          </div>
      </form>
    </div>
</template>

<script>
    import { Icon } from 'vant';
    export default {
      name: "HomeHeader"
    }
</script>

<style lang="stylus" scoped>

</style>
