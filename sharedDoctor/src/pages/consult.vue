<template>
  <div style="margin-top:20px;margin-bottom:20px;margin-left: 6%;width: 88%">
    <div class="header">
      <van-row>
        <van-col>
          <span style="font-size: 24px;">咨询医生</span>
        </van-col>
      </van-row>
    </div>
    <div class="content" style="margin-top: 20px">
      <div style="border:1px solid rgba(205,205,205,0.46);box-shadow: 1px 1px  1px  #a6a6a6;border-radius: 3px"
           @click="go('/reserveDoctor')">
        <van-row style="height: 40px; padding: 15px 0px">
          <van-col span="4" style="height: 40px;">
            <van-icon style="width: 100%;height: 100%;font-size: 40px;color: #4B946A" name="service-o"/>
          </van-col>
          <van-col offset="1" span="17" style="text-align: left">
            <van-row style="font-size: 16px;font-weight: bolder">
              图文咨询
            </van-row>
            <van-row style="font-size: 10px;margin-top: 5px;">
              快速匹配医生
            </van-row>
          </van-col>
          <van-col span="2">
            <van-icon style="width: 100%;height: 100%;align-content: center;margin-top: 12px" name="arrow"/>
          </van-col>
        </van-row>
      </div>
      <div
        style="border:1px solid rgba(205,205,205,0.46);box-shadow: 1px 1px  1px  #a6a6a6;border-radius: 3px;margin-top: 10px;"
        @click="go('/reserveDoctor')">
        <van-row style="height: 40px; padding: 15px 0px">
          <van-col span="4" style="height: 40px;">
            <van-icon style="width: 100%;height: 100%;font-size: 40px;color: #4B946A" name="service-o"/>
          </van-col>
          <van-col offset="1" span="17" style="text-align: left">
            <van-row style="font-size: 16px;font-weight: bolder">
              医生上门
            </van-row>
            <van-row style="font-size: 10px;margin-top: 5px;">
              预约医生上门诊治
            </van-row>
          </van-col>
          <van-col span="2">
            <van-icon style="width: 100%;height: 100%;align-content: center;margin-top: 12px" name="arrow"/>
          </van-col>
        </van-row>
      </div>
      <div
        style="border:1px solid rgba(205,205,205,0.46);box-shadow: 1px 1px  1px  #a6a6a6;border-radius: 3px;margin-top: 10px;"
        @click="go('/findDoctor')">
        <van-row style="height: 40px; padding: 15px 0px">
          <van-col span="4" style="height: 40px;">
            <van-icon style="width: 100%;height: 100%;font-size: 40px;color: #4B946A" name="service-o"/>
          </van-col>
          <van-col offset="1" span="17" style="text-align: left">
            <van-row style="font-size: 16px;font-weight: bolder">
              找医生
            </van-row>
            <van-row style="font-size: 10px;margin-top: 5px;">
              按科室挑选合适的医生
            </van-row>
          </van-col>
          <van-col span="2">
            <van-icon style="width: 100%;height: 100%;align-content: center;margin-top: 12px" name="arrow"/>
          </van-col>
        </van-row>
      </div>
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
        show4: false,
        show5: false,
        images: [
          'http://img4.imgtn.bdimg.com/it/u=394763596,12413412&fm=26&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=3424320861,24527564&fm=214&gp=0.jpg',
          'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',
          'http://i1.hdslb.com/bfs/archive/c3bbfc93516c974a08b01bab6ed5c81305af4ff6.jpg',
        ],
        value: '',
      };
    },
    methods: {
      go(index) {
        this.$router.push(index);
      },
      onClickRight() {
        this.$toast.success('按钮');
        this.$router.push('/HelloWorld')
      },
      onChange(index) {
        this.$toast('当前 Swipe 索引：' + index);
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
