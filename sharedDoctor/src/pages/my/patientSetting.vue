<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        设置
      </span>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;height: 44px">
      <van-cell-group>
        <van-cell @click="showUploader">
          <span
            slot="title"
            style="display:inline-block;vertical-align:middle;line-height: 16vw;font-size: 14px">
              头像
            </span>
          <div style="height: 48px">
            <img style="height: 48px;width:48px;border-radius: 100%;"
                 :src="myImage"/>
            <!--id=myImage-->
          </div>
          <van-icon
            slot="right-icon"
            style="display:inline-block;vertical-align:middle;line-height: 16vw;font-size: 14px;color: #969799"
            name="arrow">
          </van-icon>
        </van-cell>
        <van-cell title="姓名" is-link :value="patientName" @click="showUpdateName=true"/>
        <van-cell title="手机号码" is-link :value="phone" @click="showUpdatePhone=true"/>
        <van-cell title="邮箱账号" is-link :value="email" @click="showUpdateEmail=true"/>
        <van-cell title="我的地址" is-link :value="location" to="updatePatientLocation"/>
      </van-cell-group>
    </div>
    <van-popup v-model="showUpload" style="width: 85vw;border-radius: 6px">
      <div>
        <van-cell-group>
          <van-cell @click="camera">
            <!--<input type="file" name="file"  capture="camera">-->
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
    <van-dialog
      v-model="showUpdateName"
      title="修改姓名"
      show-cancel-button
      @confirm="updateName"
      @cancel="tempPatientName=patientName"
    >
      <van-field
        name="name"
        v-model="tempPatientName"
        v-validate="'required|min:2|max:6'"
        clearable
        placeholder="请输入姓名"
        :error="errors.has('name')"
        :error-message="errors.first('name')"
      />
    </van-dialog>
    <van-dialog
      v-model="showUpdatePhone"
      title="修改手机号码"
      show-cancel-button
      @confirm="updatePhone"
      @cancel="tempPhone=phone"
    >
      <van-field
        id="phone"
        name="phone"
        v-model="tempPhone"
        v-validate="'phone'"
        clearable
        placeholder="请输入手机号码"
        :error="errors.has('phone')"
        :error-message="errors.first('phone')"
      />
    </van-dialog>
    <van-dialog
      v-model="showUpdateEmail"
      title="修改邮箱账号"
      show-cancel-button
      @confirm="updateEmail"
      @cancel="tempEmail=email"
    >
      <van-field
        id="email"
        name="email"
        v-model="tempEmail"
        v-validate="'email'"
        clearable
        placeholder="请输入邮箱账号"
        :error="errors.has('email')"
        :error-message="errors.first('email')"
      />
    </van-dialog>

  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {
      this.getPatientInfo()
    },

    data() {
      return {
        patientName: '',
        tempPatientName: '',
        phone: '',
        tempPhone: '',
        email: '',
        tempEmail: '',
        location: '',
        myImage: 'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',
        showUpload: false,
        showUpdateName: false,
        showUpdatePhone: false,
        showUpdateEmail: false,
        show: true,
      };
    },
    methods: {
      onRead(file) {
        // console.log(file.content);
        //将原图片显示为选择的图片
        this.myImage = file.content;
        console.log("this.dynamicPics" + this.dynamicPics.length);
        this.showUpload = false;
      },
      getPatientInfo() {
        if (LOCWIN.Cache.get('userInfo') != null) {
          this.patientName = LOCWIN.Cache.get('userInfo').patientName
          this.tempPatientName = LOCWIN.Cache.get('userInfo').patientName
          this.phone = LOCWIN.Cache.get('userInfo').phone
          this.tempPhone = LOCWIN.Cache.get('userInfo').phone
          this.email = LOCWIN.Cache.get('userInfo').email
          this.tempEmail = LOCWIN.Cache.get('userInfo').email
          this.location = LOCWIN.Cache.get('userInfo').location.city+ LOCWIN.Cache.get('userInfo').location.area
        }
      },
      cameraTakePicture() {
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI
        });
      },
      onSuccess(imageData) {
        return this.myImage = imageData
      },

      onFail(message) {
        alert('失败原因: ' + message);
      },

      onClickLeft() {
        this.$router.go(-1)
      },
      showUploader() {
        this.showUpload = true;
      },
      camera() {
        this.cameraTakePicture();
        this.showUpload = false;
      },
      updateName() {
        if (this.tempPatientName.length <= 6 && this.tempPatientName.length >= 2) {
          var params = {
            patientId:LOCWIN.Cache.get('userInfo').patientId,
            patientName: this.tempPatientName,
            age:LOCWIN.Cache.get('userInfo').age,
            gender: LOCWIN.Cache.get('userInfo').gender,
            weight: LOCWIN.Cache.get('userInfo').weight,
            illness: LOCWIN.Cache.get('userInfo').information,
          }
          allService.updatePatientBasicData(params, (isOk, data) => {
            if(isOk){
              var params = {
                patientId: LOCWIN.Cache.get('userInfo').patientId,
              }
              allService.getPatientDetailById(params, (isOk, data) => {
                if(isOk){
                  LOCWIN.Cache.set('userInfo',data.data)
                  this.getPatientInfo()
                }
              })
              this.patientName = this.tempPatientName
            }
          })
        } else {
          this.$toast.fail("用户姓名格式有误，请重填")
        }
        console.log(this.patientName)
      },
      updatePhone() {
        var phoneTemp = document.getElementById('phone').value;
        if (!(/^1[34578]\d{9}$/.test(phoneTemp))) {
          this.$toast.fail("手机号码格式有误，请重填");
        } else {
          var params = {
            patientId: LOCWIN.Cache.get('userInfo').patientId,
            phone: this.tempPhone,
            email: LOCWIN.Cache.get('userInfo').email,
            locationId: LOCWIN.Cache.get('userInfo').locationId
          }
          allService.updatePatientContact(params, (isOk, data) => {
            if (isOk) {
              var params = {
                patientId: LOCWIN.Cache.get('userInfo').patientId,
              }
              allService.getPatientDetailById(params, (isOk, data) => {
                if (isOk) {
                  LOCWIN.Cache.set('userInfo', data.data)
                  this.getPatientInfo()
                }
              })
            }
          })
          this.phone = this.tempPhone
        }

        console.log(this.phone)
      },
      updateEmail() {
        var emailTemp = document.getElementById('email').value;
        if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(emailTemp))) {
          this.$toast.fail("邮箱账号格式有误，请重填");
        } else {
          var params = {
            patientId: LOCWIN.Cache.get('userInfo').patientId,
            phone: LOCWIN.Cache.get('userInfo').phone,
            email: this.tempEmail,
            locationId: LOCWIN.Cache.get('userInfo').locationId
          }
          allService.updatePatientContact(params, (isOk, data) => {
            if (isOk) {
              var params = {
                patientId: LOCWIN.Cache.get('userInfo').patientId,
              }
              allService.getPatientDetailById(params, (isOk, data) => {
                if (isOk) {
                  LOCWIN.Cache.set('userInfo', data.data)
                  this.getPatientInfo()
                }
              })
            }
          })
          this.email = this.tempEmail
        }
        console.log(this.email)
      },
    },
  };
</script>

<style>

</style>
