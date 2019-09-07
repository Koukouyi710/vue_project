// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Home from '@/components/Home'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.css'
import './assets/css/border.css'
import fastClick from 'fastClick'
import Vant from 'vant';
import 'vant/lib/index.css';
import {store} from './store/index'
import AreaList from './assets/js/Area.js'

Vue.use(Vant);
import { Search } from 'vant';

Vue.use(Search);

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
Vue.use(MintUI);
Vue.prototype.$AreaList = AreaList


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,Home},
  template: '<App/>',
})
