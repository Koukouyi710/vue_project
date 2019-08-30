// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Home from '@/components/Home'
import axios from 'axios'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Tabbar, TabItem } from 'mint-ui';
import { Button } from 'mint-ui';
import './assets/css/reset.css'
import './assets/css/border.css'
import fastClick from 'fastClick'

var service=axios.create({
  baseURL:"http://localhost:8888",
  withCredentials:true,//允许携带cookie
  //请求预处理
  transformRequest:[
    data => {
      let params = ''
      for(var index in data){
        params += index + '=' + data[index] + '&'
      }
      return params
    }
  ]
})
fastClick.attach(document.body)
Vue.config.productionTip = false;
Vue.prototype.service = service;
Vue.use(Vuex);
Vue.use(MintUI);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Button.name, Button);
import { Search } from 'mint-ui';
import { Switch } from 'mint-ui';

Vue.component(Switch.name, Switch);

Vue.component(Search.name, Search);

var userStore = new Vuex.Store({
  state:{
    username:"",
    password:""
  },
  mutations: {

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App,Home},
  template: '<App/>',
})
