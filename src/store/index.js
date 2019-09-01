import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

//Vue全局注册
Vue.use(Vuex)

const state={
  userInfo:{
  }
}

export const store=new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
