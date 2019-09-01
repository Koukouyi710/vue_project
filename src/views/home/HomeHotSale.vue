<template>
    <div class="hot_sale">
      <div>
        <van-divider content-position="left">热销商品</van-divider>
      </div>
      <div>
        <!--商品卡-->
        <div>
          <van-card
            tag="热卖"
            price="9.80"
            desc="描述信息"
            title="商品名称"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            origin-price="25.00"
          />
        </div>
        <!--倒计时-->
        <div class="timedown">
          <van-divider content-position="right">
            <van-count-down
              :time="time"
              format="倒计时：DD 天 HH 时 mm 分 ss 秒"
              style="color: red"
            />
          </van-divider>
        </div>
      </div>

    </div>
</template>

<script>
    import { Card } from 'vant';
    import { CountDown } from 'vant';
    import { Divider } from 'vant';
    export default {
        name: "HomeHotSale",
        data() {
          return {
            time: 30 * 60 * 60 * 1000
          };
        }
    }
</script>

<style scoped>
  .hot_sale{
    margin: 1rem;
    background: white;
    border-radius:1rem;
  }
</style>
