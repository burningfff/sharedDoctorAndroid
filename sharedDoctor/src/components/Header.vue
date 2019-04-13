<template>
  <div id="header">
    <van-row style="margin-top: 10px;margin-bottom: 10px">
      <van-col offset="1" span="19">
        <van-field
          v-model="value"
          placeholder="搜索"
          center
          border
          left-icon="search"
          style="border:1px solid #e8e8e8;border-radius: 6px;background-color:transparent;"
          @click="onClickSearchBtn"
        />
      </van-col>
      <van-col span="4">
        <van-goods-action-mini-btn
          info="5"
          icon="bullhorn-o"
          @click="onClickInfoBtn"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value:'',
      }
    },
    methods:{
      onClickInfoBtn() {
        this.$toast('点击图标');
      },
      onClickSearchBtn() {
        this.$router.push('/findDoctorByKeyWord');
      },
    },
    computed: {
      isShow: function () {
        return true;
      }
    },
    watch: {

    },
  }
</script>

<style>
</style>
