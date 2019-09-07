<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
      <!--导航-->
      <van-nav-bar title=""
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>

      <!--商品图-->
      <van-swipe indicator-color="white" touchable="true" loop="false">
        <van-swipe-item v-for="(item,index) of imgList" :key="index"  @click="changeimg(index)">
            <van-image :src="'http://img.cdn.imbession.top/'+imgList[index]" height="23rem" fit="cover"/>
        </van-swipe-item>
      </van-swipe>

      <!--图片显示-->
      <van-image-preview
        v-model="imgshow"
        :images="image"
        @change="onChange"
        :startPosition="startimg"
      >
        <template v-slot:index>{{ startimg+1 }}/{{imgList.length}}</template>
      </van-image-preview>

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

      <!--底部栏-->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickStar" />
        <van-goods-action-button type="warning" text="加入购物车" @click="clickCart" />
        <van-goods-action-button type="danger" text="立即购买" @click="clickBuy" />
      </van-goods-action>

      <!--商品信息-->
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
          <van-divider/>
        </template>

        <!--数量-->
        <template slot="sku-stepper">
            <van-cell>
              <span style="float: left;margin-left: 0.5rem;margin-top: 0.2rem">购买数量</span>
              <van-stepper v-model="buynum" :max="productInfo.stock" style="margin-right: 0.5rem;margin-bottom:0.5rem;float: right"/>
            </van-cell>
        </template>

        <!--下部分-->
        <template slot="sku-messages">
          <van-cell>
            <span style="float: left;margin-left: 0.5rem;margin-top: 0.2rem">合计：</span>
            <span style="float: right;margin-right: 0.5rem;margin-top: 0.2rem;color: red">￥{{(buynum*productInfo.price).toFixed(2)}}</span>
          </van-cell>
        </template>

        <!--按钮-->
        <template slot="sku-actions" slot-scope="props">
          <div v-if="type==0">
            <div class="van-sku-actions">
              <van-button
                square
                size="large"
                type="warning"
                @click="onClickAddCart"
              >
                加入购物车
              </van-button>
              <van-button
                square
                size="large"
                type="danger"
                @click="onClickBuy"
              >
                立即购买
              </van-button>
            </div>
          </div>
          <div v-if="type==1">
            <div class="van-sku-actions">
              <van-button
                square
                size="large"
                type="warning"
                @click="onClickAddCart"
              >
                确定
              </van-button>
            </div>
          </div>
          <div v-if="type==2">
            <div class="van-sku-actions">
              <van-button
                square
                size="large"
                type="warning"
                @click="onClickBuy"
              >
                确定
              </van-button>
            </div>
          </div>
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
          type:0,
          imgshow:false,
          productNo:this.$route.params.productNo,
          productInfo:{},
          imgList:[],
          image:[],
          buynum:1,
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
        changeimg(index){
          this.imgshow=!this.imgshow
          this.startimg=index
        },
        onChange(index) {
          this.index = index;
        },
        onClickLeft(){this.$router.back(-1)},
        changesku(){
          this.show=!this.show
          this.buynum=1
          this.type=0
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
              for (var i=0;i<_vue.imgList.length;i++){
                _vue.image[i]='http://img.cdn.imbession.top/'+_vue.imgList[i]
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        toUnSelect:function (productId) {
          var _vue=this
          this.service.get("/cart/un_select.do",{
            params:{
              productId:productId
            }
          })
            .then(function (response) {
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        onClickIcon() {
          Toast('客服休息中');
        },
        onClickAddCart() {
          var _vue=this
          this.service.get("/cart/add.do",{
            params:{
              productId:_vue.productInfo.id,
              count:_vue.buynum
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data)*/
              _vue.toUnSelect(_vue.productInfo.id)
              Toast.success('添加成功！')
            })
            .catch(function (error) {
              Toast('请先登录')
              console.log(error)
            })
        },
        onClickBuy() {
          var _vue=this
          this.service.get("/cart/add.do",{
            params:{
              productId:_vue.productInfo.id,
              count:_vue.buynum
            }
          })
            .then(function (response) {
              console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data)
              _vue.$router.push({name:'CheckOrder',params:{shippingId:0}})
            })
            .catch(function (error) {
              Toast('请先登录')
              console.log(error)
            })
        },
        onClickStar(){
          this.$router.push('/cart')
        },
        clickCart(){
          this.show=!this.show
          this.buynum=1
          this.type=1
        },
        clickBuy(){
          this.show=!this.show
          this.buynum=1
          this.type=2
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
