<template>
    <div>
      <!--  :column-num="5"   可以设置列数-->
        <van-grid :border="false">
          <van-grid-item
            v-for="(item,index) of categoryList"
            :key="index"
            icon="point-gift-o"
            :text="item.name"
            :to="{name:'ProductList',params:{categoryId:item.id}}"
          />
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "HomeCategory",
      data(){
          return{
            categoryList:[],
            count:0
          }
      },
      mounted(){
        this.getCategroys()
      },
      methods:{
        getCategroys:function () {
          var _vue=this
          this.service.get("/manage/category/get_category_count.do",{
            params:{
              parentId:0
            }
          })
            .then(function (response) {
              /*console.log(response)
              console.log(response.status)
              console.log(response.data.status)
              console.log(response.data.data)*/
              _vue.categoryList=response.data.data
              _vue.count=response.data.data.length
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
