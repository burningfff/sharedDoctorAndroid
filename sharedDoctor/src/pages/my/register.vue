<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      right-text="登录"
      fixed
      @click-left="goBack"
      @click-right="login"
    />
    <div>
      <van-cell-group style="margin-top: 46px">
        <van-field
          name="userName"
          v-model="userName"
          v-validate="'required|min:6|max:16'"
          clearable
          label="用户名"
          placeholder="请输入用户名"
          :error="errors.has('userName')"
          :error-message="errors.first('userName')"
        />
        <van-field
          name="password"
          v-model="password"
          ref="password"
          v-validate="'required|min:6|max:16'"
          clearable
          label="密码"
          type="password"
          placeholder="请输入密码"
          :error="errors.has('password')"
          :error-message="errors.first('password')"
        />
        <van-field
          name="checkPassword"
          v-model="checkPassword"
          v-validate="'required|min:6|max:16|confirmed:password'"
          clearable
          label="确认密码"
          type="password"
          placeholder="请再次输入密码"
          :error="errors.has('checkPassword')"
          :error-message="errors.first('checkPassword')"
        />
        <van-radio-group v-model="identity">
          <van-row style="width: 100%;
                   display: -webkit-box;
                   display: -ms-flexbox;
                   display: flex;
                   padding: 10px 15px;
                   -webkit-box-sizing: border-box;
                   box-sizing: border-box;
                   line-height: 24px;
                   position: relative;
                   background-color: #fff;
                   color: #323233;
                   font-size: 14px;
                   overflow: hidden;">
            <van-col span="6">用户身份</van-col>
            <van-col span="6">
              <van-radio name="0">患者</van-radio>
            </van-col>
            <van-col span="10">
              <van-radio name="1">医护人员</van-radio>
            </van-col>
          </van-row>
        </van-radio-group>
      </van-cell-group>
      <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;width: 90%"
                  @click="register">
        注册
      </van-button>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {

    },
    data() {
      return {
        userName: '',
        password: '',
        checkPassword: '',
        identity: '0',
      };
    },
    methods: {
      login() {
        this.$router.push('/login')
      },
      goBack() {
        this.$router.go(-1);
      },
      register() {
        var params={
          userName:this.userName,
          password:this.password,
          identity:this.identity,
        }
        allService.signUp(params, (isOk, data) => {
          if (isOk) {
            console.log(data.data);
            if (data.status == "false") {
              this.$toast.fail(data.data);
            } else {
              this.$imoption.username = this.userName;
              this.$imoption.password = this.userName;
              this.$imoption.nickname=this.userName;
              this.$imconn.registerUser(this.$imoption)
              this.$toast.success("注册成功！")
              this.$router.push('/login')
            }
          } else {
            this.$toast.fail("注册失败！")
          }
        })
      },
    },
  };
</script>

<style>

</style>
