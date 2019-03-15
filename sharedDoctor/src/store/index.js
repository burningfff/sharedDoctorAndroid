import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    footerVisible: true,
    selectedTab: 0,
    // chartType:'客户分类结构'
  },
  mutations: {
    // [types.SET_CHART_TYPE](state, param){
    //   state.chartType = param
    // },
    [types.SELECT_FOOTER_TAB] (state, tabName) {
      console.log("tabName"+tabName)
      if (tabName>=0) {
        state.selectedTab = tabName
        console.log("footerVisible true")
        state.footerVisible = true
      } else {
        console.log("footerVisible false")
        state.footerVisible = false
      }
    }
  }
});
export default store
