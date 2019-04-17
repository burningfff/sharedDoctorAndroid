<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        支付
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px">
      <van-row style="text-align: left;margin-top: 10px">
        <span>
          {{this.information}}
        </span>
      </van-row>
      <van-row v-if="dynamicPics!=null"
               style="border-top: 1px solid rgba(205,205,205,0.46);padding-top: 10px;margin-top: 10px;text-align:left">
        <div style="width:100%;
             height: 60px;
             overflow-x: scroll;
             overflow-y: hidden;
             white-space: nowrap;">
          <img v-for="(img,index) in dynamicPics"
               class="img-add" :src="img" style="padding: 0px 5px;height: 50px;width: 50px"/>
        </div>
      </van-row>
      <div style="width: 100%;margin-top: 5px;">
        <van-row style="height: 5px;background-color: #f5efec"></van-row>
      </div>
      <div style="margin-top: 5px">
        <van-row style="padding: 10px 0px">
          <van-col span="4" style="height: 40px;">
            <div style="height: 40px">
              <img style="height: 40px;width:40px;border-radius: 100%;"
                   :src="myImage"/>
            </div>
          </van-col>
          <van-col span="12" style="text-align: left">
            <van-row>
              <van-col>
                <span style="font-size: 18px;font-weight: bolder">
                  {{this.doctorName}}
                </span>
                <span style="font-size: 14px;font-weight: bolder">
                  {{this.positionName}}
                </span>
              </van-col>
            </van-row>
            <van-row
              style="font-size: 12px;margin-top: 5px;color: #3f3f3f;border-radius: 3px">
                <span>
                {{this.hospitalName}}  {{this.departName}}
              </span>
            </van-row>
          </van-col>
          <van-col span="8">
                <span style="color: #4B946A;text-align: right;display:inline-block;vertical-align:middle;line-height: 40px;">
                  ￥{{this.phonePrice}}
                </span>
          </van-col>
        </van-row>
        <van-row
          style="border-top: 1px solid rgba(205,205,205,0.46);padding-top: 10px;margin-top: 10px;text-align:left">
          <van-col span="6">
            <span>回复时间</span>
          </van-col>
          <van-col span="18" style="text-align: right;">
            <span style="color: #7d7e80;font-size: 12px">预计3小时内回复，超过24小时自动退款</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-submit-bar
      :price="this.phonePrice*100"
      button-text="立即支付"
      @submit="onSubmit"
    />
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
        hospitalName: LOCWIN.Cache.get('doctorInfo').qualification.hospital.hospitalName,
        hospitalLevel: LOCWIN.Cache.get('doctorInfo').qualification.hospital.hospitalLevel,
        information: LOCWIN.Cache.get('information'),
        phonePrice:'199.00',
        length: 0,
        dynamicPics: LOCWIN.Cache.get('dynamicPics'),
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
        if (this.length < 10) {
          this.$toast('请至少用十个字描述你的症状')
        } else {
          LOCWIN.Cache.set('information', this.information)
          LOCWIN.Cache.set('dynamicPics', this.dynamicPics)
          console.log(LOCWIN.Cache.get('information'))
          console.log(LOCWIN.Cache.get('dynamicPics'))
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
