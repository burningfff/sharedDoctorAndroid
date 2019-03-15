<template>
  <div>
    <van-nav-bar
      fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        问医生
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
      <div class="depart">
        <van-row style="margin-top: 5px;margin-bottom: 5px">
          <van-col span="23">
            <span style="float: left;font-size: 18px;color: #7d7e80">常见科室</span>
          </van-col>
        </van-row>
        <van-row style="margin-top: 5px;margin-bottom: 5px;height: 60px;">
          <van-col style="width: 32%;background-color: #f0f2f5">
            <div style="text-align: center"  @click="login">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/bone.png"/>
              </van-row>
              <van-row>
                <span>骨科</span>
              </van-row>
            </div>
          </van-col>
          <van-col style="margin-left:2%;margin-right: 2%;width: 32%;background-color: #f0f2f5">
            <div style="text-align: center">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/digestive.png"/>
              </van-row>
              <van-row>
                <span>消化内科</span>
              </van-row>
            </div>
          </van-col>
          <van-col style="width: 32%;background-color: #f0f2f5">
            <div style="text-align: center">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/ENT.png"/>
              </van-row>
              <van-row>
                <span>眼耳鼻喉科</span>
              </van-row>
            </div>
          </van-col>
        </van-row>
        <van-row style="height:2%;background-color: #FFFFFF">
        </van-row>
        <van-row style="margin-top: 5px;margin-bottom: 5px;height: 60px;">
          <van-col style="width: 32%;background-color: #f0f2f5">
            <div style="text-align: center">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/heart.png"/>
              </van-row>
              <van-row>
                <span>心血管内科</span>
              </van-row>
            </div>
          </van-col>
          <van-col style="margin-left:2%;margin-right: 2%;width: 32%;background-color: #f0f2f5">
            <div style="text-align: center">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/pediatrics.png"/>
              </van-row>
              <van-row>
                <span>儿科</span>
            </van-row>
            </div>
          </van-col>

          <van-col style="width: 32%;background-color: #f0f2f5">
            <div style="text-align: center">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/tooth.png"/>
              </van-row>
              <van-row>
                <span>牙科</span>
              </van-row>
            </div>
          </van-col>
        </van-row>
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
      onClickLeft() {
        this.$toast('返回');
        this.$router.push('/main')
      },
      onClickSearchBtn() {
        this.$router.push('/search');
      },
    },
  };
</script>

<style>

</style>
