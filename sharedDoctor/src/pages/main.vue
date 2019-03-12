<template>
  <div>
    <header-bar class="header-bar"></header-bar>
    <div class="content" style="margin-left: 2%;width: 96%">
      <van-row>
        <van-col  span="5" style="margin-left:2%">
          <div @click="go('/login')" style="text-align: center">
            <img
              style="width: 80%"
              src="../assets/consult.png"/>
            <span>医生咨询</span>
          </div>
        </van-col>
        <van-col  offset="1" span="5" style="">
          <div @click="go('/login')" style="text-align: center">
            <img
              style="width: 80%"
              src="../assets/consult.png"/>
            <span>医生咨询</span>
          </div>
        </van-col>
        <van-col  offset="1" span="5" style="">
          <div @click="go('/login')" style="text-align: center">
            <img
              style="width: 80%"
              src="../assets/consult.png"/>
            <span>医生咨询</span>
          </div>
        </van-col>
        <van-col  offset="1" span="5" style="">
          <div @click="go('/login')" style="text-align: center">
            <img
              style="width: 80%"
              src="../assets/consult.png"/>
            <span>医生咨询</span>
          </div>
        </van-col>
      </van-row>

      <div style="margin-top: 20px;height: 200px">
        <van-swipe :autoplay="3000" @change="onChange">
          <van-swipe-item v-for="image in images" :key="image">
            <img :src="image">
          </van-swipe-item>
        </van-swipe>
      </div>

    </div>
  </div>
</template>
<script>
  import Header from '../components/Header.vue'

  export default {
    components: {
      'header-bar': Header,
    },
    data() {
      return {
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
      go(index){
        this.$router.push(index);
      },
      onClickRight() {
        this.$toast.success('按钮');
        this.$router.push('/')
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
