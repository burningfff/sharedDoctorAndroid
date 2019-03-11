import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱',
        phone: () => '请输入正确的手机号',
        required: ( field )=> "请输入" + field

      },
      attributes:{
        email:'邮箱',
        password:'密码',
        name: '账号',
        phone: '手机号'
      }
    }
  }
});

Validator.extend('phone', {
  messages: {
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
