<template>
  <div style="margin-top:20px;margin-bottom:20px;margin-left: 6%;width: 88%">
    <div class="header">
      <van-row>
        <van-col>
          <span style="font-size: 24px;">消息</span>
        </van-col>
      </van-row>
    </div>
    <div class="content" style="margin-top: 20px">
      <div
        v-if="this.patientId!=''">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="graphicOnLoad"
        >
          <div v-for="order in chatTable"
               :key="order.orderId">
            <div @click="orderDetail(order)">
              <van-row style="border-bottom:1px solid #ebedf0;padding: 10px 0px;text-align: left">
                <img style="height: 24px;width:24px;border-radius: 100%;"
                     :src="order.chat.doctor.imageUrl"/>
                <span style="margin-left: 5px;">
                    {{order.chat.doctor.doctorName}}  {{order.chat.doctor.depart.departName}}
                  </span>
                <van-tag style="float: right" v-if="order.orderState==0" round>待完成</van-tag>
                <van-tag style="float: right" v-if="order.orderState==1" type="success" round>已完成</van-tag>
              </van-row>
              <van-row style="padding: 10px 0px;text-align: left">
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
    </div>
  </div>
</template>
<script>
  import AllService from '../services/allservice.js'

  var allService = new AllService()

  export default {
    components: {},
    created() {
      this.patientId = LOCWIN.Cache.get("userInfo").patientId
      this.getChat()
    },
    data() {
      return {
        patientId: '',
        chatTable: [],
        graphicOrderList: [],
        loading: false,
        finished: false,
      };
    },
    methods: {
      graphicOnLoad() {
        var k = 1;
        // 异步更新数据
        setTimeout(() => {
          for (let i = 1 * k; i <= 10 * k; i++) {
            this.graphicOrderList.push(this.chatTable[i - 1]);
          }
          k++
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.graphicOrderList.length >= this.chatTable.length) {
            this.finished = true;
          }
        }, 500);
      },
      orderDetail(order) {
        LOCWIN.Cache.set('toUserInfo', order.chat.doctor)
        LOCWIN.Cache.set('chatId',order.chatId)
        console.log('toUserInfo:')
        console.log(LOCWIN.Cache.get('toUserInfo'))
        this.$router.push('/onlineConsult')
      },
      getChat() {
        var params = {
          patientId: this.patientId,
        }
        allService.findAllOrderByPatientId(params, (isOk, data) => {
          if (isOk) {
            let tempOrderTable = data.data;
            console.log("tempOrderTable")
            console.log(tempOrderTable)
            for (let i = 0; i < tempOrderTable.length; i++) {
              if (tempOrderTable[i].timeslot == null) {
                this.chatTable.push(tempOrderTable[i])
              }
            }
            console.log("this.chatTable")
            console.log(this.chatTable)
          }
        })
      },
      go(index) {
        this.$router.push(index);
      },

    }
  };
</script>

<style>
  img {
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
  }
</style>
