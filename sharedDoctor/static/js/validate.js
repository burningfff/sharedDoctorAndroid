import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
  // silentTranslationWarn: true
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱',
        phone: () => '请输入正确的手机号',
        confirmed: ()=>'两次输入不一致',
        required: ( field )=> "请输入" + field,
        max: (field, [length]) => ` ${field}不能大于${length}字符.`,
        min: (field, [length]) => ` ${field}不能少于${length}字符.`,
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        userName: '账号',
        name: '姓名',
        phone: '手机号',
        checkPassword:'确认密码'
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



