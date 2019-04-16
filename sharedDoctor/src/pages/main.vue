<template>
  <div>
    <header-bar class="header-bar"></header-bar>
    <div class="content" style="margin-left: 2%;width: 96%">
      <van-row>
        <van-col span="8">
          <div @click="go('/findDoctor')" style="text-align: center">
            <van-row>
              <img
                style="width: 50%"
                src="../assets/consult.png"/>
            </van-row>
            <van-row style="margin-top: 2px;margin-bottom: 2px">
              <span style="font-size: 18px;font-weight: bolder">问医生</span>
            </van-row>
            <van-row>
              <span style="color: #414244;font-size: 13px">按科室找医生</span>
            </van-row>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="go('/graphicConsult')" style="text-align: center">
            <van-row>
              <img
                style="width: 50%"
                src="../assets/consult.png"/>
            </van-row>
            <van-row style="margin-top: 2px;margin-bottom: 2px">
              <span style="font-size: 18px;font-weight: bolder">图文咨询</span>
            </van-row>
            <van-row>
              <span style="color: #414244;font-size: 13px">按图文咨询医生</span>
            </van-row>
          </div>
        </van-col>
        <van-col span="8">
          <div @click="go('/reportExplanation')" style="text-align: center">
            <van-row>
              <img
                style="width: 50%"
                src="../assets/consult.png"/>
            </van-row>
            <van-row style="margin-top: 2px;margin-bottom: 2px">
              <span style="font-size: 18px;font-weight: bolder;">报告解读</span>
            </van-row>
            <van-row>
              <span style="color: #414244;font-size: 13px">在线解读报告</span>
            </van-row>
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
          <van-tab title="骨科" >
            <div class="doctor" style="margin-top: 10px">
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
                    <van-button round size="small">问医生</van-button>
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
                  :key="doctor.doctorId"
                  :desc="doctor.introduction"
                  :title="doctor.doctorName+doctor.doctorId"
                  thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
                  style="text-align: left "
                >
                  <div slot="footer">
                    <van-button round size="small">问医生</van-button>
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
                  :key="doctor.doctorId"
                  :desc="doctor.introduction"
                  :title="doctor.doctorName+doctor.doctorId"
                  thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
                  style="text-align: left "
                >
                  <div slot="footer">
                    <van-button round size="small">问医生</van-button>
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
                  :key="doctor.doctorId"
                  :desc="doctor.introduction"
                  :title="doctor.doctorName+doctor.doctorId"
                  thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
                  style="text-align: left "
                >
                  <div slot="footer">
                    <van-button round size="small">问医生</van-button>
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
                  :key="doctor.doctorId"
                  :desc="doctor.introduction"
                  :title="doctor.doctorName+doctor.doctorId"
                  thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
                  style="text-align: left "
                >
                  <div slot="footer">
                    <van-button round size="small">问医生</van-button>
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
                  :key="doctor.doctorId"
                  :desc="doctor.introduction"
                  :title="doctor.doctorName+doctor.doctorId"
                  thumb="https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
                  style="text-align: left "
                >
                  <div slot="footer">
                    <van-button round size="small">问医生</van-button>
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
    methods: {
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
