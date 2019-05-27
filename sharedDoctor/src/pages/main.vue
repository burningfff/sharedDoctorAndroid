<template>
  <div>
    <header-bar class="header-bar"></header-bar>
    <div class="content" style="margin-left: 2%;width: 96%">
      <van-row>
        <van-col span="12">
          <div @click="go('/findDoctor')" style="text-align: center">
            <van-row>
              <img
                style="width: 90%"
                src="../assets/consult.png"/>
            </van-row>
            <!--<van-row style="margin-top: 2px;margin-bottom: 2px">-->
              <!--<span style="font-size: 18px;font-weight: bolder">问医生</span>-->
            <!--</van-row>-->
            <!--<van-row>-->
              <!--<span style="color: #414244;font-size: 13px">按科室找医生</span>-->
            <!--</van-row>-->
          </div>
        </van-col>
        <!--<van-col span="8">-->
          <!--<div @click="go('/graphicConsult')" style="text-align: center">-->
            <!--<van-row>-->
              <!--<img-->
                <!--style="width: 50%"-->
                <!--src="../assets/consult.png"/>-->
            <!--</van-row>-->
            <!--&lt;!&ndash;<van-row style="margin-top: 2px;margin-bottom: 2px">&ndash;&gt;-->
              <!--&lt;!&ndash;<span style="font-size: 18px;font-weight: bolder">预约上门</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</van-row>&ndash;&gt;-->
            <!--&lt;!&ndash;<van-row>&ndash;&gt;-->
              <!--&lt;!&ndash;<span style="color: #414244;font-size: 13px">医生上门诊治</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</van-row>&ndash;&gt;-->
          <!--</div>-->
        <!--</van-col>-->
        <van-col span="12">
          <div @click="go('/reportExplanation')" style="text-align: center">
            <van-row>
              <img
                style="width: 90%"
                src="../assets/inform.png"/>
            </van-row>
            <!--<van-row style="margin-top: 2px;margin-bottom: 2px">-->
              <!--<span style="font-size: 18px;font-weight: bolder;">报告解读</span>-->
            <!--</van-row>-->
            <!--<van-row>-->
              <!--<span style="color: #414244;font-size: 13px">在线解读报告</span>-->
            <!--</van-row>-->
          </div>
        </van-col>
      </van-row>
      <div style="margin-top: 20px;height: 200px">
        <van-swipe :autoplay="3000" @change="onChange">
          <van-swipe-item v-for="image in images" :key="image">
            <img style="height: 200px;width: 100%" :src="image" @click="swiperImgClick">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div style="margin-top: 24px">
        <van-row>
          <van-col>
            <span style="font-size: 18px;margin-left: 2vw;font-weight: bolder">优质医生推荐</span>
          </van-col>
        </van-row>
        <van-tabs v-model="active" sticky animated swipeable @change="getDoctorTable" @click="getDoctorTable">
          <van-tab title="骨科">
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
                    <img :src="doctor.imageUrl"/>
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
                    <van-button round size="small" @click="graphicConsult">问医生</van-button>
                  </div>
                </van-card>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="消化内科">
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
                    <img :src="doctor.imageUrl"/>
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
                    <van-button round size="small" @click="graphicConsult">问医生</van-button>
                  </div>
                </van-card>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="耳鼻喉科">
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
                    <img :src="doctor.imageUrl"/>
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
                    <van-button round size="small" @click="graphicConsult">问医生</van-button>
                  </div>
                </van-card>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="心血管内科">
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
                    <img :src="doctor.imageUrl"/>
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
                    <van-button round size="small" @click="graphicConsult">问医生</van-button>
                  </div>
                </van-card>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="儿科">
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
                    <img :src="doctor.imageUrl"/>
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
                    <van-button round size="small" @click="graphicConsult">问医生</van-button>
                  </div>
                </van-card>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="口腔科">
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
                    <img :src="doctor.imageUrl"/>
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
                    <van-button round size="small" @click="graphicConsult">问医生</van-button>
                  </div>
                </van-card>
              </van-list>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../components/Header.vue'
  import {ImagePreview} from 'vant';
  import AllService from '../services/allservice.js'

  var allService = new AllService()

  export default {
    components: {
      'header-bar': Header,
    },
    data() {
      return {
        images: [
          'http://img2.imgtn.bdimg.com/it/u=4091757403,1703254223&fm=200&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=176315858,4073761715&fm=200&gp=0.jpg',
        ],
        active: 0,
        doctorTable: [],
        doctorList: [],
        loading: false,
        finished: false,
      };
    },
    filters: {
      ellipsis(value) {
        if (!value) return ''
        if (value.length > 4) {
          return value.slice(0, 4) + '..'
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
    methods: {
      doctorInfo(doctorId) {
        var params = {
          doctorId: doctorId
        }
        allService.findDoctorByDoctorId(params, (isOk, data) => {
          if (isOk) {
            LOCWIN.Cache.set('doctorInfo', data.data)
          }
        })
        this.$router.push('/doctorDetail')
        console.log(doctorId)
      },
      graphicConsult() {
        this.$router.push('/graphicConsult')

      },
      go(index) {
        this.$router.push(index);
      },
      onClickRight() {
        this.$toast.success('按钮');
        this.$router.push('/')
      },
      onChange(index) {
        // this.$toast('当前 Swipimagese 索引：' + index);
      },
      swiperImgClick() {
        ImagePreview(this.images)
      },
      getDoctorTable(index, title) {
        var departId
        switch (index) {
          case 0:
            departId = 30;
            break;
          case 1:
            departId = 2;
            break;
          case 2:
            departId = 19;
            break;
          case 3:
            departId = 8;
            break;
          case 4:
            departId = 11;
            break;
          case 5:
            departId = 20;
            break;
          default:
            break;
        }
        var params = {
          departId: departId
        }
        allService.findAllDoctorByDepartId(params, (isOk, data) => {
          if (isOk) {
            this.doctorTable = data.data
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

  .van-tab, .van-tag--large {
    font-size: 16px;
  }
</style>
