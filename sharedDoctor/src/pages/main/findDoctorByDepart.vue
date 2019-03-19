<template>
  <div>
    <van-nav-bar
      fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        {{this.departName}}
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px">
      <van-field
        v-model="value"
        placeholder="疾病、医院、科室、医生名"
        center
        border
        left-icon="search"
        style="border:1px solid #e8e8e8;border-radius: 6px;background-color:#f0f2f5;margin-top: 10px;margin-bottom: 10px"
        @click="onClickSearchBtn"
      />
      <div style="width: 100%">
        <van-row style="height: 10px;background-color: #f0f2f5"></van-row>
      </div>
      <van-collapse v-model="activeName" accordion style="margin-bottom: 5px">
        <!--<van-row>-->
        <van-row>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="1">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="2">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="3">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="有赞微商城" name="4">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
          </van-col>
        </van-row>
      </van-collapse>
      <div class="doctor">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-card
            v-for="doctor in doctorTable"
            :key="doctor.doctorId"
            :desc="doctor.introduction"
            :title="doctor.doctorName+doctor.doctorId"
            thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
            style="text-align: left "
          >
            <div slot="footer">
              <van-button size="mini">按钮</van-button>
              <van-button size="mini">按钮</van-button>
            </div>
            <div slot="tags">
              <van-button size="mini">按钮</van-button>
              <van-button size="mini">按钮</van-button>
            </div>
          </van-card>
          <!--<van-row>-->
          <!--<van-col span="24"-->
          <!--v-for="doctor in doctorTable"-->
          <!--key="doctor.doctorId"-->
          <!--title="doctor.doctorName">-->
          <!---->
          <!--</van-col>-->
          <!--</van-row>-->
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'

  var allService = new AllService()

  export default {
    created() {
      this.initpage()
    },
    data() {
      return {
        activeName: '',
        userName: '',
        password: '',
        departId: LOCWIN.Cache.get('departId'),
        departName: LOCWIN.Cache.get('departName'),
        doctorTable: [],
        doctorList: [],
        loading: false,
        finished: false,
      };
    },
    methods: {
      initpage() {
        this.getDoctorTable()
      },
      login() {
        this.$toast.success("登录成功！")
        this.$router.push('/testdemo')
        // var params = {
        //   userName: this.userName,
        //   password: this.password
        // }
        // allService.signIn(params, (isOk, data) => {
        //   if (isOk) {
        //     if (data.status == "false") {
        //       console.log(data.data);
        //       this.$toast.fail(data.data);
        //     } else {
        //       console.log(data.data);
        //       // LOCWIN.Cache.set("userName", params.userName);
        //       // LOCWIN.Cache.set("userInfo", data.data);
        //       // LOCWIN.Cache.set("userPass", params.password);
        //       if (data.data === 'root') {
        //         this.$toast.success("登录成功！")
        //         // this.$router.push('/SU/index');
        //       }
        //       if ("patientId" in data.data) {
        //         this.$toast.success("登录成功！")
        //         this.$router.push('/testdemo')
        //         // this.$router.push('/student/index');
        //       }
        //       if ("doctorId" in data.data) {
        //         this.$toast.success("登录成功！")
        //         // this.$router.push('/teacher/index');
        //       }
        //       this.$toast.success("登录成功！");
        //     }
        //   } else {
        //     this.$toast.fail("登录失败！")
        //   }
        // })
      },
      getDoctorTable() {
        var params = {
          departId: this.departId
        }
        allService.findAllDoctorByDepartId(params, (isOk, data) => {
          if (isOk) {
            this.doctorTable = data.data
            console.log(this.doctorTable)

          }
        })
      },
      onClickLeft() {
        this.$toast('返回');
        this.$router.push('/findDoctor')
      },
      onClickSearchBtn() {
        this.$router.push('/search');
      },
      onLoad() {
        var k = 1;
        // 异步更新数据
        setTimeout(() => {
          for (let i = 1 * k; i <= 10 * k; i++) {
            this.doctorList.push(this.doctorTable[i - 1]);
          }
          k++
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.doctorList.length >= this.doctorTable.length) {
            this.finished = true;
          }
        }, 500);
      },
    },
  };
</script>

<style>

</style>
