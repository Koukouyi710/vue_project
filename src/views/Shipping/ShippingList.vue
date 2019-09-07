<template>
    <div>
      <!--导航-->
      <van-nav-bar title="地址列表"
                   left-arrow
                   right-text="添加新地址"
                   @click-left="onClickLeft"
                   @click-right="onClickRight">
      </van-nav-bar>

      <!--地址-->
      <div style="margin: 1rem 0.3rem;" v-for="(item,index) of shippingList" :key="index">
       <div v-if="flag!=-1">
         <router-link :to="{name:'CheckOrder',params:{shippingId:index}}">
           <van-cell  icon="location-o" style="border-radius: 0.6rem;">
             <span v-if="index==0"><span style="color: red">[默认]</span></span>
             <span>{{item.receiverName+' '+item.receiverPhone+'-'+item.receiverMobile}}</span><br>
             <router-link :to="{name:'NewShipping',params:{shippingId:item.id}}">
               <van-icon name="edit" style="float: right;margin:0 0.3rem 1rem 1rem" size="1rem" color="#999999"/>
             </router-link>
             <span>{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</span>
             <span style="float: right;margin-right: 0.3rem">{{item.receiverZip}}</span>
           </van-cell>
         </router-link>
       </div>
        <div v-if="flag==-1">
          <van-cell  icon="location-o" style="border-radius: 0.6rem;">
            <span v-if="index==0"><span style="color: red">[默认]</span></span>
            <span>{{item.receiverName+' '+item.receiverPhone+'-'+item.receiverMobile}}</span><br>
            <router-link :to="{name:'NewShipping',params:{shippingId:item.id}}">
              <van-icon name="edit" style="float: right;margin:0 0.3rem 1rem 1rem" size="1rem" color="#999999"/>
            </router-link>
            <span>{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</span>
            <span style="float: right;margin-right: 0.3rem">{{item.receiverZip}}</span>
          </van-cell>
        </div>
      </div>
      <!--{{shippingList}}-->
    </div>
</template>

<script>
    export default {
        name: "ShippingList",
      data(){
          return{
            shippingList:[],
            flag:this.$route.params.shippingId
          }
      },
      mounted(){
          this.getList()
      },
      methods:{
        onClickLeft(){this.$router.back(-1)},
        onClickRight(){this.$router.push({name:'NewShipping',params:{shippingId:0}})},
        getList() {
          var _vue=this
          this.service.get("/shipping/list.do")
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data.orderItemVoList)*/
              _vue.shippingList=response.data.data.list
            })
            .catch(function (error) {
              console.log(error)
            })
        },
      }
    }
</script>

<style scoped>

</style>
