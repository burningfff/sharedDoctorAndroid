// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '../static/js/validate.js';
import $ from '../build/jquery-vendor';
import store from './store/index.js'//引入
import echarts from 'echarts'
// import { Lazyload } from 'vant';

// options 为可选参数，无则不传
// Vue.use(Lazyload, options);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
