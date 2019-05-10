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
      console.log(this.dynamicPics)
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
        phonePrice:LOCWIN.Cache.get('service').price+'.00',
        dynamicPics: LOCWIN.Cache.get('dynamicPics'),
        viewImg: [],
        myImage: 'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',
      };
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onSubmit() {
        var params = {
          doctorId: this.doctorId,
          patientId: LOCWIN.Cache.get('userInfo').patientId,
        }
        allService.addChat(params, (isOk, data) => {
          if (isOk) {
            var chatId = data.data.chatId
            var params = {
              chatId: chatId,
              chatDetail: this.information,
            }
            allService.addChatDetail(params, (isOk, data) => {
              if (isOk) {
                var params = {
                  chatId: chatId,
                  chatDetail: this.dynamicPics.join(","),
                }
                allService.addChatDetail(params, (isOk, data) => {
                  if (isOk) {
                    var params = {
                      // timeId: '',
                      patientId: LOCWIN.Cache.get('userInfo').patientId,
                      chatId: chatId
                    }
                    allService.addOrder(params, (isOk, data) => {
                      if (isOk) {
                        var params = {
                          orderId: data.data.orderId,
                          serviceId: LOCWIN.Cache.get('service').serviceId,
                        }
                        allService.addThirdparty(params, (isOk, data) => {
                          if (isOk) {
                            this.$toast.success('预约成功')
                            this.$router.push('/')
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
