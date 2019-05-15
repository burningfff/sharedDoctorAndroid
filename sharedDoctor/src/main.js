// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import storage from './vuex/store'
import Vant from 'vant';
import 'vant/lib/index.css';
import '../static/js/validate.js';
import $ from '../build/jquery-vendor';
import store from './store/index.js'//引入
import echarts from 'echarts'
// import { Lazyload } from 'vant';
import VDistpicker from 'v-distpicker'
// import Mint from 'mint-ui';
// Vue.use(Mint);


import websdk from 'easemob-websdk'
let webIM = window.WebIM = websdk
Vue.prototype.$WebIM = webIM
const conn = new webIM.connection({
  isMultiLoginSessions: webIM.config.isMultiLoginSessions,
  https: typeof webIM.config.https === 'boolean' ? webIM.config.https : location.protocol === 'https:',
  url: webIM.config.xmppURL,
  isAutoLogin: true,
  heartBeatWait: webIM.config.heartBeatWait,
  autoReconnectNumMax: webIM.config.autoReconnectNumMax,
  autoReconnectInterval: webIM.config.autoReconnectInterval,
  apiUrl: webIM.config.apiURL
})
const options = {
  apiUrl: WebIM.config.apiURL,
  user: 'a00001',
  pwd: 'a00001',
  appKey: WebIM.config.appkey,
  success:function (re) {
    console.log('链接服务器正常')
  },
  error:function (err) {
    alert(err)
  }
}
Vue.prototype.$imconn = conn
Vue.prototype.$imoption = options


require("./common/locwin");
// options 为可选参数，无则不传
// Vue.use(Lazyload, options);
Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false
Vue.use(Vant);
Vue.component('v-distpicker', VDistpicker)
/* eslint-disable no-new */

// document.addEventListener('deviceready',function () {
  new Vue({
    el: '#app',
    router,
    store,
    storage,
    components: { App },
    template: '<App/>'
  })
// },false);

