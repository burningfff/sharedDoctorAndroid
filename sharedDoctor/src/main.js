// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
import Mint from 'mint-ui';
Vue.use(Mint);

require("./common/locwin");

// options 为可选参数，无则不传
// Vue.use(Lazyload, options);
Vue.prototype.$echarts = echarts
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

