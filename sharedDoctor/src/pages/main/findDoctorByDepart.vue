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
        v-model="searchKey"
        placeholder="疾病、医院、科室、医生名"
        center
        border
        left-icon="search"
        style="border:1px solid #e8e8e8;border-radius: 6px;background-color:#f9f3f0;margin-top: 10px;margin-bottom: 10px"
        @click="onClickSearchBtn"
      />
    </div>

    <div style="width: 100%">
      <van-row style="height: 10px;background-color: #f9f3f0"></van-row>
    </div>

    <div class="menu" v-clickoutside="handleClose">
      <van-collapse v-model="activeName" accordion>
        <van-row style="align-content: center; ">
          <van-col span="12">
            <van-collapse-item :title="sort" name="1">
              <div slot="title">{{sort|ellipsis}}</div>
            </van-collapse-item>
          </van-col>
          <van-col span="12">
            <van-collapse-item :title="city" name="2">
              <div slot="title">{{city|ellipsis}}</div>
            </van-collapse-item>
          </van-col>
          <!--<van-col span="6">-->
            <!--<van-collapse-item :title="illness" name="3">-->
              <!--<div slot="title">{{illness|ellipsis}}</div>-->
            <!--</van-collapse-item>-->
          <!--</van-col>-->
          <!--<van-col span="6">-->
            <!--<van-collapse-item title="筛选" name="4"/>-->
          <!--</van-col>-->
        </van-row>

      </van-collapse>
      <div class="sortDoctor">
        <transition name="my-trans">
          <div class="dropdownSort" v-show="showSort">
            <van-cell-group>
              <van-button size="large" @click="clickSort(1)">综合排序</van-button>
              <van-button size="large" @click="clickSort(2)">星级评分</van-button>
              <!--<van-button size="large" @click="clickSort(3)">价格从高到低</van-button>-->
              <!--<van-button size="large" @click="clickSort(4)">价格从低到高</van-button>-->
            </van-cell-group>
          </div>
          </van-panel>
        </transition>
      </div>
      <div class="chooseCity">
        <transition name="my-trans">
          <div class="dropdownCity" v-show="showCity">
            <v-distpicker type="mobile" @selected="onSelected" hide-area></v-distpicker>
          </div>
        </transition>
      </div>
      <!--<div class="chooseIllness">-->
        <!--<transition name="my-trans">-->
          <!--<div class="dropdownIllness" v-show="showIllness"-->
               <!--style="margin: 5px 5px;text-align:left">-->
            <!--<van-row>-->
              <!--<van-col>-->
                <!--<van-button-->
                  <!--v-for="(doctor,index) in doctorTable"-->
                  <!--:key="doctor.doctorId"-->
                  <!--v-if="index==index_illness"-->
                  <!--style="align-items: flex-start;margin: 3px 3px;-->
                  <!--background-color: #35a95d;color: white;border-radius: 6px;"-->
                  <!--size="small"-->
                  <!--@click="clickIllness(index)"-->
                <!--&gt;-->
                  <!--{{doctor.doctorName}}-->
                <!--</van-button>-->
                <!--<van-button-->
                  <!--v-else-->
                  <!--style="align-items: flex-start;margin: 2px 3px;-->
                  <!--background-color: #e4e5e8;color: #7d7e80;border-radius: 6px;"-->
                  <!--size="small"-->
                  <!--@click="clickIllness(index)"-->
                <!--&gt;-->
                  <!--{{doctor.doctorName}}-->
                <!--</van-button>-->
              <!--</van-col>-->
            <!--</van-row>-->
          <!--</div>-->
        <!--</transition>-->
      <!--</div>-->
    </div>
    <div class="doctor" style="margin-top: 10px">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="doctor in doctorTable"
          v-if="doctor.qualification.isConfirmed==1"
          :key="doctor.doctorId"
          style="text-align: left"
        >
          <div slot="thumb" @click="doctorInfo(doctor.doctorId)">
            <img :src="doctor.imageUrl" />
          </div>
          <div slot="title" @click="doctorInfo(doctor.doctorId)">
            <van-row>
              <van-col>
                <span style="font-size: 16px;font-weight: bolder">
                  {{doctor.doctorName}}
                </span>
                <span>
                  {{doctor.qualification.position.positionName}}
                </span>
              </van-col>
            </van-row>
          </div>
          <div slot="desc" style="margin-top: 5px" @click="doctorInfo(doctor.doctorId)">
            <van-row style="margin-top: 5px">
              {{doctor.depart.departName}} {{doctor.qualification.hospital.hospitalName}}
            </van-row>
            <van-row style="margin-top: 5px">
              <span>
              擅长：{{doctor.introduction|ellipsis14}}
            </span>
            </van-row>
            <van-row style="margin-top: 5px">
              <van-col span="2">
                <van-rate v-model="doctor.evaluation" allow-half
                          void-icon="star"
                          void-color="#eee"
                          readonly
                          :count="1"
                          :size="10">
                </van-rate>
              </van-col>
              <van-col span="3">
                <span style="color:#fdd11e;">
                  {{doctor.evaluation}}
                </span>
              </van-col>
              <van-col span="8" style="text-align: left">
                <span>{{doctor.replyTimes}}次回复</span>
              </van-col>
            </van-row>
          </div>
          <div slot="footer">
            <van-button round size="small" @click="graphicConsult(doctor.doctorId)">问医生</van-button>
          </div>
        </van-card>
      </van-list>
    </div>

  </div>
