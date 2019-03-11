<template>
  <div>
    <van-cell-group>
      <!--<van-field-->
        <!--v-model="username"-->
        <!--clearable-->
        <!--label="用户名"-->
        <!--placeholder="请输入用户名"-->
        <!--:error-message="errorMessage.userInput"-->
      <!--/>-->
      <!--<van-field-->
        <!--v-model="password"-->
        <!--type="password"-->
        <!--label="密码"-->
        <!--placeholder="请输入密码"-->
        <!--required-->
        <!--:error-message="errorMessage.pwdInput"-->
      <!--/>-->
      <van-field
        name="phone"
        v-model="phone"
        v-validate="'required|phone'"

        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error="errors.has('phone')"
        :error-message="errors.first('phone')"
      />
      <van-field

        v-model="email"
        v-validate="'required|email'"
        name="email"
        clearable
        label="邮箱"
        placeholder="请输入邮箱"
        :error="errors.has('email')"
        :error-message="errors.first('email')"
      />
    </van-cell-group>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  var allService = new AllService()

  export default {
    data() {
      return {
        username: '',
        password: '',
        phone:'',
        email:'',
        errorMessage: {
          userInput: 'ssss',
          pwdInput: '',
          phoneInput: ''
        },
      };
    },
    methods: {
      // sendcode() {
      //   var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      //   if (this.phone == '') {
      //     this.$toast("手机号不能为空");
      //   } else if (!reg.test(this.phone)) {
      //     this.$toast("手机号格式不正确");
      //   }
      // },
    },
  };
</script>

<style lang="less">
  .goods {
    padding-bottom: 50px;
  &-swipe {
  img {
    width: 100%;
    display: block;
  }
  }
  &-title {
     font-size: 16px;
   }
  &-price {
     color: #f44;
   }
  &-express {
     color: #999;
     font-size: 12px;
     padding: 5px 15px;
   }
  &-cell-group {
     margin: 15px 0;
  .van-cell__value {
    color: #999;
  }
  }
  &-tag {
     margin-left: 5px;
   }
  }
</style>
