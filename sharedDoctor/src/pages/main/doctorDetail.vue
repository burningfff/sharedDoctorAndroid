<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        问医生
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 66px">
      <van-row>
        <van-col span="19" style="text-align: left">
          <van-row>
            <span style="font-size: 20px;font-weight: bolder">
              {{this.doctorName}}
            </span>
          </van-row>
          <van-row style="margin-top: 10px">
            <span style="font-size: 14px">
              {{this.departName}}     {{this.positionName}}
            </span>
          </van-row>
          <van-row style="margin-top: 2px">
            <van-tag size="medium">{{this.hospitalLevel}}</van-tag>
            <span style="font-size: 14px">
              {{this.hospitalName}}
            </span>
          </van-row>
        </van-col>
        <van-col span="5">
          <div style="height: 60px">
            <img style="height: 60px;width:60px;border-radius: 100%;"
                 :src="myImage"
                 @click="swiperImgClick"/>
          </div>
        </van-col>
      </van-row>
      <van-row style="text-align: left;margin-top: 10px">
        <span>个人介绍</span>
      </van-row>
      <van-row style="text-align: left;margin-top: 5px">
        <van-col span="24">
          <span
            style="display:inline-block;width:100%;word-wrap:break-word;white-space:normal;">{{this.introduction}}</span>
        </van-col>

      </van-row>
      <van-row style="margin-top: 20px;text-align: left">
        <van-col span="6">
          <span style="font-size: 16px;font-weight: bolder">{{this.replyTimes}}</span>
          <span style="font-size: 10px">次回复</span>
        </van-col>
        <van-col span="3">
          <span style="font-size: 16px;font-weight: bolder">{{this.evaluation}}</span>
          <span style="font-size: 10px">分</span>
        </van-col>
        <van-col span="6">
          <van-rate v-model="evaluation" allow-half
                    void-icon="star"
                    void-color="#eee"
                    readonly
                    :size="10"/>
        </van-col>
      </van-row>
      <div style="width: 100%;margin-top: 10px;">
        <van-row style="height: 10px;background-color: #f5efec"></van-row>
      </div>
      <div style="margin-top: 10px;margin-bottom: 10px" @click="showConsult=true">
        <van-row>
          <van-col span="6">
            <span style="font-size: 16px;font-weight: bolder">
              问诊方式
            </span>
          </van-col>
          <van-col offset="2" span="8" style="font-size: 14px;text-align: right">
            <span>
            图文
            </span>
            <span style="color: #4B946A">
            {{this.picturePrice}}
          </span>
          </van-col>
          <van-col span="8" style="font-size: 14px;text-align: right">
            <span>
            电话
          </span>
            <span style="color: #4B946A;width: 100%">
            {{this.phonePrice}}
          </span>
            <van-icon style="color: #7d7e80" name="arrow"/>
          </van-col>
        </van-row>
      </div>
      <div style="" @click="homeDoctor">
        <van-row style="padding: 10px 0px;border-top: 1px solid rgba(205,205,205,0.46);">
          <van-col span="6">
            <span style="font-size: 16px;font-weight: bolder">
              预约上门
            </span>
          </van-col>
          <van-col offset="6" span="12" style="font-size: 14px;text-align: right">
            <span>
            上门服务
            </span>
            <span style="color: #4B946A">
            {{this.homePrice}}
          </span>
            <van-icon style="color: #7d7e80" name="arrow"/>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;">
        <van-row style="height: 10px;background-color: #f5efec"></van-row>
      </div>
    </div>
    <van-popup v-model="showConsult" position="bottom" style="background-color: #fafafa;text-align: left">
      <div style="margin-left: 4%;width: 92%;margin-top: 10px">
        <van-row>
          <van-col style="color: #000000">
            选择问诊方式
          </van-col>
        </van-row>

        <div
          style="border:1px solid rgba(205,205,205,0.46);background-color:#ffffff; box-shadow: 1px 1px  1px  #a6a6a6;border-radius: 3px;margin-top: 20px"
          @click="graphicConsult">
          <van-row style="height: 40px; padding: 15px 0px">
            <van-col span="4" style="height: 40px;">
              <van-icon style="width: 100%;height: 100%;font-size: 40px;color: #4B946A" name="service-o"/>
            </van-col>
            <van-col offset="1" span="17" style="text-align: left">
              <van-row style="font-size: 16px;font-weight: bolder">
                图文问诊
              </van-row>
              <van-row style="font-size: 12px;margin-top: 5px;">
                <span style="color: #4B946A">
                  {{this.picturePrice}}
                </span>
              </van-row>
            </van-col>
            <van-col span="2">
              <van-icon style="width: 100%;height: 100%;align-content: center;margin-top: 12px" name="arrow"/>
            </van-col>
          </van-row>
          <van-row>
            <van-col offset="1" span="22" style="border-top: 1px solid rgba(205,205,205,0.46);padding: 15px 0px">
              <van-row style="font-size: 10px;color: #7d7e80">
              <span>
                ·通过文字、图片向医生提问
              </span>
              </van-row>
              <van-row style="font-size: 10px;color: #7d7e80">
              <span>
                ·适合常见病及健康类问题咨询
              </span>
              </van-row>
            </van-col>

          </van-row>
        </div>
        <div
          style="border:1px solid rgba(205,205,205,0.46);background-color:#ffffff; box-shadow: 1px 1px  1px  #a6a6a6;
          border-radius: 3px;margin-top: 20px;margin-bottom: 20px"
          @click="reserveDoctor">
          <van-row style="height: 40px; padding: 15px 0px">
            <van-col span="4" style="height: 40px;">
              <van-icon style="width: 100%;height: 100%;font-size: 40px;color: #4B946A" name="service-o"/>
            </van-col>
            <van-col offset="1" span="17" style="text-align: left">
              <van-row style="font-size: 16px;font-weight: bolder">
                电话问诊
              </van-row>
              <van-row style="font-size: 12px;margin-top: 5px;">
                <span style="color: #4B946A">
                  {{this.phonePrice}}
                </span>
              </van-row>
            </van-col>
            <van-col span="2">
              <van-icon style="width: 100%;height: 100%;align-content: center;margin-top: 12px" name="arrow"/>
            </van-col>
          </van-row>
          <van-row>
            <van-col offset="1" span="22" style="border-top: 1px solid rgba(205,205,205,0.46);padding: 15px 0px">
              <van-row style="font-size: 10px;color: #7d7e80">
              <span>
                ·和医生约定时间电话交流
              </span>
              </van-row>
              <van-row style="font-size: 10px;color: #7d7e80">
              <span>
                ·适合慢性病、复杂病情的咨询，和医生充分沟通
              </span>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  import {ImagePreview} from 'vant';

  var allService = new AllService()

  export default {
    created() {
      var params = {
        doctorId: this.doctorId,
      }
      allService.findAllServiceByDoctorId(params, (isOk, data) => {
        if (isOk) {
          let serviceTable=data.data
          // console.log(serviceTable)
          // console.log(serviceTable.length)
          for(let i=0;i<serviceTable.length;i++){
            if(serviceTable[i].serviceName=='语音问诊'){
              this.phonePrice='￥'+serviceTable[i].price+'.00'
              this.phoneService=serviceTable[i]
            }else if(serviceTable[i].serviceName=='预约上门'){
              this.homePrice='￥'+serviceTable[i].price+'.00'
              this.homeService=serviceTable[i]
            }else {
              this.picturePrice='￥'+serviceTable[i].price+'.00'
              this.pictureService=serviceTable[i]
            }
            // console.log('serviceTable[i]')
            // console.log(serviceTable[i])
          }
        }
      })
    },
    data() {
      return {
        doctorId: LOCWIN.Cache.get('doctorInfo').doctorId,
        doctorName: LOCWIN.Cache.get('doctorInfo').doctorName,
        departName: LOCWIN.Cache.get('doctorInfo').depart.departName,
        positionName: LOCWIN.Cache.get('doctorInfo').qualification.position.positionName,
        hospitalName: LOCWIN.Cache.get('doctorInfo').qualification.hospital.hospitalName,
        hospitalLevel: LOCWIN.Cache.get('doctorInfo').qualification.hospital.hospitalLevel,
        evaluation: 4.4,
        replyTimes: LOCWIN.Cache.get('doctorInfo').replyTimes,
        myImage: ['http://106.14.137.163:4396/group1/M00/00/00/rBA-JVzU1eWAKdQIAAAU-qsO3GA330.png'],
        picturePrice: '暂不提供',
        pictureService: '',
        phonePrice: '暂不提供',
        phoneService: '',
        homePrice: '暂不提供',
        homeService: '',
        introduction: LOCWIN.Cache.get('doctorInfo').introduction,
        showConsult: false,
      };
    },
    methods: {
      getServicePrice(){
        console.log(this.pictureService)
        console.log(this.phoneService)
        console.log(this.homeService)
      },
      swiperImgClick() {
        ImagePreview(this.myImage)
      },
      reserveDoctor(){
        if(this.phonePrice!='暂不提供'){
          LOCWIN.Cache.set('service',this.phoneService)
          this.$router.push('/reserveDoctor');
        }else{
          this.$dialog.alert({
            message: '该医生暂不提供此项服务'
          }).then(() => {
            // on close
          });
        }
      },
      graphicConsult(){
        if(this.picturePrice!='暂不提供'){
          LOCWIN.Cache.set('service',this.pictureService)
          this.$router.push('/graphicConsult');
        }else{
          this.$dialog.alert({
            message: '该医生暂不提供此项服务'
          }).then(() => {
            // on close
          });
        }
      },
      homeDoctor(){
        if(this.homePrice!='暂不提供'){
          LOCWIN.Cache.set('service',this.homeService)
          this.$router.push('/homeDoctor');
        }else{
          this.$dialog.alert({
            message: '该医生暂不提供此项服务'
          }).then(() => {
            // on close
          });
        }
      },
      onClickLeft() {
        this.$router.go(-1);
      },
    },
  };
</script>

<style>

</style>
