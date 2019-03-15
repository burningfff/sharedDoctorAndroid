<template>
  <div>
    <van-nav-bar
      title="标题"
      right-text="按钮"
      fixed
      @click-right="onClickRight"
    >
    </van-nav-bar>
    <div class="content" style="margin-top: 46px;height: 200px">
      <van-field
        v-model="value"
        placeholder="搜索"
        border
        left-icon="search"
        @click="onClickSearchBtn"
      />
    </div>
  </div>
</template>
<script>
  export default {
    components: {

    },
    created(){
    },
    data() {
      return {
        images: [
          'http://img4.imgtn.bdimg.com/it/u=394763596,12413412&fm=26&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=3424320861,24527564&fm=214&gp=0.jpg',
          'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',
          'http://i1.hdslb.com/bfs/archive/c3bbfc93516c974a08b01bab6ed5c81305af4ff6.jpg',
        ],
        value:'',
      };
    },
    methods: {
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
  img{
    width: auto;
    height:auto;
    max-height: 100%;
    max-width: 100%;}
</style>