</template>
<script>
  import AllService from '../../services/allservice.js'
  import AreaList from '../../common/AreaList.js'
  import clickoutside from '../../utils/clickoutside.js'

  var allService = new AllService()

  export default {
    created() {
      this.initpage()
    },
    data() {
      return {
        index_illness: '0',
        activeName: '',
        sort: '综合排序',
        city: '全国',
        illness: '常见疾病',
        userName: '',
        password: '',
        departId: LOCWIN.Cache.get('departId'),
        departName: LOCWIN.Cache.get('departName'),
        doctorTable: [],
        doctorList: [],
        loading: false,
        finished: false,
        showSort: false,
        showCity: false,
        showIllness: false,
        searchKey: '',
        areaList: AreaList,

      };
    },
    filters: {
      ellipsis(value) {
        if (!value) return ''
        if (value.length > 6) {
          return value.slice(0, 6) + '..'
        }
        return value
      },
      ellipsis14(value) {
        if (!value) return ''
        if (value.length > 14) {
          return value.slice(0, 14) + '..'
        }
        return value
      },
    },
    watch: {
      activeName(val) {
        console.log("this.activeName" + this.activeName)
        if (this.activeName == 1) {
          this.showCity = false;
          this.showIllness = false;
          this.showSort = true;
        } else if (this.activeName == 2) {
          // this.handleClose()
          this.showSort = false;
          this.showIllness = false;
          this.showCity = true;
        } else if (this.activeName == 3) {
          // this.handleClose()
          this.showSort = false;
          this.showCity = false;
          this.showIllness = true;
        } else {
          this.handleClose();
        }

      }
    },
    methods: {
      initpage() {
        this.getDoctorTable()
      },
      doctorInfo(doctorId) {
        var params = {
          doctorId: doctorId
        }
        allService.findDoctorByDoctorId(params, (isOk, data) => {
          if (isOk) {
            LOCWIN.Cache.set('doctorInfo',data.data)
            this.$router.push('/doctorDetail')
            console.log(doctorId)
          }
        })
      },
      graphicConsult(doctorId){
        var params = {
          doctorId: doctorId
        }
        allService.findDoctorByDoctorId(params, (isOk, data) => {
          if (isOk) {
            LOCWIN.Cache.set('doctorInfo',data.data)
            this.$router.push('/graphicConsult')
            console.log(doctorId)
          }
        })
      },
      clickSort(val) {
        if (val == 1) {
          this.sort = "综合排序"
          var t;
          for(var i=0;i<this.doctorTable.length;i++){
            for(var j=i+1;j<this.doctorTable.length;j++){
              if((this.doctorTable[i].evaluation+Math.log(this.doctorTable[i].replyTimes))<(this.doctorTable[j].evaluation+Math.log(this.doctorTable[j].replyTimes)))              {
                t=this.doctorTable[i];
                this.doctorTable[i]=this.doctorTable[j];
                this.doctorTable[j]=t;
              }
            }
          }
          console.log(this.doctorTable)
        } else if (val == 2) {
          this.sort = "星级评分"
          var t;
          for(var i=0;i<this.doctorTable.length;i++){
            for(j=i+1;j<this.doctorTable.length;j++){
              if(this.doctorTable[i].evaluation<this.doctorTable[j].evaluation){
                t=this.doctorTable[i];
                this.doctorTable[i]=this.doctorTable[j];
                this.doctorTable[j]=t;
              }
            }
          }
          console.log(this.doctorTable)
        }
        // } else if (val == 3) {
        //   this.sort = "价格从高到低"
        // } else if (val == 4) {
        //   this.sort = "价格从低到高"
        // }
        this.handleClose()
      },
      // clickIllness(val) {
      //   this.index_illness = val
      //   this.illness = this.doctorTable[val].doctorName
      //   console.log("index:" + val)
      //   this.handleClose()
      // },
      handleClose() {
        this.showSort = false;
        this.showCity = false;
        this.showIllness = false;
        this.activeName = ''
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
        LOCWIN.Cache.remove('departId')
        LOCWIN.Cache.remove('departName')
        this.$router.go(-1)
      },
      onClickSearchBtn() {
        this.$router.push('/findDoctorByKeyWord');
      },
      onSelected(location) {
        var params = {
          departId: this.departId
        }
        allService.findAllDoctorByDepartId(params, (isOk, data) => {
          if (isOk) {
            this.doctorTable = data.data
            console.log(this.doctorTable)
            this.$toast(location.province.value + ' | ' + location.city.value);
            this.city = location.city.value;
            console.log(location)
            this.showCity = false;
            this.activeName = ''
            let tempLength=this.doctorTable.length
            let tempDoctorTable=[]
            for (let i=0;i<tempLength;i++) {
              console.log(this.doctorTable[i].location)
              if(this.doctorTable[i].location.city==this.city&&this.doctorTable[i].location.city!=null) {
                tempDoctorTable.push(this.doctorTable[i])
              }
            }
            this.doctorTable=tempDoctorTable
            console.log(this.doctorTable)
          }
        })
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
    directives: {
      clickoutside,
    },
  };
</script>
<style lang="less" scoped>
  /*作用是取消数据绑定时出现的代码闪烁*/
  [v-cloak] {
    display: none;
  }

  table {
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
    /*隐藏表格中空单元格上的边框和背景*/
    empty-cells: show;
  }

  th,
  td {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }

  th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }

  /*.menu {*/
  /*border: 1px solid #ccc;*/
  /*}*/
</style>

<style>
  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .2s ease-out;
  }

  .my-trans-enter {
    transform: translateY(-100px);
    opacity: 0;
  }

  .my-trans-leave-active {
    transform: translateY(100px);
  }
</style>

<style>
  .van-collapse-item .van-cell {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 10px 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #323233;
    font-size: 14px;
    overflow: hidden;
    align-content: center;
  }

  .van-collapse-item__content {
    color: #969799;
    padding: 0px;
    font-size: 13px;
    line-height: 1.5;
    background-color: #fff;
  }
</style>
