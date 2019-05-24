<template>
  <div>
    <van-nav-bar
      title="聊天"
      left-text="返回"
      left-arrow
      fixed
      @click-left="goBack"
    />
    <div style="margin-top: 46px">
      <div class="talk_show" id="words">
        <div class="atalk">
          <img style="width: 22px;height: 22px;border-radius: 100%;text-align: left;"
          :src="hisImage"/>
          <span id="asay">吃饭了吗吃饭了吗吃饭了吗吃饭了吗吃饭了吗吃饭了吗吃饭了吗吃饭了吗吃饭了吗吃饭了吗？</span>
        </div>
        <div class="btalk">
          <span id="bsay">还没呢，你呢？</span>
          <img style="width: 22px;height: 22px;border-radius: 100%;text-align: right;"
               :src="myImage"/>
        </div>
      </div>
      <div class="talk_input">
        <van-field v-model="message" style=" width:70%; float:left;" type="textarea"  rows="1" placeholder="请输入聊天内容"></van-field>
        <van-button style="width:26%;float:right;border-radius: 6px" @click="sendMessage" type="primary">发送</van-button>
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
        toUserName:LOCWIN.Cache.get('toUserInfo').user.userName,
        message:'',
        hisImage:LOCWIN.Cache.get('toUserInfo').imageUrl,
        myImage:LOCWIN.Cache.get('userInfo').imageUrl

      };
    },

    methods: {
      loginWebIM () {
        // 这儿是测试用的账号和密码，这个账号密码是通过环信后台生成的
        this.$imoption.user = this.userName;
        this.$imoption.pwd = this.password;

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
            var Words = document.getElementById("words");
            console.log(_this.hisImage)
            let tempImage=_this.hisImage
            var str = '<div class="atalk"><img style="width: 22px;height: 22px;border-radius: 100%;text-align: left;"' +
                           'src="'+tempImage+'"/><span id="asay" style="margin: 5px">' + message.data +'</span></div>';
            Words.innerHTML = Words.innerHTML + str;
            Words.scrollTop=Words.scrollHeight

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
        }else {
          let tempMessage=this.message
          let tempImage=this.myImage
          console.log(tempMessage)
          let id = this.$imconn.getUniqueId();                 // 生成本地消息id
          let msg = new WebIM.message('txt', id);      // 创建文本消息
          msg.set({
            msg: this.message,                  // 消息内容
            to: this.toUserName,                          // 接收消息对象（用户id）
            roomType: false,
            success: function (id, serverMsgId) {
              console.log('send private text Success');
              var Words = document.getElementById("words");
              console.log(tempImage)
              var str = '<div class="btalk"><span id="bsay" style="margin: 5px">' + tempMessage +'</span>' +
                '<img style="width: 22px;height: 22px;border-radius: 100%;text-align: right;" src="'+tempImage+'"/>' +
                '</div>';
              console.log(str)
              Words.innerHTML = Words.innerHTML + str;
              Words.scrollTop=Words.scrollHeight
              var params = {
                chatId: LOCWIN.Cache.get('chatId'),
                chatDetail: this.information,
                chatFrom:LOCWIN.Cache.get('userInfo').user.userId
              }
              allService.addChatDetail(params, (isOk, data) => {
                if (isOk) {
                }
              })
              // LOCWIN.Cache.set('billCode',Words.innerHTML)
            },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function(e){
              console.log("Send private text error");
            }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
          });
          this.message = '';
          this.$imconn.send(msg.body);
        }
      },
      goBack() {
        // this.$toast('返回');
        this.$router.go(-1);
      },
    },
  };
</script>

<style>

</style>

<style>
  .talk_title{ font-size: 16px; line-height: 40px; font-weight: normal;}
  .talk_con {width:100%;height:500px; background:#f9f9f9;}
  .talk_show {width:100%;height: 84vh; overflow:auto;}
  .talk_input {width:100%;height:8vh;margin:10px auto 0;position: fixed;bottom: 0;}
  .whotalk {width:80px;height:30px;float:left;outline:none;}
  .talk_word {height:26px;padding:0px;float:left;margin-left:10px;outline:none;text-indent:10px;}
  .talk_sub {width:56px;height:30px; margin-left:10px;}
  .atalk {margin:10px;text-align:left; }
  .atalk span {display:inline-block;max-width:60%;word-wrap:break-word;white-space:normal;background:#E6A23C; font-size:12px;border-radius:10px;color:#fff;padding:5px 10px;}
  .btalk {margin:10px;text-align:right;  }
  .btalk span {text-align:left;display:inline-block;max-width:60%;word-wrap:break-word;white-space:normal;background:#409EFF; font-size:12px;border-radius:10px;color:#fff;padding:5px 10px;}
</style>
