<template>
  <div>
    <div>
      <van-row style="background-color: #f5efec;">
        <div @click="go('/patientSetting')">
          <van-col span="4" style="margin-top: 20px;margin-bottom: 20px;margin-left: 2vw">
            <img style="width: 100%;height: 100%;border-radius: 100%;"
                 src="../../assets/picture.png"/>
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
    <div>
      <van-cell-group style="text-align: left;">
        <van-cell style="font-size: 18px" title="我的订单" is-link to="index"/>
        <van-row style="height: 4px;background-color: #f9f3f0"></van-row>
        <van-cell style="font-size: 18px" title="资质信息" is-link to="patientInfo"/>
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
        userName: LOCWIN.Cache.get('userInfo').doctorName,
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
          this.$router.push('/my');
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
