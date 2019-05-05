<template>
  <div>
    <div
      v-if="userName==null">
      <!--v-show="showUnSignIn"-->
      <van-row style="background-color: #f5efec;">
        <div @click="go('/login')">
          <van-col span="4" style="margin-top: 20px;margin-bottom: 20px;margin-left: 2vw">
            <img style="width: 100%;height: 100%;border-radius: 100%;"
                 src="../assets/picture.png"/>
          </van-col>
          <van-col span="8" style="height:16vw;margin-top: 20px;margin-bottom: 20px;">
            <span
              style="display:inline-block;vertical-align:middle;line-height: 16vw;font-weight: bolder;font-size: 20px">
              注册/登录
            </span>
          </van-col>
        </div>
      </van-row>
    </div>
    <div v-else>
      <van-row style="background-color: #f5efec;">
        <div @click="go('/patientSetting')">
          <van-col span="4" style="margin-top: 20px;margin-bottom: 20px;margin-left: 2vw">
            <img style="width: 100%;height: 100%;border-radius: 100%;"
                 src="../assets/picture.png"/>
          </van-col>
          <van-col span="8" style="height:16vw;margin-top: 20px;margin-bottom: 20px;">
            <span
              style="display:inline-block;vertical-align:middle;line-height: 16vw;font-weight: bolder;font-size: 20px">
              {{this.userName}}
            </span>
          </van-col>
        </div>
      </van-row>
    </div>
    <div v-if="userName!=null">
      <van-cell-group style="text-align: left;">
        <van-cell style="font-size: 18px" title="我的问诊" is-link to="patientOrder"/>
        <van-row style="height: 4px;background-color: #f9f3f0"></van-row>
        <van-cell style="font-size: 18px" title="患者信息" is-link to="patientInfo"/>
        <van-row style="height: 4px;background-color: #f9f3f0"></van-row>
        <van-cell style="font-size: 18px" title="设置" is-link to="patientSetting"/>
      </van-cell-group>

      <van-button
        style="margin-top:25px;border-radius: 6px;width: 90%;font-size: 18px"
        type="danger"
        @click="quit">
        退出登录
      </van-button>
    </div>
    <div v-else>
      <van-cell-group style="text-align: left;">
        <van-cell style="font-size: 18px" title="我的问诊" is-link @click="isLogin"/>
        <van-row style="height: 4px;background-color: #f9f3f0"></van-row>
        <van-cell style="font-size: 18px" title="患者信息" is-link @click="isLogin"/>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    created() {

    },
    data() {
      return {
        // showUnSignIn: true,
        userName: LOCWIN.Cache.get('userInfo').patientName,
        userInfo: LOCWIN.Cache.get('userInfo'),

      };
    },
    methods: {
      go(index) {
        this.$router.push(index);
      },
      quit() {
        this.$dialog.confirm({
          title: '退出登录',
          message: '你确定要退出账号吗？'
        }).then(() => {
          // on confirm
          LOCWIN.Cache.remove("userName");
          LOCWIN.Cache.remove("userInfo");
          LOCWIN.Cache.remove("userPass");
          this.userName = null;
        }).catch(() => {
          // on cancel
        });
      },
      isLogin() {
        this.$dialog.confirm({
          title: '需要登录',
          message: '登陆后才可以进行后续操作？',
          confirmButtonText: '登录',
        }).then(() => {
          // on confirm
          this.$router.push('/login')
        }).catch(() => {
          // on cancel
        });
      },
    }
  };
</script>

<style>
  img {
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
  }
</style>
