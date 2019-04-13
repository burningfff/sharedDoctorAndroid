<template>
  <div>
    <van-nav-bar fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        患者信息
      </span>
      <van-button slot="right" @click="saveInfo" type="primary" style="font-size: 16px;" size="small">
        保存
      </van-button>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;height: 44px">
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="4">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            姓名
          </span>
        </van-col>
        <van-col span="19">
          <van-field style="padding: 10px 0px" v-model="patientName" placeholder="请填写你的姓名"/>
        </van-col>
      </van-row>

      <van-row style="border-bottom:1px solid #ebedf0;height: 44px">
        <van-col offset="1" span="4">
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
        <van-col offset="1" span="4">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            年龄
          </span>
        </van-col>
        <van-col span="19">
          <van-field style="padding: 10px 0px" v-model="age" placeholder="请填写你的年龄"/>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1" span="4">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            体重
          </span>
        </van-col>
        <van-col span="17">
          <van-field type="number" style="padding: 10px 0px" v-model="weight" placeholder="kg"/>
        </van-col>
        <van-col>
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            kg
          </span>
        </van-col>
      </van-row>
      <van-row style="height: 4px;background-color: #f9f3f0"></van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <van-col offset="1">
          <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
            过往病史
          </span>
        </van-col>
      </van-row>
      <van-row style="border-bottom:1px solid #ebedf0;">
        <div>
          <van-field
            style="border-color:#ffffff;"
            v-model="information"
            type="textarea"
            placeholder="请填写过往病史(选填)"
            rows="4"
            autosize
            maxlength="50"
          />
          <van-cell style="text-align: right;margin-left: 75%;width:25%;color: #969799;"
                    :value="infoLength+'/50'"/>
        </div>
      </van-row>
    </div>
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
        information: '',
        infoLength: 0,
        patientName: '',
        gender: '1',
        age: '',
        weight: '',

      };
    },
    watch: {
      'information': {
        handler() {
          this.infoLength = this.information.length;
        }
      },
      'weight': {
        handler() {
          if (this.weight > 250) {
            this.weight = 250
          }
        }
      },
    },
    methods: {
      getPatientInfo() {
        if (LOCWIN.Cache.get('userInfo') != null) {
          this.patientName = LOCWIN.Cache.get('userInfo').patientName
          if(LOCWIN.Cache.get('userInfo').gender=="男"){
            this.gender = '1'
          }else if(LOCWIN.Cache.get('userInfo').gender=="女"){
            this.gender = '2'
          }
          this.age = LOCWIN.Cache.get('userInfo').age
          this.weight = LOCWIN.Cache.get('userInfo').weight
          this.information = LOCWIN.Cache.get('userInfo').illness
        }
      },
      onClickLeft() {
        this.$toast('返回');
        this.$router.go(-1)
      },
      saveInfo() {
        var params = {
          patientId:LOCWIN.Cache.get('userInfo').patientId,
          patientName: this.patientName,
          age:this.age,
          gender: this.gender,
          weight: this.weight,
          illness: this.information,
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
          }
        })

        // this.$router.go(-1)
      },
    },
  };
</script>

<style>

</style>
