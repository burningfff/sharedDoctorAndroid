// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '../static/js/validate.js'

// import VeeValidate from 'vee-validate';
// import zh_CN from 'vee-validate/dist/locale/zh_CN'
// import VueI18n from 'vue-i18n';
// Vue.use(VueI18n)
// const i18n = new VueI18n({
//   locale: 'zh_CN',
// })
// Vue.use(VeeValidate, {
//   i18n,
//   i18nRootKey: 'validation',
//   dictionary: {
//     zh_CN
//   }
// });

Vue.config.productionTip = false
Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
