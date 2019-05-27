<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        问诊详情
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px">
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
                  {{this.patientName}}
                </span>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <div style="width: 100%;margin-top: 5px;">
          <van-row style="height: 5px;background-color: #f5efec"></van-row>
        </div>
        <van-row
          v-if="reserveDate!=''"
          style="padding: 10px 0px;border-bottom:1px solid #ebedf0;">
          <van-col span="8" style="text-align: left">
            <van-row>
              <span style="color: #000000;font-size: 16px;">
                预约时间
              </span>
            </van-row>
            <van-row>
              <span style="font-size: 12px;color: #a6a6a6">
                请保持手机畅通
              </span>
            </van-row>
          </van-col>
          <van-col span="16" style="text-align: right">
            <van-row>
              <span
                style="font-size: 14px;color: #b8b8b8;display:inline-block;vertical-align:middle;line-height: 39.2px;">
                {{reserveDate}}
              </span>
            </van-row>
          </van-col>
        </van-row>
        <van-row style="padding: 10px 0px;border-bottom:1px solid #ebedf0;">
          <van-col span="12" style="text-align: left">
          <span style="font-size: 16px;color: #000000">
            接听手机
          </span>
          </van-col>
          <van-col span="12" style="text-align: right">
          <span style="font-size: 16px;color: #b8b8b8">
            {{phone}}
          </span>
          </van-col>
        </van-row>
        <van-row style="padding: 10px 0px;border-bottom:1px solid #ebedf0;">
          <van-col span="8" style="text-align: left">
          <span style="font-size: 16px;color: #000000">
            家庭住址
          </span>
          </van-col>
          <van-col span="16" style="text-align: right">
            <van-row>
            <span style="font-size: 16px;color: #000000">
              {{location}}
            </span>
            </van-row>
            <van-row>
            <span style="font-size: 16px;color: #000000">
              {{locationDetail}}
            </span>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <div>
        <van-row style="text-align: left;padding: 10px 0px;font-size: 16px;color: #000000">
          <span>
            病情描述
          </span>
        </van-row>
        <van-row style="text-align: left;padding: 10px 0px">
        <span style="display:inline-block;width:100%;word-wrap:break-word;white-space:normal;">
          {{this.information}}
        </span>
        </van-row>
        <van-row v-if="dynamicPics[0]!=null"
                 style="border-top: 1px solid rgba(205,205,205,0.46);padding-top: 10px;text-align:left">
          <div style="width:100%;
             height: 60px;
             overflow-x: scroll;
             overflow-y: hidden;
             white-space: nowrap;">
            <img v-for="(img,index) in dynamicPics"
                 class="img-add" :src="img" style="padding: 0px 5px;height: 50px;width: 50px"
                 @click="clickImg(img)"/>
          </div>
        </van-row>
      </div>
    </div>
    <div
      v-if="orderState==0"
      style="position: fixed;bottom: 0;width: 100vw;padding: 10px 0px;background-color: white">
      <van-row>
        <div
          v-if="serviceType==0">
          <van-col span="8" offset="8">
            <van-button round type="warning" @click="cancelOrder">取消预约</van-button>
          </van-col>
          <van-col span="8">
            <van-button round type="primary" @click="provideService">开始问诊</van-button>
          </van-col>
        </div>
        <div
          v-if="serviceType==1">
          <van-col span="8" offset="16">
            <van-button round type="warning" @click="cancelOrder">取消预约</van-button>
          </van-col>
        </div>
      </van-row>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  import {ImagePreview} from 'vant';

  var allService = new AllService()

  export default {
    created() {
      if (LOCWIN.Cache.get('orderInfo').timeslot.startTime != null) {
        this.serviceType=1
        let tempStartTime = new Date(LOCWIN.Cache.get('orderInfo').timeslot.startTime.substring(0, 4), LOCWIN.Cache.get('orderInfo').timeslot.startTime.substring(5, 7) - 1, LOCWIN.Cache.get('orderInfo').timeslot.startTime.substring(8, 10), LOCWIN.Cache.get('orderInfo').timeslot.startTime.substring(11, 13))
        console.log(tempStartTime)
        this.reserveDate = tempStartTime.getMonth() + 1 + '月' + tempStartTime.getDate() + '号,周' + this.weekday[tempStartTime.getDay()] + ',' + tempStartTime.getHours() + ':00-' + (Number(tempStartTime.getHours()) + 1) + ':00'
      }
      console.log(this.dynamicPics)
    },
    data() {
      return {
        patientId: LOCWIN.Cache.get('orderInfo').patientId,
        patientName: LOCWIN.Cache.get('orderInfo').patient.patientName,
        information: LOCWIN.Cache.get('orderInfo').chat.chatDetails[0].chatDetail,
        dynamicPics: LOCWIN.Cache.get('orderInfo').chat.chatDetails[1].chatDetail.split(","),
        viewImg: [],
        myImage: LOCWIN.Cache.get('orderInfo').patient.imageUrl,
        reserveDate: '',
        weekday: [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六'],
        phone: LOCWIN.Cache.get('orderInfo').patient.phone,
        location: LOCWIN.Cache.get('orderInfo').patient.location.province + LOCWIN.Cache.get('orderInfo').patient.location.city + LOCWIN.Cache.get('orderInfo').patient.location.area,
        locationDetail: LOCWIN.Cache.get('orderInfo').patient.location.locationDetail,
        orderState:LOCWIN.Cache.get('orderInfo').orderState,
        serviceType:0
      };
    },

    methods: {
      cancelOrder() {
        this.$dialog.confirm({
          title: '取消预约',
          message: '你确定要取消预约吗？'
        }).then(() => {
          // on confirm
          var params = {
            orderId:LOCWIN.Cache.get('orderInfo').orderId
          }
          allService.deleteOrderByOrderId(params, (isOk, data) => {
            if (isOk) {
              this.$toast.success('取消成功！')
              this.$router.go(-1)
            }
          })
        }).catch(() => {
          // on cancel
        });
      },
      provideService() {
        LOCWIN.Cache.set('toUserInfo', LOCWIN.Cache.get('orderInfo').patient)
        LOCWIN.Cache.set('chatId',LOCWIN.Cache.get('orderInfo').chatId)
        LOCWIN.Cache.set('chatHistory',LOCWIN.Cache.get('orderInfo').chat.chatDetails)
        console.log('toUserInfo:')
        console.log(LOCWIN.Cache.get('toUserInfo'))
        this.$router.push('/onlineConsult')
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
    }
  };
</script>

<style>

</style>
