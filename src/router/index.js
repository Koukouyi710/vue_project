import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/views/index/login'
import Cart from '@/views/Cart/Cart'
import My from '@/views/My/My'
import MyInfo from '@/views/My/MyInfo'
import UpdatePassword from '@/views/My/UpdatePassword'

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
      path: '/updatepassword',//修改用户名
      name: 'UpdatePassword',
      component: UpdatePassword,
    }
  ]
})
