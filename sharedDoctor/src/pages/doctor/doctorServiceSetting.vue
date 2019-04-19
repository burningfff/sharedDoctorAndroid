<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        提供服务
      </span>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;">
      <van-tabs v-model="activeService" animated>
        <van-tab title="语音问诊" style="margin-left: 4vw;width: 92vw">
          <div>
            <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
              <span>
                请选择提供服务的时间段：
              </span>
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
            <van-tabs v-model="activeTime"
                      swipe-threshold=7
                      @change="currentDate=dateTable[activeTime]">
              <van-tab
                v-for="dateIndex in 7"
                :key="dateIndex"
                :title="dateTable[dateIndex-1]">
                <van-row style="border-bottom:1px solid #ebedf0;">
                  <van-col span="6">
                <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
                  开始时间：
                </span>
                  </van-col>
                  <van-col span="18">
                    <van-field style="padding: 10px 0px" v-model="startTime[dateIndex-1]" placeholder="请选择提供服务的开始时间"
                               @click="chooseStartTime=true"/>
                  </van-col>
                </van-row>
                <van-row style="border-bottom:1px solid #ebedf0;">
                  <van-col span="6">
                <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
                  结束时间：
                </span>
                  </van-col>
                  <van-col span="18">
                    <van-field style="padding: 10px 0px" v-model="endTime[dateIndex-1]" placeholder="请选择提供服务的结束时间"
                               @click="chooseEndTime=true"/>
                  </van-col>
                </van-row>
                <div v-if="phoneTimeSlotTable[dateIndex-1]!=null">
                  <van-row style="padding: 10px 5px;border-bottom:1px solid #ebedf0;">
                    <span style="font-size: 16px;font-weight: bolder;">
                      预约时间段：
                    </span>
                  </van-row>
                  <div>
                    <van-row
                      v-for="(phoneTimeSlot,index) in phoneTimeSlotTable[dateIndex-1]"
                      :key="phoneTimeSlot"
                      style="padding: 10px 5px;border-bottom:1px solid #ebedf0;font-size: 16px">
                      <van-col span="16">
                        <span>
                          {{phoneTimeSlot}}
                        </span>
                      </van-col>
                      <van-col offset="4" span="4">
                        <van-button size="mini" type="danger" @click="deletePhoneTimeSlot(index,dateIndex-1)">
                          删除
                        </van-button>
                      </van-col>
                    </van-row>
                  </div>
                  <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;margin-left:3%;
                              width: 90%;font-size: 16px"
                              @click="savePhoneTimeSlot(dateIndex-1)">
                    保存可预约时间
                  </van-button>
                </div>
                <van-popup v-model="chooseStartTime" position="bottom"
                           @click-overlay="setStartTime(dateIndex-1)">
                  <van-datetime-picker
                    title="开始时间"
                    v-model="startTime[dateIndex-1]"
                    type="time"
                    :min-hour="0"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setStartTime(dateIndex-1)"
                  />
                </van-popup>
                <van-popup v-model="chooseEndTime" position="bottom"
                            @click-overlay="setEndTime(dateIndex-1)">
                  <van-datetime-picker
                    title="结束时间"
                    v-model="endTime[dateIndex-1]"
                    type="time"
                    :min-hour="tempStartTime+1"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setEndTime(dateIndex-1)"
                  />
                </van-popup>
              </van-tab>
            </van-tabs>
          </div>

        </van-tab>
        <van-tab title="预约上门" style="margin-left: 4vw;width: 92vw">

        </van-tab>
        <van-tab title="图文问诊" style="margin-left: 4vw;width: 92vw">
        </van-tab>
      </van-tabs>
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
    },
    data() {
      return {
        activeService: 0,
        activeTime: 0,
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
        ],
        dateTable: [],
        year: '',
        month: '',
        date: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
        pickerVisible: '',
      };
    },
    methods: {
      onClickLeft() {
        this.$toast('返回');
        this.$router.go(-1)
      },
      getDate() {
        var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
        var timestamp = new Date().getTime(); //获取当前时间戳
        for (var i = 0; i < 7; i++) {
          var date1 = new Date(ss * (i + 3) + timestamp) //加上n天的国际标准日期
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
          var date1 = new Date(ss * (i + 3) + timestamp) //加上n天的国际标准日期
          this.currentWeek[i] = this.weekday[date1.getDay()]
        }
        this.currentDate = this.dateTable[0]
        console.log(this.currentWeek)
      },
      setStartTime(dateIndex) {
        this.chooseStartTime = false
        console.log(this.currentDate)
        this.tempStartTime = Number(this.startTime[dateIndex].substring(0, 2))
        var tempDate = new Date(this.year, this.month - 1, this.currentDate, this.tempStartTime)
        console.log(this.tempStartTime)
        console.log(tempDate)
      },
      setEndTime(dateIndex) {
        this.chooseEndTime = false
        console.log(this.currentDate)
        this.tempEndTime = Number(this.endTime[dateIndex].substring(0, 2))
        var tempDate = new Date(this.year, this.month - 1, this.currentDate, this.tempEndTime)
        console.log(this.tempEndTime)
        console.log(tempDate)
        this.phoneTimeSlotTable[dateIndex] = []
        for (var i = 0; i < this.tempEndTime - this.tempStartTime; i++) {
          this.phoneTimeSlotTable[dateIndex][i] = (this.tempStartTime + i) + ':00 —— ' + (this.tempStartTime + i + 1) + ':00'
        }
        console.log(this.phoneTimeSlotTable)
      },
      deletePhoneTimeSlot(index,dateIndex){
        console.log('index '+index)
        console.log('dateIndex '+dateIndex)
        this.phoneTimeSlotTable[dateIndex].splice(index, 1)
        console.log('phoneTimeSlotTable[dateIndex] '+this.phoneTimeSlotTable[dateIndex])
        if(this.activeTime==0)
        {
          this.activeTime=1
        }else {
          this.activeTime=0
        }
        this.activeTime=dateIndex
      },
      savePhoneTimeSlot(dateIndex){
        console.log(this.phoneTimeSlotTable[dateIndex])
      }
    },
  };
</script>

<style>

</style>
