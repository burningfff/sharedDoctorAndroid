<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        报告解读
      </span>
    </van-nav-bar>
    <div class="content" style="margin-top: 46px">
      <div>
        <img style="width: 100%;" src="../../assets/report.png">
      </div>
      <div class="depart">
        <van-row>
          <div style="text-align: left" @click="findDoctorByDepart(30,'骨科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/bone.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                骨科报告
              </span>
            </van-col>
          </div>
          <div style="text-align: left" @click="findDoctorByDepart(12,'产科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/digestive.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                产科报告
              </span>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div style="text-align: left" @click="findDoctorByDepart(10,'妇科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/ENT.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                妇科报告
              </span>
            </van-col>
          </div>
          <div style="text-align: left" @click="findDoctorByDepart(20,'口腔科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/tooth.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                口腔科报告
              </span>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div style="text-align: left" @click="findDoctorByDepart(13,'男科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/heart.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                男科报告
              </span>
            </van-col>
          </div>
          <div style="text-align: left" @click="findDoctorByDepart(11,'儿科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/pediatrics.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                儿科报告
              </span>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div style="text-align: left" @click="findDoctorByDepart(14,'皮肤科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/heart.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                皮肤科报告
              </span>
            </van-col>
          </div>
          <div style="text-align: left" @click="findDoctorByDepart(18,'眼科')">
            <van-col
              span="4"
              style="border:1px solid rgba(205,205,205,0.46);
              border-top: white;
              border-left: white;
              border-right: white;
              height:16vw;">
              <img
                style="width: 16vw;margin-left: 3vw"
                src="../../assets/pediatrics.png"/>
            </van-col>
            <van-col
              span="8"
              style="height:16vw;
              border:1px solid rgba(205,205,205,0.46);border-top: white;border-left: white">
              <span
                style="display:inline-block;vertical-align:middle;line-height: 16vw;margin-left: 3vw">
                眼科报告
              </span>
            </van-col>
          </div>
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

    },
    data() {
      return {
        userName: '',
        password: '',
        departId: '',
        departName: ''
      };
    },
    methods: {
      findDoctorByDepart(departId, departName) {
        // this.$toast.success("登录成功！")
        LOCWIN.Cache.set('departId', departId);
        LOCWIN.Cache.set('departName', departName);
        this.$router.push('/findDoctorByDepart')
      },
      go(index) {
        this.$router.push(index);
      },
      onClickLeft() {
        this.$router.go(-1);
      },
    },
  };
</script>

<style>

</style>
