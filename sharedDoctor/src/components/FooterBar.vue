<template>
  <div id="tab-bar">
    <van-tabbar
      v-model="selected"
      active-color="#07c160"
      v-show="isShow"
      fixed>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">问诊</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        selected: 'main',
      }
    },
    computed: {
      isShow: function () {
        return true;
      }
    },
    watch: {
      'selected': {
        handler(){
          if (this.selected == 0) {
            this.$router.push('/HelloWorld');
          }
          if (this.selected == 1) {
            this.$router.push('/testdemo');
          }
          if (this.selected == 2) {
            this.$router.push('/')
          }
        }
      }
    },
  }
</script>

<style>
</style>
