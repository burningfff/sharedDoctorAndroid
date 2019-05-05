<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        我的问诊
      </span>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;height: 44px">
      <van-tabs v-model="activeService" animated>
        <!--语音问诊-->
        <van-tab :title="serviceName[0]"
                 style="margin-left: 4vw;width: 92vw;margin-right: 4vw">
          <div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="phoneOnLoad"
            >
              <div v-for="order in orderTable[0]"
                   :key="order.orderId">
                <div @click="orderDetail(order)">
                  <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
                    <img style="height: 24px;width:24px;border-radius: 100%;"
                         :src="myImage"/>
                    <span style="margin-left: 5px;">
                    {{order.timeslot.doctor.doctorName}}  {{order.timeslot.doctor.depart.departName}}
                  </span>
                  </van-row>
                  <van-row style="padding: 10px 0px">
                  <span
                    v-if="order.chat.chatDetails[0].chatDetail!=null">
                    {{order.chat.chatDetails[0].chatDetail}}
                  </span>
                  </van-row>
                  <van-row style="border-bottom:3px solid #ebedf0;"></van-row>
                </div>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab :title="serviceName[1]" style="margin-left: 4vw;width: 92vw;margin-right: 4vw">
          <div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="homeOnLoad"
            >
              <div v-for="order in orderTable[1]"
                   :key="order.orderId">
                <div @click="orderDetail(order)">
                  <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
                    <img style="height: 24px;width:24px;border-radius: 100%;"
                         :src="myImage"/>
                    <span style="margin-left: 5px;">
                    {{order.timeslot.doctor.doctorName}}  {{order.timeslot.doctor.depart.departName}}
                  </span>
                  </van-row>
                  <van-row style="padding: 10px 0px">
                  <span
                    v-if="order.chat.chatDetails[0].chatDetail!=null">
                    {{order.chat.chatDetails[0].chatDetail}}
                  </span>
                  </van-row>
                  <van-row style="border-bottom:3px solid #ebedf0;"></van-row>
                </div>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab :title="serviceName[2]" style="margin-left: 4vw;width: 92vw;margin-right: 4vw">
          <div>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="graphicOnLoad"
            >
              <div v-for="order in orderTable[2]"
                   :key="order.orderId">
                <div @click="orderDetail(order)">
                  <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px">
                    <img style="height: 24px;width:24px;border-radius: 100%;"
                         :src="myImage"/>
                    <span style="margin-left: 5px;">
                    {{order.chat.doctor.doctorName}}  {{order.chat.doctor.depart.departName}}
                  </span>
                  </van-row>
                  <van-row style="padding: 10px 0px">
                  <span
                    v-if="order.chat.chatDetails[0].chatDetail!=null">
                    {{order.chat.chatDetails[0].chatDetail}}
                  </span>
                  </van-row>
                  <van-row style="border-bottom:3px solid #ebedf0;"></van-row>
                </div>
              </div>
            </van-list>
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
      this.getOrder()
    },

    data() {
      return {
        patientId: LOCWIN.Cache.get("userInfo").patientId,
        serviceName: [
          '语音问诊',
          '预约上门',
          '图文问诊'
        ],
        activeService: 0,
        orderTable: [[], [], []],
        phoneOrderList:[],
        homeOrderList:[],
        graphicOrderList:[],
        loading: false,
        finished: false,
        myImage: 'http://5b0988e595225.cdn.sohucs.com/images/20171227/73c20b0dab774591b5fa70f6d755dd5f.jpeg',

      };
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      orderDetail(order){
        LOCWIN.Cache.set('orderInfo',order)
        console.log('orderInfo:')
        console.log(LOCWIN.Cache.get('orderInfo'))
        this.$router.push('/patientOrderDetail')
      },
      getOrder() {
        var params = {
          patientId: this.patientId,
        }
        allService.findAllOrderByPatientId(params, (isOk, data) => {
          if (isOk) {
            let tempOrderTable = data.data;
            console.log("tempOrderTable")
            console.log(tempOrderTable)
            for (let i = 0; i < tempOrderTable.length; i++) {
              if(tempOrderTable[i].timeslot!=null){
                if (tempOrderTable[i].timeslot.serviceType == 0) {
                  this.orderTable[0].push(tempOrderTable[i])
                } else if (tempOrderTable[i].timeslot.serviceType == 1) {
                  this.orderTable[1].push(tempOrderTable[i])
                }
              } else {
                this.orderTable[2].push(tempOrderTable[i])
              }
            }
            console.log("this.orderTable")
            console.log(this.orderTable)
          }
        })
      },
      phoneOnLoad() {
        var k = 1;
        // 异步更新数据
        setTimeout(() => {
          for (let i = 1 * k; i <= 10 * k; i++) {
            this.phoneOrderList.push(this.orderTable[0][i - 1]);
          }
          k++
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.phoneOrderList.length >= this.orderTable[0].length) {
            this.finished = true;
          }
        }, 500);
      },
      homeOnLoad() {
        var k = 1;
        // 异步更新数据
        setTimeout(() => {
          for (let i = 1 * k; i <= 10 * k; i++) {
            this.homeOrderList.push(this.orderTable[1][i - 1]);
          }
          k++
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.homeOrderList.length >= this.orderTable[1].length) {
            this.finished = true;
          }
        }, 500);
      },
      graphicOnLoad() {
        var k = 1;
        // 异步更新数据
        setTimeout(() => {
          for (let i = 1 * k; i <= 10 * k; i++) {
            this.graphicOrderList.push(this.orderTable[2][i - 1]);
          }
          k++
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.graphicOrderList.length >= this.orderTable[2].length) {
            this.finished = true;
          }
        }, 500);
      },
    },
  };
</script>

<style>

</style>
