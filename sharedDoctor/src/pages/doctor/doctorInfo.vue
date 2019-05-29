<template>
  <div>
    <van-nav-bar fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        资质信息
      </span>
      <van-button slot="right" @click="saveInfo" type="primary" style="font-size: 16px;" size="small">
        保存
      </van-button>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;height: 44px">
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            姓名
          </span>
        </van-col>
        <van-col span="17">
          <van-field
            name="name"
            style="padding: 10px 0px"
            v-model="doctorName"
            v-validate="'required|min:2|max:6'"
            clearable
            placeholder="请输入姓名"
            :error="errors.has('name')"
            :error-message="errors.first('name')"
          />
        </van-col>
      </van-row>

      <van-row style="border-bottom:1px solid #ebedf0;height: 44px">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            性别
          </span>
        </van-col>
        <van-radio-group v-model="gender" style="padding: 10px 0px">
          <van-col span="6">
            <van-radio name="1">男</van-radio>
          </van-col>
          <van-col span="6">
            <van-radio name="2">女</van-radio>
          </van-col>
        </van-radio-group>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            身份证号
          </span>
        </van-col>
        <van-col span="17">
          <van-field
            name="identityCard"
            type="number"
            style="padding: 10px 0px"
            v-model="identityCard"
            clearable
            v-validate="'identityCard|required'"
            :error="errors.has('identityCard')"
            :error-message="errors.first('identityCard')"
            placeholder="请填写你的身份证号"/>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            年龄
          </span>
        </van-col>
        <van-col span="17">
          <van-field type="number" style="padding: 10px 0px" v-model="age" placeholder="请填写你的年龄"/>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            科室
          </span>
        </van-col>
        <van-col span="17">
          <div @click="chooseDepart=true">
            <van-field style="padding: 10px 0px;pointer-events: none;" v-model="departName" placeholder="请选择你的科室"
                          />
          </div>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            职称
          </span>
        </van-col>
        <van-col span="17">
          <div @click="choosePosition=true">
            <van-field style="padding: 10px 0px;pointer-events: none;" v-model="positionName" placeholder="请选择你的职称"
            />
          </div>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="5">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            所属医院
          </span>
        </van-col>
        <van-col span="17">
          <div @click="chooseHospital=true">
            <van-field style="padding: 10px 0px;pointer-events: none;" v-model="hospitalName" placeholder="请选择你的所属医院"
            />
          </div>
        </van-col>
      </van-row>
      <van-row style="height: 4px;background-color: #f9f3f0"></van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            介绍（擅长解决的疾病）
          </span>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <div>
          <van-field
            style="border-color:#ffffff;"
            v-model="information"
            type="textarea"
            placeholder="请填写个人介绍(擅长解决的疾病)"
            rows="4"
            autosize
            maxlength="50"
          />
          <van-cell style="text-align: right;margin-left: 75%;width:25%;color: #969799;"
                    :value="infoLength+'/50'"/>
        </div>
      </van-row>
      <div class="imgUpload" style="margin-left: 4%;width: 92%;margin-top: 10px;text-align: center">
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
                  <van-row>请上传相关图片来进行资质认证</van-row>
                  <van-row>可上传9张</van-row>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showUpload" style="width: 85vw;border-radius: 6px">
      <div>
        <van-cell-group>
          <van-cell @click="camera">
            拍照
          </van-cell>
          <van-cell>
            <van-uploader class="img-add" :after-read="onRead" accept="image/*"
                          type="file"
                          capture="camera">
              <span>上传图片</span>
            </van-uploader>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>
    <van-popup v-model="choosePosition" style="width: 80%;height: 400px">
      <div style="margin-top: 10px;padding: 10px 20px">
        <span>
        请选择你的职称
        </span>
      </div>
      <van-cell-group>
        <van-cell
          v-for="position in positionTable"
          :key="position.positionId"
          style="text-align: left"
          :title="position.positionName"
          is-link
          @click="setPosition(position)">
        </van-cell>
      </van-cell-group>
    </van-popup>
    <van-popup v-model="chooseDepart" style="width: 80%;height: 400px">
      <div style="margin-top: 10px;padding: 10px 20px">
        <span>
        请选择你所属的科室
        </span>
      </div>
      <van-cell-group>
        <van-cell
          v-for="depart in departTable"
          :key="depart.departId"
          style="text-align: left"
          :title="depart.departName"
          is-link
          @click="setDepart(depart)">
        </van-cell>
      </van-cell-group>
    </van-popup>
    <van-popup v-model="chooseHospital" style="width: 80%;height: 400px">
      <div style="margin-top: 10px;padding: 10px 20px">
        <span>
        请选择你所属的医院
        </span>
      </div>
      <van-field
        id='inputId'
        v-model="searchKey"
        placeholder="请输入医院名"
        center
        border
        left-icon="search"
        style="border:1px solid #e8e8e8;border-radius: 6px;background-color:#f5efec;margin-top: 10px;margin-bottom: 10px"
        type="search"
        @keydown="search($event)"
      />
        <van-cell
          v-for="hospital in hospitalTable"
          :key="hospital.hospitalId"
          style="text-align: left"
          :title="hospital.hospitalName"
          is-link
          @click="setHospital(hospital)">
        </van-cell>
    </van-popup>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  import {ImagePreview} from 'vant';

  var allService = new AllService()

  export default {
    created() {
      this.getDoctorInfo()
      this.getDepartTable()
      this.getHospitalTable()
    },

    data() {
      return {
        information: '',
        infoLength: 0,
        doctorName: '',
        gender: '1',
        age: '',
        identityCard: '',
        positionId: '',
        positionName: '',
        departName: '',
        departId: '',
        hospitalName: '',
        hospitalId: '',
        searchKey:'',
        positionTable: [
          {
            positionId: 1,
            positionName: '医士'
          },
          {
            positionId: 2,
            positionName: '医师'
          },
          {
            positionId: 3,
            positionName: '主治医师'
          },
          {
            positionId: 4,
            positionName: '副主任医师'
          },
          {
            positionId: 5,
            positionName: '主任医师'
          },
        ],
        departTable:[],
        choosePosition: false,
        chooseDepart: false,
        chooseHospital: false,
        dynamicPics: [],
        viewImg: [],
        showUpload: false,
      };
    },
    watch: {
      'information': {
        handler() {
          this.infoLength = this.information.length;
        }
      },
      'age': {
        handler() {
          if (this.age > 120) {
            this.age = 120
          }
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
    mounted () {
      document.getElementById('inputId').focus()
    },
    methods: {
      getDoctorInfo() {
        if (LOCWIN.Cache.get('userInfo') != null) {
          this.doctorName = LOCWIN.Cache.get('userInfo').doctorName
          if (LOCWIN.Cache.get('userInfo').gender == "男") {
            this.gender = '1'
          } else if (LOCWIN.Cache.get('userInfo').gender == "女") {
            this.gender = '2'
          }
          this.age = LOCWIN.Cache.get('userInfo').age
          this.identityCard=LOCWIN.Cache.get('userInfo').identityCard
          this.departName = LOCWIN.Cache.get('userInfo').depart.departName
          this.departId = LOCWIN.Cache.get('userInfo').departId
          this.information = LOCWIN.Cache.get('userInfo').introduction
          this.hospitalName= LOCWIN.Cache.get('userInfo').qualification.hospital.hospitalName
          this.hospitalId= LOCWIN.Cache.get('userInfo').qualification.hospitalId
          this.positionName= LOCWIN.Cache.get('userInfo').qualification.position.positionName
          this.positionId= LOCWIN.Cache.get('userInfo').qualification.positionId
          this.dynamicPics=LOCWIN.Cache.get('userInfo').qualification.imageUrl.split(",")
        }
      },
      getDepartTable(){
        var params = {
        }
        allService.getAllDepart(params, (isOk, data) => {
          if (isOk) {
            this.departTable=data.data
            console.log(this.departTable)
          }
        })
      },
      getHospitalTable(){
        var params = {
          hospitalName:'',
        }
        allService.findAllByHospitalNameContaining(params, (isOk, data) => {
          if (isOk) {
            this.hospitalTable=data.data
            console.log(this.hospitalTable)
          }
        })
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      saveInfo() {
        var tempGender = ''
        if (this.gender == "1") {
          tempGender = '男'
        } else if (this.gender == "2") {
          tempGender = '女'
        }
        var params = {
          doctorId: LOCWIN.Cache.get('userInfo').doctorId,
          doctorName: this.doctorName,
          age: this.age,
          gender: tempGender,
          identityCard: this.identityCard,
        }
        allService.updateDoctorBasicData(params, (isOk, data) => {
          if (isOk) {
            var params = {
              introduction:this.information,
              doctorId: LOCWIN.Cache.get('userInfo').doctorId,

            }
            allService.updateDoctorIntroduction(params, (isOk, data) => {
              if (isOk) {
                var params = {
                  departId:this.departId,
                  doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                }
                allService.updateDoctorDepart(params, (isOk, data) => {
                  if (isOk) {
                    var params = {
                      qualificationId:LOCWIN.Cache.get('userInfo').qualificationId,
                      positionId:this.positionId,
                      hospitalId:this.hospitalId,
                      imageUrl:this.dynamicPics.join(","),
                    }
                    allService.updateQualificationInfoByQualificationId(params, (isOk, data) => {
                      if (isOk) {
                        var params = {
                          doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                        }
                        allService.findDoctorByDoctorId(params, (isOk, data) => {
                          if(isOk){
                            this.$toast.success('保存成功！')
                            LOCWIN.Cache.set('userInfo',data.data)
                            this.getDoctorInfo()
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      },
      setPosition(position) {
        console.log(position)
        this.positionId = position.positionId
        this.positionName = position.positionName
        console.log(this.positionName)
        this.choosePosition = false
      },
      setDepart(depart) {
        console.log(depart)
        this.departId = depart.departId
        this.departName = depart.departName
        console.log(this.departName)
        this.chooseDepart = false
      },
      setHospital(hospital) {
        console.log(hospital)
        this.hospitalId = hospital.hospitalId
        this.hospitalName = hospital.hospitalName
        console.log(this.hospitalName)
        this.chooseHospital = false
      },
      search(event) {
        if (event.keyCode == 13) {//键盘回车的编码是13
          var params = {
            hospitalName: this.searchKey,
          }
          allService.findAllByHospitalNameContaining(params, (isOk, data) => {
            if (isOk) {
              this.hospitalTable = data.data
              console.log(this.hospitalTable)
              this.chooseHospital=false;
              this.chooseHospital=true;
            }
          })
        }
      },
      deleteImg(index) {
        // this.$toast(index)
        this.dynamicPics.splice(index, 1)
        // console.log(this.dynamicPics)
        this.$toast('删除');
        // this.$router.go(-1);
      },
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
      },
      onRead(file) {
        // this.dynamicPics.push(file.content);
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
