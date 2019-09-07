<template>
    <div class="header">
      <form action="" v-on:submit.prevent="" class="searchFrom">
          <div style="display: flex;align-items: center">
            <div style="flex: 1">
              <van-search
                background="lightgray"
                v-model="keyword"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                clearable
                right-icon="scan"
              >
                <div slot="action" @click="onSearch" style="color: black">搜索</div>
              </van-search>
            </div>
          </div>
      </form>
    </div>
</template>

<script>
  import { Icon } from 'vant';
  import { Toast } from 'vant';
    export default {
      name: "HomeHeader",
      data(){
        return{
          keyword:""
        }
      },
      methods:{
        onSearch(){
          this.$router.push({name:'SearchList',params:{keyword:this.keyword}})
        }
      }
    }
</script>

<style lang="stylus" scoped>

</style>
