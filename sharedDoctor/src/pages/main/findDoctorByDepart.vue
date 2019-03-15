<template>
  <div>
    <van-nav-bar
      fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        {{this.departName}}
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px">
      <van-field
        v-model="value"
        placeholder="疾病、医院、科室、医生名"
        center
        border
        left-icon="search"
        style="border:1px solid #e8e8e8;border-radius: 6px;background-color:#f0f2f5;margin-top: 10px;margin-bottom: 10px"
        @click="onClickSearchBtn"
      />
      <div style="width: 100%">
        <van-row style="height: 10px;background-color: #f0f2f5"></van-row>
      </div>
      <van-collapse v-model="activeName" accordion style="margin-bottom: 5px">
        <!--<van-row>-->
        <van-row>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="1">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="2">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="3">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="4">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
        </van-row>
      </van-collapse>
      <div class="doctor">

      </div>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {
      // let _footer = this.$store.state.footerVisible;
      // if (!_footer) {
      //   this.$store.commit('TOGGLE_FOOTER');
      // }
      // this.$store.commit('SELECT_TAB', 0)
    },
    data() {
      return {
        activeName: '1',
        userName: '',
        password: '',
        departName:'',
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
      onClickLeft() {
        this.$toast('返回');
        this.$router.push('/findDoctor')
      },
      onClickSearchBtn() {
        this.$router.push('/search');
      },
    },
  };
</script>

<style>

</style>
