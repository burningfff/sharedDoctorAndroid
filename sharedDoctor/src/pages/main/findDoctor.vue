<template>
  <div>
    <van-nav-bar
      fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        问医生
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px">
      <van-field
        placeholder="疾病、医院、科室、医生名"
        center
        border
        left-icon="search"
        style="border:1px solid #e8e8e8;border-radius: 6px;background-color:#f5efec;margin-top: 10px;margin-bottom: 10px"
        @click="onClickSearchBtn"
      />
      <div style="width: 100%">
        <van-row style="height: 10px;background-color: #f5efec"></van-row>
      </div>
      <div class="depart">
        <van-row style="margin-top: 5px;margin-bottom: 5px">
          <van-col span="23">
            <span style="float: left;font-size: 18px;color: #7d7e80">常见科室</span>
          </van-col>
        </van-row>
        <van-row style="margin-top: 5px;margin-bottom: 5px;height: 60px;">
          <van-col style="width: 32%;background-color: #f5efec">
            <div style="text-align: center" @click="findDoctorByDepart(30,'骨科')">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/bone.png"/>
              </van-row>
              <van-row>
                <span>骨科</span>
              </van-row>
            </div>
          </van-col>
          <van-col style="margin-left:2%;margin-right: 2%;width: 32%;background-color: #f5efec">
            <div style="text-align: center" @click="findDoctorByDepart(2,'消化内科')">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/digestive.png"/>
              </van-row>
              <van-row>
                <span>消化内科</span>
              </van-row>
            </div>
          </van-col>
          <van-col style="width: 32%;background-color: #f5efec">
            <div style="text-align: center" @click="findDoctorByDepart(19,'耳鼻喉科')">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/ENT.png"/>
              </van-row>
              <van-row>
                <span>耳鼻喉科</span>
              </van-row>
            </div>
          </van-col>
        </van-row>
        <van-row style="height:2%;background-color: #FFFFFF">
        </van-row>
        <van-row style="margin-top: 5px;margin-bottom: 5px;height: 60px;">
          <van-col style="width: 32%;background-color: #f5efec">
            <div style="text-align: center" @click="findDoctorByDepart(8,'心血管内科')">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/heart.png"/>
              </van-row>
              <van-row>
                <span>心血管内科</span>
              </van-row>
            </div>
          </van-col>
          <van-col style="margin-left:2%;margin-right: 2%;width: 32%;background-color: #f5efec">
            <div style="text-align: center" @click="findDoctorByDepart(11,'儿科')">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/pediatrics.png"/>
              </van-row>
              <van-row>
                <span>儿科</span>
              </van-row>
            </div>
          </van-col>

          <van-col style="width: 32%;background-color: #f5efec">
            <div style="text-align: center" @click="findDoctorByDepart(20,'口腔科')">
              <van-row>
                <img
                  style="width: 50%"
                  src="../../assets/tooth.png"/>
              </van-row>
              <van-row>
                <span>口腔科</span>
              </van-row>
            </div>
          </van-col>
        </van-row>
      </div>
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
        userName: '',
        password: '',
        departId: '',
        departName: ''
      };
    },
    methods: {
      findDoctorByDepart(departId, departName) {
        // this.$toast.success("登录成功！")
        LOCWIN.Cache.set('departId', departId);
        LOCWIN.Cache.set('departName', departName);
        this.$router.push('/findDoctorByDepart')
      },
      go(index) {
        this.$router.push(index);
      },
      // findDepartByDepartId(departId){
      //   var params={
      //     departId: departId
      //   }
      //   allService.findDepartByDepartId(params, (isOk, data) => {
      //     if (isOk) {
      //       this.departName = data.data.departName
      //     }
      //   })
      // },
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickSearchBtn() {
        this.$router.push('/findDoctorByKeyWord');
      },
    },
  };
</script>

<style>

</style>
