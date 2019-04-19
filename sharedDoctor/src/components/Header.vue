<template>
  <div id="header">
    <van-row style="margin-top: 10px;margin-bottom: 10px">
      <van-col offset="1" span="22">
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
