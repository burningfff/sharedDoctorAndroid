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
        <!--语音问诊-->
        <van-tab :title="serviceName[0]" style="margin-left: 4vw;width: 92vw;margin-right: 4vw">
          <div>
            <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
              <span>
                请输入服务价格：
              </span>
            </van-row>
            <van-row style="border-bottom:1px solid #ebedf0;">
              <van-field
                type="number"
                v-model="phonePrice" placeholder="请输入服务价格"/>
            </van-row>
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
            <van-tabs v-model="activePhoneTime"
                      swipe-threshold=7
                      @change="currentDate=dateTable[activePhoneTime]">
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
                    <div @click="choosePhoneStartTime=true">
                      <van-field style="padding: 10px 0px;pointer-events: none;" v-model="startPhoneTime[dateIndex-1]"
                                 placeholder="请选择提供服务的开始时间"
                                 />
                    </div>
                  </van-col>
                </van-row>
                <van-row style="border-bottom:1px solid #ebedf0;">
                  <van-col span="6">
                <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
                  结束时间：
                </span>
                  </van-col>
                  <van-col span="18">
                    <div @click="choosePhoneEndTime=true;">
                      <van-field style="padding: 10px 0px;pointer-events: none;" v-model="endPhoneTime[dateIndex-1]" placeholder="请选择提供服务的结束时间"
                                 />
                    </div>
                  </van-col>
                </van-row>
                <div v-if="phoneTimeSlotTable[dateIndex-1]!=0&&phoneTimeSlotTable[dateIndex-1]!=null">
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
                        <van-button size="mini" type="danger" @click="deletePhoneTimeSlot(index,dateIndex-1)"
                                    style="font-size: 16px ">
                          删除
                        </van-button>
                      </van-col>
                    </van-row>
                  </div>
                </div>
                <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;margin-left:3%;
                              width: 90%;font-size: 16px"
                            @click="savePhoneTimeSlot(dateIndex-1)">
                  保 存
                </van-button>
                <van-popup
                  v-if="dateIndex==1"
                  v-model="choosePhoneStartTime" position="bottom"
                           @click-overlay="setPhoneStartTime(dateIndex-1)">
                  <van-datetime-picker
                    title="开始时间"
                    v-model="startPhoneTime[dateIndex-1]"
                    type="time"
                    :min-hour="hour+1"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setPhoneStartTime(dateIndex-1)"
                  />
                </van-popup>
                <van-popup
                  v-else
                  v-model="choosePhoneStartTime" position="bottom"
                           @click-overlay="setPhoneStartTime(dateIndex-1)">
                  <van-datetime-picker
                    title="开始时间"
                    v-model="startPhoneTime[dateIndex-1]"
                    type="time"
                    :min-hour="0"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setPhoneStartTime(dateIndex-1)"
                  />
                </van-popup>
                <van-popup v-model="choosePhoneEndTime" position="bottom"
                           @click-overlay="setPhoneEndTime(dateIndex-1)">
                  <van-datetime-picker
                    title="结束时间"
                    v-model="endPhoneTime[dateIndex-1]"
                    type="time"
                    :min-hour="tempPhoneStartTime+1"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setPhoneEndTime(dateIndex-1)"
                  />
                </van-popup>
              </van-tab>
            </van-tabs>
          </div>

        </van-tab>

        <!--上门服务-->
        <van-tab :title="serviceName[1]" style="margin-left: 4vw;width: 92vw;margin-right: 4vw">
          <div>
            <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
              <span>
                请输入服务价格：
              </span>
            </van-row>
            <van-row style="border-bottom:1px solid #ebedf0;">
              <van-field
                type="number"
                v-model="homePrice" placeholder="请输入服务价格"/>
            </van-row>
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
            <van-tabs v-model="activeHomeTime"
                      swipe-threshold=7
                      @change="currentDate=dateTable[activeHomeTime]">
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
                    <div @click="chooseHomeStartTime=true">
                      <van-field style="padding: 10px 0px;pointer-events: none;" v-model="startHomeTime[dateIndex-1]" placeholder="请选择提供服务的开始时间"
                                 />
                    </div>
                  </van-col>
                </van-row>
                <van-row style="border-bottom:1px solid #ebedf0;">
                  <van-col span="6">
                <span style="display:inline-block;vertical-align:middle;line-height: 44px;">
                  结束时间：
                </span>
                  </van-col>
                  <van-col span="18">
                    <div @click="chooseHomeEndTime=true">
                      <van-field style="padding: 10px 0px;pointer-events: none;" v-model="endHomeTime[dateIndex-1]" placeholder="请选择提供服务的结束时间"
                                 />
                    </div>
                  </van-col>
                </van-row>
                <div v-if="homeTimeSlotTable[dateIndex-1]!=0&&homeTimeSlotTable[dateIndex-1]!=null">
                  <van-row style="padding: 10px 5px;border-bottom:1px solid #ebedf0;">
                    <span style="font-size: 16px;font-weight: bolder;">
                      预约时间段：
                    </span>
                  </van-row>
                  <div>
                    <van-row
                      v-for="(homeTimeSlot,index) in homeTimeSlotTable[dateIndex-1]"
                      :key="homeTimeSlot"
                      style="padding: 10px 5px;border-bottom:1px solid #ebedf0;font-size: 16px">
                      <van-col span="16">
                        <span>
                          {{homeTimeSlot}}
                        </span>
                      </van-col>
                      <van-col offset="4" span="4">
                        <van-button size="mini" type="danger" @click="deleteHomeTimeSlot(index,dateIndex-1)"
                                    style="font-size: 16px ">
                          删除
                        </van-button>
                      </van-col>
                    </van-row>
                  </div>

                </div>
                <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;margin-left:3%;
                              width: 90%;font-size: 16px"
                            @click="saveHomeTimeSlot(dateIndex-1)">
                  保 存
                </van-button>
                <van-popup
                  v-if="dateIndex==1"
                  v-model="chooseHomeStartTime" position="bottom"
                           @click-overlay="setHomeStartTime(dateIndex-1)">
                  <van-datetime-picker
                    title="开始时间"
                    v-model="startHomeTime[dateIndex-1]"
                    type="time"
                    :min-hour="hour+1"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setHomeStartTime(dateIndex-1)"
                  />
                </van-popup>
                <van-popup
                  v-else
                  v-model="chooseHomeStartTime" position="bottom"
                           @click-overlay="setHomeStartTime(dateIndex-1)">
                  <van-datetime-picker
                    title="开始时间"
                    v-model="startHomeTime[dateIndex-1]"
                    type="time"
                    :min-hour="0"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setHomeStartTime(dateIndex-1)"
                  />
                </van-popup>
                <van-popup v-model="chooseHomeEndTime" position="bottom"
                           @click-overlay="setHomeEndTime(dateIndex-1)">
                  <van-datetime-picker
                    title="结束时间"
                    v-model="endHomeTime[dateIndex-1]"
                    type="time"
                    :min-hour="tempHomeStartTime+1"
                    :max-hour="23"
                    :min-minute="0"
                    :max-minute="0"
                    @confirm="setHomeEndTime(dateIndex-1)"
                  />
                </van-popup>
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>


        <van-tab :title="serviceName[2]" style="margin-left: 4vw;width: 92vw;margin-right: 4vw">
          <div>
            <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
              <span>
                请输入服务价格：
              </span>
            </van-row>
            <van-row style="border-bottom:1px solid #ebedf0;">
              <van-field
                type="number"
                v-model="graphicPrice" placeholder="请输入服务价格"/>
            </van-row>
            <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;margin-left:3%;
                              width: 90%;font-size: 16px"
                        @click="saveGraphicPrice">
              保 存
            </van-button>
          </div>
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
      this.getPhoneTimeslot()
      this.getHomeTimeslot()
    },
    data() {
      return {
        activeService: 0,
        activePhoneTime: 0,
        activeHomeTime: 0,
        serviceName: [
          '语音问诊',
          '预约上门',
          '图文问诊'
        ],
        choosePhoneStartTime: false,
        choosePhoneEndTime: false,
        chooseHomeStartTime: false,
        chooseHomeEndTime: false,
        startPhoneTime: [
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
        ],
        endPhoneTime: [
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
        ],
        startHomeTime: [
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
        ],
        endHomeTime: [
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
          '00:00',
        ],
        tempPhoneStartTime: 0,
        tempPhoneEndTime: 0,
        tempHomeStartTime: 0,
        tempHomeEndTime: 0,
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
        homeTimeSlotTable: [
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
        phonePrice: 10,
        homePrice: 20,
        graphicPrice: 5,
        phoneServiceId: '',
        homeServiceId: '',
      };
    },
    watch: {
      'phonePrice': {
        handler() {
          if (this.phonePrice > 200) {
            this.phonePrice = 200
          }
        }
      },
      'homePrice': {
        handler() {
          if (this.homePrice > 200) {
            this.homePrice = 200
          }
        }
      },
      'graphicPrice': {
        handler() {
          if (this.graphicPrice > 200) {
            this.graphicPrice = 200
          }
        }
      },
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
      setPhoneStartTime(dateIndex) {
        this.choosePhoneStartTime = false
        console.log(this.currentDate)
        this.tempPhoneStartTime = Number(this.startPhoneTime[dateIndex].substring(0, 2))
        var tempDate = new Date(this.year, this.month - 1, this.currentDate, this.tempPhoneStartTime)
        console.log(this.tempPhoneStartTime)
        console.log(tempDate)
      },
      setPhoneEndTime(dateIndex) {
        this.choosePhoneEndTime = false
        console.log(this.currentDate)
        this.tempPhoneEndTime = Number(this.endPhoneTime[dateIndex].substring(0, 2))
        var tempDate = new Date(this.year, this.month - 1, this.currentDate, this.tempPhoneEndTime)
        console.log(this.tempPhoneEndTime)
        console.log(tempDate)
        this.phoneTimeSlotTable[dateIndex] = []
        for (var i = 0; i < this.tempPhoneEndTime - this.tempPhoneStartTime; i++) {
          this.phoneTimeSlotTable[dateIndex][i] = (this.tempPhoneStartTime + i) + ':00 —— ' + (this.tempPhoneStartTime + i + 1) + ':00'
        }
        console.log(this.phoneTimeSlotTable)
      },
      setHomeStartTime(dateIndex) {
        this.chooseHomeStartTime = false
        console.log(this.currentDate)
        this.tempHomeStartTime = Number(this.startHomeTime[dateIndex].substring(0, 2))
        var tempDate = new Date(this.year, this.month - 1, this.currentDate, this.tempHomeStartTime)
        console.log(this.tempHomeStartTime)
        console.log(tempDate)
      },
      setHomeEndTime(dateIndex) {
        this.chooseHomeEndTime = false
        console.log(this.currentDate)
        this.tempPhoneEndTime = Number(this.endHomeTime[dateIndex].substring(0, 2))
        var tempDate = new Date(this.year, this.month - 1, this.currentDate, this.tempPhoneEndTime)
        console.log(this.tempPhoneEndTime)
        console.log(tempDate)
        this.homeTimeSlotTable[dateIndex] = []
        for (var i = 0; i < this.tempPhoneEndTime - this.tempHomeStartTime; i++) {
          this.homeTimeSlotTable[dateIndex][i] = (this.tempHomeStartTime + i) + ':00 —— ' + (this.tempHomeStartTime + i + 1) + ':00'
        }
        console.log(this.homeTimeSlotTable)
      },
      deletePhoneTimeSlot(index, dateIndex) {
        console.log('index ' + index)
        console.log('dateIndex ' + dateIndex)
        this.phoneTimeSlotTable[dateIndex].splice(index, 1)
        console.log('phoneTimeSlotTable[dateIndex] ' + this.phoneTimeSlotTable[dateIndex])
        // 刷新
        if (this.activePhoneTime == 0) {
          this.activePhoneTime = 1
        } else {
          this.activePhoneTime = 0
        }
        this.activePhoneTime = dateIndex
      },
      deleteHomeTimeSlot(index, dateIndex) {
        console.log('index ' + index)
        console.log('dateIndex ' + dateIndex)
        this.homeTimeSlotTable[dateIndex].splice(index, 1)
        console.log('homeTimeSlotTable[dateIndex] ' + this.homeTimeSlotTable[dateIndex])
        if (this.activeHomeTime == 0) {
          this.activeHomeTime = 1
        } else {
          this.activeHomeTime = 0
        }
        this.activeHomeTime = dateIndex
      },
      savePhoneTimeSlot(dateIndex) {
        console.log(this.phoneTimeSlotTable[dateIndex])
        console.log(this.phoneServiceId)
        if(this.phoneServiceId!=''){
          var params = {
            serviceId: this.phoneServiceId
          }
          allService.deleteTimeslotByServiceId(params, (isOk, data) => {
            if (isOk) {
              var params = {
                serviceId: this.phoneServiceId
              }
              allService.deleteServiceByServiceId(params, (isOk, data) => {
                if (isOk) {
                  var params = {
                    doctorId:LOCWIN.Cache.get('userInfo').doctorId,
                    price: this.phonePrice,
                    serviceName: this.serviceName[this.activeService]
                  }
                  allService.addService(params, (isOk, data) => {
                    if (isOk) {
                      var service = data.data
                      var time =this.phoneTimeSlotTable[dateIndex].length
                      console.log(time)
                      for (var i = 0; i < time; i++) {
                        console.log(time)
                        var str = this.phoneTimeSlotTable[dateIndex][i]; //要截取的字符串
                        var tempIndex = str.indexOf(":");
                        var result = str.slice(0,tempIndex);
                        let tempStartDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + Number(result) + ':00:00'
                        let tempEndDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + (Number(result) + 1) + ':00:00'
                        console.log(tempStartDate)
                        console.log(tempEndDate)
                        var params = {
                          doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                          serviceId: service.serviceId,
                          startTime: tempStartDate,
                          endTime: tempEndDate,
                          serviceType: this.activeService,
                        }
                        allService.addTimeslot(params, (isOk, data) => {
                          if (isOk) {
                            this.$dialog.alert({
                              message: '保存成功'
                            }).then(() => {
                              // on close
                              this.getPhoneTimeslot()
                            });
                          }
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        }else {
          var params = {
            doctorId:LOCWIN.Cache.get('userInfo').doctorId,
            price: this.phonePrice,
            serviceName: this.serviceName[this.activeService]
          }
          allService.addService(params, (isOk, data) => {
            if (isOk) {
              var service = data.data
              var time =this.phoneTimeSlotTable[dateIndex].length
              console.log(time)
              for (var i = 0; i < time; i++) {
                console.log(time)
                var str = this.phoneTimeSlotTable[dateIndex][i]; //要截取的字符串
                var tempIndex = str.indexOf(":");
                var result = str.slice(0,tempIndex);
                let tempStartDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + Number(result) + ':00:00'
                let tempEndDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + (Number(result) + 1) + ':00:00'
                console.log(tempStartDate)
                console.log(tempEndDate)
                var params = {
                  doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                  serviceId: service.serviceId,
                  startTime: tempStartDate,
                  endTime: tempEndDate,
                  serviceType: this.activeService,
                }
                allService.addTimeslot(params, (isOk, data) => {
                  if (isOk) {
                    this.$dialog.alert({
                      message: '保存成功'
                    }).then(() => {
                      // on close
                      this.getPhoneTimeslot()
                    });
                  }
                })
              }
            }
          })
        }
      },
      saveHomeTimeSlot(dateIndex) {
        console.log(this.homeTimeSlotTable[dateIndex])
        console.log(this.homeServiceId)
        if(this.homeServiceId!=''){
          var params = {
            serviceId: this.homeServiceId
          }
          allService.deleteServiceByServiceId(params, (isOk, data) => {
            if (isOk) {
              var params = {
                serviceId: this.homeServiceId
              }
              allService.deleteTimeslotByServiceId(params, (isOk, data) => {
                if (isOk) {
                  var params = {
                    doctorId:LOCWIN.Cache.get('userInfo').doctorId,
                    price: this.homePrice,
                    serviceName: this.serviceName[this.activeService]
                  }
                  allService.addService(params, (isOk, data) => {
                    if (isOk) {
                      var service = data.data
                      var time =this.homeTimeSlotTable[dateIndex].length
                      console.log(time)
                      for (var i = 0; i < time; i++) {
                        console.log(time)
                        var str = this.homeTimeSlotTable[dateIndex][i]; //要截取的字符串
                        var tempIndex = str.indexOf(":");
                        var result = str.slice(0,tempIndex);
                        let tempStartDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + Number(result) + ':00:00'
                        let tempEndDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + (Number(result)+ 1) + ':00:00'
                        console.log(tempStartDate)
                        console.log(tempEndDate)
                        var params = {
                          doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                          serviceId: service.serviceId,
                          startTime: tempStartDate,
                          endTime: tempEndDate,
                          serviceType: this.activeService,
                        }
                        allService.addTimeslot(params, (isOk, data) => {
                          if (isOk) {
                            this.$dialog.alert({
                              message: '保存成功'
                            }).then(() => {
                              // on close
                              this.getHomeTimeslot()
                            });
                          }
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        }else {
          var params = {
            doctorId:LOCWIN.Cache.get('userInfo').doctorId,
            price: this.homePrice,
            serviceName: this.serviceName[this.activeService]
          }
          allService.addService(params, (isOk, data) => {
            if (isOk) {
              var service = data.data
              var time =this.homeTimeSlotTable[dateIndex].length
              console.log(time)
              for (var i = 0; i < time; i++) {
                console.log(time)
                var str = this.homeTimeSlotTable[dateIndex][i]; //要截取的字符串
                var tempIndex = str.indexOf(":");
                var result = str.slice(0,tempIndex);
                let tempStartDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + Number(result) + ':00:00'
                let tempEndDate = this.year + '-' + this.month + '-' + this.dateTable[dateIndex] + ' ' + (Number(result)+ 1) + ':00:00'
                console.log(tempStartDate)
                console.log(tempEndDate)
                var params = {
                  doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                  serviceId: service.serviceId,
                  startTime: tempStartDate,
                  endTime: tempEndDate,
                  serviceType: this.activeService,
                }
                allService.addTimeslot(params, (isOk, data) => {
                  if (isOk) {
                    this.$dialog.alert({
                      message: '保存成功'
                    }).then(() => {
                      // on close
                      this.getHomeTimeslot()
                    });
                  }
                })
              }
            }
          })
        }
      },
      saveGraphicPrice() {
        var params = {
          doctorId:LOCWIN.Cache.get('userInfo').doctorId,
          price: this.graphicPrice,
          serviceName: this.serviceName[this.activeService]
        }
        allService.addService(params, (isOk, data) => {
          if (isOk) {
            var service = data.data
            console.log(service)
            this.$toast.success('保存成功')
          }
        })
      },
      getPhoneTimeslot() {
        this.phoneTimeSlotTable=[[], [], [], [], [], [], []];
        var params = {
          doctorId: LOCWIN.Cache.get('userInfo').doctorId,
          serviceType: 0,
        }
        allService.findAllByDoctorIdAndServiceType(params, (isOk, data) => {
          if (isOk) {
            let tempTimeTable = data.data
            for (let i = 0; i < tempTimeTable.length; i++) {
              let tableStartTime = new Date(tempTimeTable[i].startTime.substring(0, 4), tempTimeTable[i].startTime.substring(5, 7) - 1, tempTimeTable[i].startTime.substring(8, 10), tempTimeTable[i].startTime.substring(11, 13))
              console.log(tableStartTime)
              if (tableStartTime.getTime() >= new Date().getTime()) {
                let tempHour = tableStartTime.getHours() + ':00 —— ' + (tableStartTime.getHours() + 1) + ':00'
                console.log(tempHour)
                let tempTime = Math.ceil((new Date(tableStartTime.getFullYear(),tableStartTime.getMonth(),tableStartTime.getDate(),0).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))
                console.log(tempTime)
                // this.phoneTimeSlotTable[(tableStartTime.getTime()-new Date().getTime())/(24 * 60 * 60 * 1000)].push((tableStartTime.getHours()+ ':00 —— ' + (tableStartTime.getHours()+1) + ':00'))
                this.phoneTimeSlotTable[tempTime].push(tempHour)
              }
              this.phoneServiceId = tempTimeTable[i].serviceId
            }
            console.log('phoneTimeSlotTable' + this.phoneTimeSlotTable)
          }
        })
      }
      ,
      getHomeTimeslot() {
        this.homeTimeSlotTable=[[], [], [], [], [], [], []];
        var params = {
          doctorId: LOCWIN.Cache.get('userInfo').doctorId,
          serviceType: 1,
        }
        allService.findAllByDoctorIdAndServiceType(params, (isOk, data) => {
          if (isOk) {
            let tempTimeTable = data.data
            for (let i = 0; i < tempTimeTable.length; i++) {
              let tableStartTime = new Date(tempTimeTable[i].startTime.substring(0, 4), tempTimeTable[i].startTime.substring(5, 7) - 1, tempTimeTable[i].startTime.substring(8, 10), tempTimeTable[i].startTime.substring(11, 13))
              console.log(tableStartTime)
              if (tableStartTime.getTime() >= new Date().getTime()) {
                let tempHour = tableStartTime.getHours() + ':00 —— ' + (tableStartTime.getHours() + 1) + ':00'
                console.log(tempHour)
                let tempTime = Math.ceil((new Date(tableStartTime.getFullYear(),tableStartTime.getMonth(),tableStartTime.getDate(),0).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))
                console.log(tempTime)
                // this.phoneTimeSlotTable[(tableStartTime.getTime()-new Date().getTime())/(24 * 60 * 60 * 1000)].push((tableStartTime.getHours()+ ':00 —— ' + (tableStartTime.getHours()+1) + ':00'))
                this.homeTimeSlotTable[tempTime].push(tempHour)
              }
              this.homeServiceId = tempTimeTable[i].serviceId
            }
            console.log('homeTimeSlotTable' + this.homeTimeSlotTable)
          }
        })
      }
    },
  };
</script>

<style>

</style>
