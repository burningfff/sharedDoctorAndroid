<template>
  <div>
    <van-nav-bar fixed>
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        我的钱包
      </span>
    </van-nav-bar>
    <div style="margin-top: 46px;text-align: left;height: 44px">
      <van-cell title="余额" :value="balance" size="large" />
      <van-button style="background-color: #1989fa;color: #FFFFFF; margin-top:25px;border-radius: 6px;width: 90%;margin-left: 5%"
                  @click="showDialog=true">
        提现
      </van-button>
    </div>
    <div>
      <van-dialog
        v-model="showDialog"
        title="提现"
        show-cancel-button
        @confirm="updateBalance"
        @cancel="showDialog=false">
        <van-field
          v-model="value"
          label="提现金额"
          placeholder="请输入提现金额"
        />
      </van-dialog>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {
    },

    data() {
      return {
        doctorId: LOCWIN.Cache.get("userInfo").doctorId,
        balance:'￥'+LOCWIN.Cache.get("userInfo").balance.balance,
        showDialog:false,
        value:'',
      };
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      updateBalance(){
        let tempBalance=LOCWIN.Cache.get("userInfo").balance.balance-this.value
        if(this.value>LOCWIN.Cache.get("userInfo").balance.balance)
        {
          this.$dialog.alert({
            message: '提现金额不可超出余额'
          }).then(() => {
            // on close
            this.value=0
          });
        }else{
          var params = {
            balanceId: LOCWIN.Cache.get('userInfo').balanceId,
            balance:tempBalance
          }
          allService.updateBalanceByBalanceId(params, (isOk, data) => {
            if (isOk) {
              var params = {
                doctorId: LOCWIN.Cache.get('userInfo').doctorId,
              }
              allService.findDoctorByDoctorId(params, (isOk, data) => {
                if(isOk){
                  LOCWIN.Cache.set('userInfo',data.data)
                  this.balance='￥'+LOCWIN.Cache.get("userInfo").balance.balance
                }
              })
            }
          })
        }
      }
    },
  };
</script>

<style>

</style>
