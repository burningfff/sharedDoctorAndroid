import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  isLogin: 0,
  userName: "",
  identity: '',
}

const mutations = {
  changeLogin(state,value){
    state.isLogin = value;
  },
  setUserName(state,value){
    state.userName=value;
  },
  setIdentity(state,value){
    state.identity=value;
  },

}

const actions = {
  loginAction({commit}){
    commit('changeLogin',1);
  },
  SETUSERNAME({commit},value){
    commit('setUserName',value);
  },
  SETIDENTITY({commit},value){
    commit('setIdentity',value);
  },


}

const getter = {
  getLoginStatus(state){
    return state.isLogin;
  },
  getUserName(state){
    return state.userName;
  },
  getIdentity(state){
    return state.identity;
  },
}

export default new Vuex.Store({
  state,
  actions,
  getter,
  mutations
})
