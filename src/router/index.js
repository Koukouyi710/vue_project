import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/views/index/login'
import Regist from '@/views/index/regist'
import ForgetPassword from "@/views/index/forgetPassword"
import ResetPassword from "@/views/index/resetPassword"
import Cart from '@/views/Cart/Cart'
import My from '@/views/My/My'
import MyInfo from '@/views/My/MyInfo'
import UpdatePassword from '@/views/My/UpdatePassword'
import Myorder from '@/views/Order/Myorder'
import OrderDetail from '@/views/Order/OrderDetail'
import ProductItem from "@/views/Product/productItem"
import ToPay from '@/views/Pay/ToPay'
import CheckOrder from '@/views/Pay/CheckOrder'
import ShippingList from '@/views/Shipping/ShippingList'
import NewShipping from '@/views/Shipping/NewShipping'
import ProductList from '@/views/Category/ProductList'
import SearchList from '@/views/Category/SearchList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',//主页
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',//用户登录
      name: 'Login',
      component: Login,
    },
    {
      path: '/regist',//用户注册
      name: 'Regist',
      component: Regist,
    },
    {
      path: '/forgetPassword',//忘记密码
      name: 'ForgetPassword',
      component: ForgetPassword,
    },
    {
      path: '/resetPassword/:username/:forgetToken',//重置密码
      name: 'ResetPassword',
      component: ResetPassword,
    },
    {
      path: '/cart',//购物车
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/my',//个人中心
      name: 'My',
      component: My,
    },
    {
      path: '/myinfo',//个人信息
      name: 'MyInfo',
      component: MyInfo,
    },
    {
      path: '/updatepassword',//修改密码
      name: 'UpdatePassword',
      component: UpdatePassword,
    },
    {
      path: '/myorder/:act',//我的订单
      name: 'Myorder',
      component: Myorder,
    },
    {
      path: '/orderDetail/:active/:orderNo',//订单详情
      name: 'OrderDetail',
      component: OrderDetail,
    },
    {
      path: '/productItem/:productNo',//商品详情
      name: 'ProductItem',
      component: ProductItem,
    },
    {
      path: '/topay/:orderNo',//支付
      name: 'ToPay',
      component: ToPay,
    },
    {
      path: '/checkOrder/:shippingId',//创建订单
      name: 'CheckOrder',
      component: CheckOrder,
    },
    {
      path: '/shippingList/:shippingId',//地址
      name: 'ShippingList',
      component: ShippingList,
    },
    {
      path: '/newShipping/:shippingId',//添加/更新地址
      name: 'NewShipping',
      component: NewShipping,
    },
    {
      path: '/productList/:categoryId',//商品列表
      name: 'ProductList',
      component: ProductList,
    },
    {
      path: '/searchList/:keyword',//商品列表
      name: 'SearchList',
      component: SearchList,
    },

  ]
})
