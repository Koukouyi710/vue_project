<template>
    <div>
      <!--导航-->
      <van-nav-bar title=""
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>

      <!--商品图-->
      <van-swipe indicator-color="white" touchable="true" loop="false">
        <van-swipe-item v-for="(item,index) of imgList" :key="index">
            <van-image :src="'http://img.cdn.imbession.top/'+imgList[index]" height="23rem" fit="cover"/>
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
      <!--价格-->
      <van-cell size="large" style="margin-top: 0.3rem">
        <template slot="title" style="float: left">
          <span class="custom-title">￥<span class="price">{{productInfo.price.toFixed(2)}}</span></span>
          <div v-if="productInfo.is_new=='1'">
            <van-tag type="primary" style="float: left;margin-left: 1rem;margin-top: 0.15rem">新品</van-tag>
          </div>
          <div v-if="productInfo.is_hot=='1'">
            <van-tag type="danger" style="float: left;margin-left: 1rem;margin-top: 0.15rem">热门</van-tag>
          </div>
        </template>
      </van-cell>

      <van-cell size="large" style="margin-top: 0.3rem">
        <template slot="title" style="float: left">
          <label class="name">{{productInfo.name}}<span class="stock">库存：{{productInfo.stock}}</span></label>
        </template>
      </van-cell>

        <van-cell is-link  @click="changesku">
          <template slot="title">
            <span style="color: #999999;float: left;margin:0 0.3rem">选择</span>
            <div class="subtitle">已选：{{productInfo.subtitle}}</div>
          </template>
        </van-cell>
      </van-cell-group>

      <!--详情html-->
      <div>
        <van-divider>商品详情</van-divider>
        <div v-html="productInfo.detail"/>
      </div>

      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
        <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
      </van-goods-action>

      <van-sku
        v-model="show"
        stepper-title="购买数量"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :quota="quota"
        :quota-used="quotaUsed"
        :hide-stock="sku.hide_stock"
        show-add-cart-btn
        reset-stepper-on-hide
        :initial-sku="initialSku"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
      >

        <!--商品图片 价格 库存 等-->
        <template slot="sku-header">
          <van-icon name="close"  @click="changesku" size="1rem" style="margin:1rem 1rem 1rem 20rem"/>
          <div style="display: flex">
          <div style="margin: 0.3rem">
            <van-image
              width="5rem"
              height="5rem"
              :src="'http://img.cdn.imbession.top/'+this.productInfo.mainImage"
            />
          </div>
          <div>
            <span style="width: 10rem;text-align: left">{{productInfo.name}}</span><br><br>
            <span style="color: black;font-size: 0.74rem;float: left">已选："默认规格"</span>
          </div>
          <div class="van-sku__goods-price" style="margin: 0.5rem">
            <span class="van-sku__price-symbol">￥</span>
            <span class="van-sku__price-num">{{productInfo.price}}</span>
            <span class="van-sku__stock">库存：{{productInfo.stock}}件</span>
          </div>
          </div>
        </template>

        <!--数量-->
        <van-divider>商品详情</van-divider>
        <template slot="sku-stepper">

        </template>

      </van-sku>
    </div>
</template>

<script>
  import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
  } from 'vant';
  import {Toast} from 'vant'
  import { Sku } from 'vant';
    export default {
        name: "productItem",
      data(){
        return{
          productNo:this.$route.params.productNo,
          productInfo:{},
          imgList:[],
          show: false,
          sku: {
            tree: [
              {
                k: '规格',
                v: {
                    id: '30349',
                    name: '默认',
                    imgUrl: ''
                  },
                k_s: 's1'
              }
            ],
            list: {
                id: 2259,
                price: 100,
            },
            price: '1.00', // 默认价格（单位元）
            none_sku: true, // 是否无规格商品
            hide_stock: false // 是否隐藏剩余库存
          },
          goods: {
            title: '测试商品',
            // 默认商品 sku 缩略图
            picture: ''
          },
        }
      },
      mounted(){
        this.getDetail()
      },
      methods:{
        onClickLeft(){this.$router.back(-1)},
        changesku(){
          this.show=!this.show
        },
        getDetail:function () {
          var _vue=this
          this.service.get("/product/detail.do",{
            params:{
              productId:_vue.productNo
            }
          })
            .then(function (response) {
             /* console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data)*/
              _vue.productInfo=response.data.data
              _vue.imgList=response.data.data.subImages.split(",")
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        onClickIcon() {
          Toast('点击图标');
        },
        onClickButton() {
          Toast('点击按钮');
        }
      }
    }
</script>

<style scoped>
.custom-title{
  float: left;
  font-weight: bold;
  color: red
}
  .price{
    font-size: 1.6rem;
  }
  .name{
    float: left;
    font-size: 0.85rem;
    text-align: left;
    margin-left: 0.3rem;
  }
  .stock{
    color: #999999;
    float: right;
  }
  .subtitle{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 14rem;
  }
</style>

<style>
  .ELazy-loading{
    width: 24rem;
    height: 57rem;
  }
</style>
