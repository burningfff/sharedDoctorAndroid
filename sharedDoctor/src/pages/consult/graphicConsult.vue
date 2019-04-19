<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="right" style="font-size: 25px">
        <van-button type="primary" @click="onClickRight" size="small">下一步</van-button>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        图文问诊
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px">
      <div style="margin-top: 10px;margin-bottom: 10px;">
        <van-row style="padding: 10px 0px">
          <van-col span="4" style="height: 40px;">
            <div style="height: 40px">
              <img style="height: 40px;width:40px;border-radius: 100%;"
                   :src="myImage"/>
            </div>
          </van-col>
          <van-col span="20" style="text-align: left">
            <van-row>
              <van-col>
                <span style="font-size: 16px;font-weight: bolder">
                  {{this.doctorName}}
                </span>
                <span style="font-size: 12px;">
                  {{this.positionName}}
                </span>
              </van-col>
            </van-row>
            <van-row
              style="font-size: 14px;margin-top: 10px;background-color: #f9f3f0;color: #3f3f3f;border-radius: 3px">
              请描述您的性别年龄、症状、就诊经历，我将竭诚为您治疗，并保证您的隐私安全
            </van-row>
          </van-col>
        </van-row>
      </div>
      <div style="border-bottom: 1px solid #ebedf0;">
        <van-field
          style="border-color:#ffffff;"
          v-model="information"
          type="textarea"
          placeholder="请在此描述"
          rows="4"
          autosize
          maxlength="200"
        />
        <van-cell style="text-align: right;margin-left: 75%;width:25%;color: #969799;"
                  :value="length+'/200'"/>
      </div>

      <div class="imgUpload">
        <div class="dynamic-imgs ">
          <div class="table-list">
            <div v-for="(img,index) in dynamicPics">
              <img class="img-add" :src="img" @click="clickImg(img)"/>
              <div style="cursor: pointer;
		                position: absolute;
		                width: 4vw;
		                height: 4vw;
		                margin-left: 24vw;
		                margin-top: -30vw;
                    color: #ed6a0c">
                <van-icon
                  size="4vw"
                  name="clear"
                  @click="deleteImg(index)"/>
              </div>
            </div>
            <van-row>
              <van-col span="8">
                <div v-show="isAddImg" @click="showUploader"
                     style="background-color: #f9f3f0;border-radius: 3px;width: 24vw;height: 21vw">
                  <img style="width: 24vw;height: 21vw" src="../../assets/addPicture.png"/>
                  <span>添加图片</span>
                </div>
              </van-col>
              <van-col span="16">
                <div v-show="isAddIntro" style="text-align: left;margin-top: 30px">
                  <van-row>你上传的附件仅对解答问题的医生可见</van-row>
                  <van-row>可上传9张</van-row>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <van-popup v-model="showUpload" style="width: 85vw;border-radius: 6px">
          <div>
            <van-cell-group>
              <van-cell @click="camera">
                拍照
              </van-cell>
              <van-cell @click="photo">
                <van-uploader class="img-add" :after-read="onRead" accept="image/*"
                              type="file"
                              capture="camera">
                  <span>上传图片</span>
                </van-uploader>
              </van-cell>
            </van-cell-group>
          </div>
        </van-popup>
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

    },
    data() {
      return {
        doctorId: LOCWIN.Cache.get('doctorInfo').doctorId,
        doctorName: LOCWIN.Cache.get('doctorInfo').doctorName,
        departName: LOCWIN.Cache.get('doctorInfo').depart.departName,
        positionName: LOCWIN.Cache.get('doctorInfo').qualification.position.positionName,
        userInfo:LOCWIN.Cache.get('userInfo'),
        information: '',
        length: 0,
        dynamicPics: [],
        viewImg: [],
        showUpload: false,
        myImage: 'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',
      };
    },
    watch: {
      'information': {
        handler() {
          this.length = this.information.length
        }
      },

    },
    computed: {
      isAddImg() {
        //如果已经9张了，isAddImg为false，隐藏加号
        if (this.dynamicPics.length >= 9) {
          return false;
        } else {
          return true;
        }
      },
      isAddIntro() {
        if (this.dynamicPics.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      showUploader() {
        this.showUpload = true;
      },
      cameraTakePicture() {
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL
        });
      },
      onSuccess(imageData) {
        return this.dynamicPics.push("data:image/jpeg;base64," + imageData);
      },

      onFail(message) {
        alert('Failed because: ' + message);
      },
      camera() {
        this.cameraTakePicture();
        this.showUpload = false;
      },
      onRead(file) {
        // console.log(file.content);
        //将原图片显示为选择的图片
        this.dynamicPics.push(file.content);
        console.log("this.dynamicPics" + this.dynamicPics.length)
        this.showUpload = false
      },
      clickImg(url) {
        // console.log(url);
        //获得图片的url和index，传给弹窗
        this.viewImg[0] = url;
        //打开弹窗
        ImagePreview(this.viewImg)
      },
      onClickLeft() {
        this.$toast('返回');
        this.$router.go(-1);
      },
      onClickRight() {
        if(this.length<10){
          this.$toast('请至少用十个字描述你的症状')
        }else if (this.userInfo==null){
          this.$dialog.confirm({
            title: '需要登录',
            message: '登陆后才可以进行后续操作？',
            confirmButtonText: '登录',
          }).then(() => {
            // on confirm
            this.$router.push('/login')
          }).catch(() => {
            // on cancel
          });
        } else{
          LOCWIN.Cache.set('information',this.information)
          LOCWIN.Cache.set('dynamicPics',this.dynamicPics)
          console.log(LOCWIN.Cache.get('information'))
          console.log(LOCWIN.Cache.get('dynamicPics'))
          this.$router.push('/payConsult');
        }
      },
      deleteImg(index) {
        // this.$toast(index)
        this.dynamicPics.splice(index, 1)
        // console.log(this.dynamicPics)
        this.$toast('删除');
        // this.$router.go(-1);
      },
    },
  };
</script>

<style>

</style>

<style lang="scss" scoped>
  .imgUpload {
    width: 100%;
    background: #ffffff;
    font-size: 14px;
    overflow-x: hidden;

  .dynamic-imgs {
    box-sizing: border-box;
    min-height: 152px;
    width: 100%;
    background-color: #ffffff;
    padding: 12px 0px;
    margin-bottom: 6.5px;

  .img-title {
    margin-bottom: 12px;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0.16px;
  }

  .table-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

  .img-add {
    width: 26vw;
    height: 26vw;
    margin-right: 2vw;
    margin-bottom: 2vw;
  }

  }
  }
  }
</style>
