<template>
  <div>
    <van-nav-bar fixed style="height: 60px">
      <span slot="left" style="font-size: 25px">
        <van-icon name="cross" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <div slot="title">
        <van-row style="height: 40px">
          <span style="font-size: 20px;font-weight: bolder">
            选择预约时间
          </span>
        </van-row>
        <van-row style="line-height: 20px">
          <span style="font-size: 10px;color: #7d7e80">
            仅可预约未来七天 医生会在预约时间联系你
          </span>
        </van-row>
      </div>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 60px">
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
                <span
                  style="color: #4B946A;text-align: right;display:inline-block;vertical-align:middle;line-height: 40px;">
                  ￥{{this.phonePrice}}
                </span>
          </van-col>
        </van-row>

        <van-row style="padding: 10px 0px;">
          <van-col span="7">
                <span style="color: #ebedf1;text-align: left">
                  ——————
                </span>
          </van-col>
          <van-col span="10" style="text-align: center;">
                <span style="font-size: 16px">
                  {{this.monthTable[this.month-1]}}
                </span>
          </van-col>
          <van-col span="7">
                <span style="color: #ebedf1;text-align: right">
                  ——————
                </span>
          </van-col>
        </van-row>
        <van-row>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[0]}}
                </span>
          </van-col>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[1]}}
                </span>
          </van-col>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[2]}}
                </span>
          </van-col>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[3]}}
                </span>
          </van-col>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[4]}}
                </span>
          </van-col>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[5]}}
                </span>
          </van-col>
          <van-col style="width: 13.14vw;text-align: center">
                <span>
                  {{this.currentWeek[6]}}
                </span>
          </van-col>
        </van-row>
        <van-tabs v-model="activePhoneTime"
                  swipe-threshold=7
                  @change="currentDate=dateTable[activePhoneTime]">
          <van-tab
            v-for="dateIndex in 7"
            :key="dateIndex"
            :title="dateTable[dateIndex-1]">
            <div>
              <van-row style="padding: 10px 5px;border-bottom:1px solid #ebedf0;">
                <span style="font-size: 16px;font-weight: bolder;">
                  可预约时间段：
                </span>
              </van-row>
              <div>
                <van-row
                  v-for="(phoneTimeSlot,index) in phoneTimeSlotTable[dateIndex-1]"
                  :key="phoneTimeSlot"
                  style="padding: 10px 5px;border-bottom:1px solid #ebedf0;font-size: 16px"
                >
                  <div @click="nextStep(phoneTimeSlot,dateIndex-1,index)">
                    <van-col span="24">
                    <span>
                      {{phoneTimeSlot}}
                    </span>
                    </van-col>
                  </div>
                </van-row>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {
      // 获取当前时间   
      this.Date = new Date();
      // 获取当前年   
      this.year = this.Date.getFullYear();
      // 获取当前月   
      this.month = this.Date.getMonth() + 1;
      // 获取当前日   
      this.date = this.Date.getDate();
      // 获取当前星期几   
      this.day = this.Date.getDay();
      // 获取小时   
      this.hour = this.Date.getHours();
      // 获取分钟   
      this.minute = this.Date.getMinutes();
      // 获取秒   
      this.second = this.Date.getSeconds();
      // 自动补零   
      this.month = (this.month < 10) ? '0' + this.month : this.month = this.month;
      this.date = (this.date < 10) ? '0' + this.date : this.date = this.date;
      this.minute = (this.minute < 10) ? '0' + this.minute : this.minute = this.minute;
      this.second = (this.second < 10) ? '0' + this.second : this.second = this.second;
      this.getDate()
      this.getTime()
      this.getWeek()
      this.getTimeslot()
    },
    data() {
      return {
        doctorId: LOCWIN.Cache.get('doctorInfo').doctorId,
        doctorName: LOCWIN.Cache.get('doctorInfo').doctorName,
        departName: LOCWIN.Cache.get('doctorInfo').depart.departName,
        positionName: LOCWIN.Cache.get('doctorInfo').qualification.position.positionName,
        hospitalName: LOCWIN.Cache.get('doctorInfo').qualification.hospital.hospitalName,
        hospitalLevel: LOCWIN.Cache.get('doctorInfo').qualification.hospital.hospitalLevel,
        phonePrice: LOCWIN.Cache.get('service').price+'.00',
        length: 0,
        dynamicPics: LOCWIN.Cache.get('dynamicPics'),
        myImage: 'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',

        activeService: 0,
        activePhoneTime: 0,

        chooseStartTime: false,
        chooseEndTime: false,
        startTime: [
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
        ],
        endTime: [
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
        ],
        tempStartTime: 0,
        tempEndTime: 0,
        currentTime: '',
        currentDate: '',
        currentWeek: [],
        Date: '',
        weekday: [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六'],
        monthTable: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ],
        phoneTimeSlotTable: [
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],
        timeIdTable: [
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ],

        dateTable: [],
        year: '',
        month: '',
        date: '',
        day: '',
        hour: '',
        minute: '',
        second: '',

      };
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      getDate() {
        var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
        var timestamp = new Date().getTime(); //获取当前时间戳
        for (var i = 0; i < 7; i++) {
          var date1 = new Date(ss * (i) + timestamp) //加上n天的国际标准日期
          this.dateTable[i] = date1.getDate().toString()
        }
      },
      getTime() {
        this.currentTime = this.hour + ':' + this.minute + ':' + this.second;
      },
      getWeek() {
        var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
        var timestamp = new Date().getTime(); //获取当前时间戳
        for (var i = 0; i < 7; i++) {
          var date1 = new Date(ss * (i) + timestamp) //加上n天的国际标准日期
          this.currentWeek[i] = this.weekday[date1.getDay()]
        }
        this.currentDate = this.dateTable[0]
        console.log(this.currentWeek)
      },
      getTimeslot() {
        var params = {
          doctorId: this.doctorId,
          serviceType: 0,
        }
        allService.findAllByDoctorIdAndServiceType(params, (isOk, data) => {
          if (isOk) {
            let tempTimeTable = data.data
            for (let i = 0; i < tempTimeTable.length; i++) {
              let tableStartTime = new Date(tempTimeTable[i].startTime.substring(0, 4), tempTimeTable[i].startTime.substring(5, 7) - 1, tempTimeTable[i].startTime.substring(8, 10), tempTimeTable[i].startTime.substring(11, 13))
              console.log(tableStartTime)
              let tempTimeId=tempTimeTable[i].timeId
              if (tableStartTime.getTime() >= new Date().getTime() && ((tableStartTime.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)) <= 7 && tempTimeTable[i].isOrdered == 0) {
                let tempHour = tableStartTime.getHours() + ':00 —— ' + (tableStartTime.getHours() + 1) + ':00'
                console.log(tempHour)
                let tempTime = Math.floor((tableStartTime.getTime() - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0).getTime()) / (24 * 60 * 60 * 1000))
                console.log(tempTime)
                // this.phoneTimeSlotTable[(tableStartTime.getTime()-new Date().getTime())/(24 * 60 * 60 * 1000)].push((tableStartTime.getHours()+ ':00 —— ' + (tableStartTime.getHours()+1) + ':00'))
                this.phoneTimeSlotTable[tempTime].push(tempHour)
                this.timeIdTable[tempTime].push(tempTimeId)
              }
            }
            console.log('phoneTimeSlotTable' + this.phoneTimeSlotTable)
          }
        })
      },
      nextStep(phoneTimeSlot,dateIndex,index) {
        if (LOCWIN.Cache.get('userInfo') == null) {
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

        } else {
          LOCWIN.Cache.set('timeId',this.timeIdTable[dateIndex][index])
          console.log(LOCWIN.Cache.get('timeId'))
          LOCWIN.Cache.set('reserveDate', this.currentDate + '号,周' + this.weekday[this.activePhoneTime] + ',' + phoneTimeSlot)
          console.log(LOCWIN.Cache.get('reserveDate'))
          this.$router.push('/illnessDetailPhone')
        }

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
