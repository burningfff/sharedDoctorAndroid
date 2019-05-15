<template>
  <div>
    <van-nav-bar
      title="聊天"
      left-text="返回"
      left-arrow
      right-text="注册"
      fixed
      @click-left="goBack"
      @click-right="register"
    />
    <div style="margin-top: 46px">
      <div class="talk_show" id="words">
        <div class="atalk"><span id="asay"><b>{{toUserName}}：</b>吃饭了吗？</span></div>
        <div class="btalk"><span id="bsay"><b>您说：</b>还没呢，你呢？</span></div>
      </div>
      <div class="talk_input">
        <van-field v-model="message" style="height:54px; width:70%; float:left;" type="textarea" placeholder="请输入聊天内容"></van-field>
        <van-button style="height:54px;width:26%;  float:right;" @click="sendMessage">发送</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  import {ImagePreview} from 'vant';

  var allService = new AllService()

  export default {
    created() {
      // this.$imconn = conn;
      // this.$imoption = options;
      this.loginWebIM();
    },
    data() {
      return {
        userName: LOCWIN.Cache.get('userName'),
        password: LOCWIN.Cache.get('userName'),
        toUserName:'a00001',
        message:'',
      };
    },

    methods: {
      loginWebIM () {
        // 这儿是测试用的账号和密码，这个账号密码是通过环信后台生成的
        this.$imoption.user = 'a00001';
        this.$imoption.pwd = 'a00001';

        this.$imconn.open(this.$imoption);
        let _this = this;
        this.$imconn.listen({
          onOpened: function (message) {
            console.log('用户已上线')
          },
          onClosed: function (message) {
            console.log('用户已下线')
          },
          onEmojiMessage: function (message) {
            console.log('这儿接收到了表情')
          },
          onPictureMessage: function (message) {
            console.log('这儿接收到了图片')
          },
          onTextMessage: function (message) {
            // 每次接收信息都会在这儿监听到
            console.log('这儿接收到了文本信息');
            console.log(message)
          },
          onPresence: function ( message ) {
            // 加入聊调室后，这儿会被执行
            console.log('这儿是监听聊天室')
            _this.handlePresence(message)
          }
        })
      },
      sendMessage(){
        if(this.message==''){
          this.$toast('请填写聊天内容!');
        }
        let id = this.$imconn.getUniqueId();                 // 生成本地消息id
        let msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
          msg: this.message,                  // 消息内容
          to: this.toUserName,                          // 接收消息对象（用户id）
          roomType: false,
          success: function (id, serverMsgId) {
            console.log('send private text Success');
            var Words = document.getElementById("words");
            var str = '<div class="btalk"><span><b>您说：</b>' + this.sendtext +'</span></div>';
            Words.innerHTML = Words.innerHTML + str;
            // LOCWIN.Cache.set('billCode',Words.innerHTML)
            this.sendtext = '';
          },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
          fail: function(e){
            console.log("Send private text error");
          }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        });
        this.$imconn.send(msg.body);
      },
      goBack() {
        // this.$toast('返回');
        this.$router.go(-1);
      },
      register(){
        this.$router.push('/register');
      },
    },
  };
</script>

<style>

</style>

<style>
  .talk_title{ font-size: 16px; line-height: 40px; font-weight: normal;}
  .talk_con {width:100%;height:500px; background:#f9f9f9;}
  .talk_show {width:100%;height:420px;border:1px solid #EEEFEE;background:#fff; overflow:auto;}
  .talk_input {width:100%;margin:10px auto 0;}
  .whotalk {width:80px;height:30px;float:left;outline:none;}
  .talk_word {height:26px;padding:0px;float:left;margin-left:10px;outline:none;text-indent:10px;}
  .talk_sub {width:56px;height:30px; margin-left:10px;}
  .atalk {margin:10px; }
  .atalk span {display:inline-block;background:#E6A23C; font-size:12px;border-radius:10px;color:#fff;padding:5px 10px;}
  .btalk {margin:10px;text-align:right;  }
  .btalk span {display:inline-block;background:#409EFF; font-size:12px;border-radius:10px;color:#fff;padding:5px 10px;}
</style>
