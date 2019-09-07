<template>
  <div>
    <div v-if="shippingId==0">
      <!--导航-->
      <van-nav-bar title="添加新地址"
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>
    </div>
    <div v-if="shippingId!=0">
      <!--导航-->
      <van-nav-bar title="编辑地址"
                   left-arrow
                   @click-left="onClickLeft">
      </van-nav-bar>
    </div>
    <div v-if="shippingId==0">
      <template>
        <van-cell-group style="text-align: center">
          <van-field
            v-model="receiverName"
            required
            clearable
            label="收件人"
            placeholder="请输入收货人姓名"
          />
          <van-field
            v-model="receiverPhone"
            label="电话"
            clearable
            placeholder="请输入收货人电话号码"
            required
          />
          <van-field
            v-model="receiverMobile"
            label="手机"
            clearable
            placeholder="请输入收货人手机号码"
            required
          />
          <div>
            <!--<van-field
              v-model="receiverAddress"
              label="地区"
              clearable
              placeholder="请选择省/市/地区"
              required
              @click="toShow"
            />-->
            <div>
              <p style="border-bottom: 1px solid #efefef;margin-left: 1rem" @click="toShow">
                <span style="color: #f44;float: left;margin:0 -0.48rem;font-size: 0.8rem">*</span>
                <span style="float: left;margin:-0.32rem 2rem;font-size: 0.9rem ">地区</span>
                <span v-if="receiverProvince==''&&receiverCity==''&&receiverDistrict==''"
                      style="float: left">
                  <span style="color: #cccccc;margin-left: 0;font-size: 0.88rem">请选择省/市/地区</span>
                </span>
                <span v-else
                      style="float: left">
                  <span style="margin-left: 0;font-size: 0.88rem">{{receiverProvince+' '+receiverCity+' '+receiverDistrict}}</span>
                </span>
                <span style=";margin-bottom: 1.5rem"> </span>
              </p>
              <van-popup v-model="show"  position="bottom" :style="{ height: '40%' }">
                <van-area :area-list="areaList" @confirm="onAddrConfirm" @cancel="shut" :value="addrCode"/>
              </van-popup>
            </div>
          </div>
          <van-field
            v-model="receiverAddress"
            label="详细地址"
            clearable
            placeholder="街道、小区、房间号等"
            required
          />
          <van-field
            v-model="receiverZip"
            label="邮政编码"
            clearable
            placeholder="请输入邮政编码"
            required
          />
        </van-cell-group>
        <van-button type="info" size="large" @click="toAdd" style="font-size: 1rem">添加</van-button>
      </template>
    </div>
    <div v-if="shippingId!=0">
      <template>
        <van-cell-group style="text-align: center">
          <van-field
            v-model="shippingDetail.receiverName"
            required
            clearable
            label="收件人"
            placeholder="请输入收货人姓名"
          />
          <van-field
            v-model="shippingDetail.receiverPhone"
            label="电话"
            clearable
            placeholder="请输入收货人电话号码"
            required
          />
          <van-field
            v-model="shippingDetail.receiverMobile"
            label="手机"
            clearable
            placeholder="请输入收货人手机号码"
            required
          />
          <div>
            <!--<van-field
              v-model="receiverAddress"
              label="地区"
              clearable
              placeholder="请选择省/市/地区"
              required
              @click="toShow"
            />-->
            <div>
              <p style="border-bottom: 1px solid #efefef;margin-left: 1rem" @click="toShow">
                <span style="color: #f44;float: left;margin:0 -0.48rem;font-size: 0.8rem">*</span>
                <span style="float: left;margin:-0.32rem 2rem;font-size: 0.9rem ">地区</span>
                <span
                      style="float: left">
                  <span style="margin-left: 0;font-size: 0.88rem">{{shippingDetail.receiverProvince+' '+shippingDetail.receiverCity+' '+shippingDetail.receiverDistrict}}</span>
                </span>
                <span style=";margin-bottom: 1.5rem"> </span>
              </p>
              <van-popup v-model="show"  position="bottom" :style="{ height: '40%' }">
                <van-area :area-list="areaList" @confirm="upAddrConfirm" @cancel="shut" :value="addrCode"/>
              </van-popup>
            </div>
          </div>
          <van-field
            v-model="shippingDetail.receiverAddress"
            label="详细地址"
            clearable
            placeholder="街道、小区、房间号等"
            required
          />
          <van-field
            v-model="shippingDetail.receiverZip"
            label="邮政编码"
            clearable
            placeholder="请输入邮政编码"
            required
          />
        </van-cell-group>
        <van-button type="info" size="large" @click="toUpdate" style="font-size: 1rem">修改</van-button>
      </template>
    </div>
  </div>
</template>

<script>
  import areaList from '../../assets/js/Area.js'
  import {Toast} from 'vant'
    export default {
        name: "NewShipping",
      components: {areaList},
      data(){
          return{
            receiverName:"",
            receiverPhone:"",
            receiverMobile:"",
            receiverProvince:"",
            receiverCity:"",
            receiverDistrict:"",
            receiverAddress:"",
            receiverZip:"",
            areaList:areaList,
            shippingId:this.$route.params.shippingId,
            shippingArea:[],
            shippingDetail:{},
            show:false
          }
      },
      mounted(){
          if (this.shippingId!=0){
            this.getDetail()
          }
      },
      methods:{
        toShow () {
          this.show = !this.show
        },
        onAddrConfirm (e) {
          this.shippingArea=e
          this.receiverProvince=e[0].name,
            this.receiverCity=e[1].name,
            this.receiverDistrict=e[2].name,
          this.show = !this.show
        },
        upAddrConfirm (e) {
          this.shippingArea=e
          this.shippingDetail.receiverProvince=e[0].name,
            this.shippingDetail.receiverCity=e[1].name,
            this.shippingDetail.receiverDistrict=e[2].name,
            this.show = !this.show
        },
        shut () {
          this.show = !this.show
        },
        onClickLeft(){this.$router.back(-1)},
        toUpdate(){
          var _vue=this
          this.service.get("/shipping/update.do",{
            params:{
              id:this.shippingDetail.id,
              receiverName:this.shippingDetail.receiverName,
              receiverPhone:this.shippingDetail.receiverPhone,
              receiverMobile:this.shippingDetail.receiverMobile,
              receiverProvince:this.shippingDetail.receiverProvince,
              receiverCity:this.shippingDetail.receiverCity,
              receiverDistrict:this.shippingDetail.receiverDistrict,
              receiverAddress:this.shippingDetail.receiverAddress,
              receiverZip:this.shippingDetail.receiverZip
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)*/
              Toast.success("修改成功!")
              _vue.$router.back(-1)
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        toAdd(){
          var _vue=this
          this.service.get("/shipping/add.do",{
            params:{
              receiverName:this.receiverName,
              receiverPhone:this.receiverPhone,
              receiverMobile:this.receiverMobile,
              receiverProvince:this.receiverProvince,
              receiverCity:this.receiverCity,
              receiverDistrict:this.receiverDistrict,
              receiverAddress:this.receiverAddress,
              receiverZip:this.receiverZip
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)*/
              Toast.success("添加成功!")
              _vue.$router.back(-1)
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        getDetail() {
          var _vue=this
          this.service.get("/shipping/select.do",{
            params:{
              shippingId:this.shippingId
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)*/
              _vue.shippingDetail=response.data.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        onSave() {
          Toast('save');
        },
        onDelete() {
          Toast('delete');
        },
      }
    }
</script>

<style scoped>

</style>
