<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        设置
      </span>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;height: 44px">

      <van-cell-group>
        <van-cell to="index" >
          <span
            slot="title"
            style="display:inline-block;vertical-align:middle;line-height: 16vw;font-size: 14px">
              头像
            </span>
          <div style="height: 48px">
            <img style="height: 48px;width:48px;border-radius: 100%;"
                 :src="image"/>
          </div>
          <van-icon
            slot="right-icon"
            style="display:inline-block;vertical-align:middle;line-height: 16vw;font-size: 14px;color: #969799"
            name="arrow">
          </van-icon>

        </van-cell>
        <van-cell title="姓名" is-link :value="patientName" to="index"/>
        <van-cell title="手机号码" is-link value="phone" to="index"/>
        <van-cell title="邮箱账号" is-link value="email" to="index"/>
        <van-cell title="我的地址" is-link value="location" to="index"/>

      </van-cell-group>

    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {
      this.getPatientInfo()
    },

    data() {
      return {
        patientName: '',
        phone: '1',
        email: '',
        location: '',
        image: 'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',
      };
    },
    methods: {
      getPatientInfo() {
        if (LOCWIN.Cache.get('userInfo') != null) {
          this.patientName = LOCWIN.Cache.get('userInfo').patientName
          this.phone = LOCWIN.Cache.get('userInfo').phone
          this.email = LOCWIN.Cache.get('userInfo').email
          this.location = LOCWIN.Cache.get('userInfo').location
        }
      },
      onClickLeft() {
        this.$toast('返回');
        this.$router.go(-1)
      },
      saveInfo() {
        var params = {
          patientId: LOCWIN.Cache.get('userInfo').patientId,
          patientName: this.patientName,
          email: this.email,
          phone: this.phone,
          location: this.location,
        }
        allService.updatePatientBasicData(params, (isOk, data) => {
          if (isOk) {
            var params = {
              patientId: LOCWIN.Cache.get('userInfo').patientId,

            }
            allService.getPatientDetailById(params, (isOk, data) => {
              if (isOk) {
                LOCWIN.Cache.set('userInfo', data.data)
                this.getPatientInfo()
              }
            })
          }
        })

        // this.$router.go(-1)
      },
    },
  };
</script>

<style>

</style>
