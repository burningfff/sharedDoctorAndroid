<template>
  <div>
    <van-cell-group>
      <van-field
        name="name"
        v-model="userName"
        v-validate="'required|min:6|max:16'"
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error="errors.has('name')"
        :error-message="errors.first('name')"
      />
      <van-field
        name="password"
        v-model="password"
        v-validate="'required|min:6|max:16'"
        clearable
        label="密码"
        type="password"
        placeholder="请输入密码"
        :error="errors.has('password')"
        :error-message="errors.first('password')"
      />
    </van-cell-group>

    <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;width: 90%" @click=login>
      登录
    </van-button>

  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  var allService = new AllService()

  export default {
    data() {
      return {
        userName: '',
        password: '',
      };
    },
    methods: {
      login() {
        this.$toast.success("登录成功！")
        this.$router.push('/testdemo')
        // var params = {
        //   userName: this.userName,
        //   password: this.password
        // }
        // allService.signIn(params, (isOk, data) => {
        //   if (isOk) {
        //     if (data.status == "false") {
        //       console.log(data.data);
        //       this.$toast.fail(data.data);
        //     } else {
        //       console.log(data.data);
        //       // LOCWIN.Cache.set("userName", params.userName);
        //       // LOCWIN.Cache.set("userInfo", data.data);
        //       // LOCWIN.Cache.set("userPass", params.password);
        //       if (data.data === 'root') {
        //         this.$toast.success("登录成功！")
        //         // this.$router.push('/SU/index');
        //       }
        //       if ("patientId" in data.data) {
        //         this.$toast.success("登录成功！")
        //         this.$router.push('/testdemo')
        //         // this.$router.push('/student/index');
        //       }
        //       if ("doctorId" in data.data) {
        //         this.$toast.success("登录成功！")
        //         // this.$router.push('/teacher/index');
        //       }
        //       this.$toast.success("登录成功！");
        //     }
        //   } else {
        //     this.$toast.fail("登录失败！")
        //   }
        // })
      },
    },
  };
</script>

<style>

</style>
