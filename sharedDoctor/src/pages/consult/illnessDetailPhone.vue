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
        问题描述
      </span>
    </van-nav-bar>

    <div class="content" style="margin-top: 46px">
      <van-row style="text-align: left;background-color: #f5efec;padding-top: 10px;padding-bottom: 5px">
        <span style="color: #6b6b6d;font-size: 12px;margin-left: 4vw">
          已预约以下时间
        </span>
      </van-row>
      <div style="margin-left: 4%;width: 92%;">
        <van-row style="padding: 10px 0px">
          <van-col span="18" style="text-align: left">
            <van-row>
              <span style="font-size: 16px;color: #000000">
                {{reserveDate}}
              </span>
            </van-row>
            <van-row>
              <span style="font-size: 12px;color: #a6a6a6">
                医生会在该时间段联系你，请保持手机畅通
              </span>
            </van-row>
          </van-col>
          <van-col span="6" style="text-align: right;">
            <div @click="onClickLeft">
              <span style="display:inline-block;vertical-align:middle;line-height: 39.2px;font-size: 14px;color: #a6a6a6">
                重新预约
              </span>
            </div>
          </van-col>
        </van-row>
      </div>
      <van-row style="background-color: #f5efec;height: 5px" />

      <van-row style="margin-left: 4%;width: 92%;padding: 10px 0px">
        <van-col span="12" style="text-align: left">
          <span style="font-size: 16px;color: #000000">
            接听手机
          </span>
        </van-col>
        <van-col span="12" style="text-align: right">
          <span style="font-size: 16px;color: #000000">
            {{phone}}
          </span>
        </van-col>
      </van-row>

      <van-row style="background-color: #f5efec;height: 5px" />
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

      <div class="imgUpload" style="margin-left: 4%;width: 92%;">
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

        reserveDate:LOCWIN.Cache.get('reserveDate'),
        phone:LOCWIN.Cache.get('userInfo').phone,
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

      dataURItoBlob(base64Data) {
        let byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(base64Data.split(',')[1]);
        else
          byteString = unescape(base64Data.split(',')[1]);
        let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
      },
      updateImg(imageData) {
        let canvas = document.createElement('canvas');
        let dataURL = canvas.toDataURL('image/jpeg', 0.5);
        let params = new FormData(document.forms[0]);
        params.append("file", this.dataURItoBlob(imageData), 'image.png');
        let config = {
          headers: { //添加请求头
            Authorization:
              "Bearer " + window.localStorage.getItem("managementToken"),
            "Content-Type": "multipart/form-data"
          }
        };
        let url = "http://106.14.137.163:2800/file/upload";
        this.$ajax.post(url, params, config).then(res => {
          console.log(res);
          console.log(res.data.data);
          this.showUpload = false;
          this.dynamicPics.push('http://' + res.data.data);
          this.$toast.success({
            message:'上传成功',
            duration:1000
          })
        }).catch(err => {
          this.$dialog.alert({
            message: err
          }).then(() => {
            this.showUpload = false;
          });
        });
      },
      onSuccess(imageData) {
        this.updateImg("data:image/jpeg;base64," + imageData)
      },

      onFail(message) {
        alert('Failed because: ' + message);
      },
      camera() {
        this.cameraTakePicture();
        this.showUpload = false;
      },
      onRead(file) {
        let params = new FormData(); //创建form对象
        params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        let config = {
          headers: { //添加请求头
            Authorization:
              "Bearer " + window.localStorage.getItem("managementToken"),
            "Content-Type": "multipart/form-data"
          }
        };
        let url = "http://106.14.137.163:2800/file/upload";
        this.$ajax.post(url, params, config).then(res => {
          console.log(res);
          console.log(res.data.data);
          this.showUpload = false;
          this.dynamicPics.push('http://'+res.data.data);
          // var params = {
          //   doctorId: LOCWIN.Cache.get('userInfo').doctorId,
          //   imageUrl: 'http://'+res.data.data
          // }
          // allService.updateDoctorImageUrl(params, (isOk, data) => {
          //   if (isOk) {
          //     this.$toast.success('上传成功')
          //   }
          // })
          this.$toast.success({
            message:'上传成功',
            duration:1000
          })
        }).catch(err => {
          console.log(err)
          this.showUpload = false;
        });
      },
      clickImg(url) {
        // console.log(url);
        //获得图片的url和index，传给弹窗
        this.viewImg[0] = url;
        //打开弹窗
        ImagePreview(this.viewImg)
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        if(this.length<10){
          this.$toast('请至少用十个字描述你的症状')
        } else{
          LOCWIN.Cache.set('information',this.information)
          LOCWIN.Cache.set('dynamicPics',this.dynamicPics)
          console.log(LOCWIN.Cache.get('information'))
          console.log(LOCWIN.Cache.get('dynamicPics'))
          this.$router.push('/payPhone');
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
