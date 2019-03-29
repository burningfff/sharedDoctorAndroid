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
        style="border:1px solid #e8e8e8;border-radius: 6px;background-color:#f0f2f5;margin-top: 10px;margin-bottom: 10px"
        @click="onClickSearchBtn"
      />
    </div>

    <div style="width: 100%">
      <van-row style="height: 10px;background-color: #f0f2f5"></van-row>
    </div>

    <div class="menu" v-clickoutside="handleClose">
      <van-collapse v-model="activeName" accordion>
        <van-row style="align-content: center; ">
          <van-col span="6">
            <van-collapse-item :title="sort" name="1">
              <div slot="title">{{sort|ellipsis}}</div>
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item :title="city" name="2">
              <div slot="title">{{city|ellipsis}}</div>
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item :title="illness" name="3">
              <div slot="title">{{illness|ellipsis}}</div>
            </van-collapse-item>
          </van-col>
          <van-col span="6">
            <van-collapse-item title="筛选" name="4"/>
          </van-col>
        </van-row>

      </van-collapse>
      <div class="sortDoctor">
        <transition name="my-trans">
          <div class="dropdownSort" v-show="showSort">
            <van-cell-group>
              <van-button size="large" @click="clickSort(1)">综合排序</van-button>
              <van-button size="large" @click="clickSort(2)">星级评分</van-button>
              <!--<van-button size="large">响应时间</van-button>-->
              <van-button size="large" @click="clickSort(3)">价格从高到低</van-button>
              <van-button size="large" @click="clickSort(4)">价格从低到高</van-button>
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
      <div class="chooseIllness">
        <transition name="my-trans">
          <div class="dropdownIllness" v-show="showIllness"
          style="margin: 5px 5px;text-align:left">
            <van-row>
              <van-col>
                <van-button
                  v-for="(doctor,index) in doctorTable"
                  :key="doctor.doctorId"
                  v-if="index==index_illness"
                  style="align-items: flex-start;margin: 3px 3px;
                  background-color: #35a95d;color: white;border-radius: 6px;"
                  size="small"
                  @click="output(index)"
                  >
                  {{doctor.doctorName}}
                </van-button>
                <van-button
                  v-else
                  style="align-items: flex-start;margin: 2px 3px;
                  background-color: #e4e5e8;color: #7d7e80;border-radius: 6px;"
                  size="small"
                  @click="output(index)"
                >
                  {{doctor.doctorName}}
                </van-button>
              </van-col>
              <!--<van-radio-group v-model="radio">-->
              <!--<van-radio-->
              <!--v-for="(doctor,index) in doctorTable"-->
              <!--:key="doctor.doctorId"-->
              <!--style="text-align: left;align-content: center;margin-right: 10px;margin-top: 5px;margin-bottom: 5px"-->
              <!--@click="output(index)"-->
              <!--:name="index">{{doctor.doctorName}}-->
              <!--</van-radio>-->

              <!--</van-radio-group>-->
            </van-row>

            <!--<van-col span="6">-->
            <!--<van-radio-->
            <!--v-for="(doctor,index) in doctorTable"-->
            <!--:key="doctor.doctorId"-->
            <!--style="text-align: left;align-content: center;margin-right: 10px;margin-top: 5px;margin-bottom: 5px"-->
            <!--@click="output(index)"-->
            <!--:name="index">{{doctor.doctorName}}-->
            <!--</van-radio>-->
            <!--</van-col>-->
            <!--<van-col span="6">-->
            <!--<van-radio-->
            <!--v-for="(doctor,index) in doctorTable"-->
            <!--:key="doctor.doctorId"-->
            <!--style="text-align: left;align-content: center;margin-right: 10px;margin-top: 5px;margin-bottom: 5px"-->
            <!--@click="output(index)"-->
            <!--:name="index">{{doctor.doctorName}}-->
            <!--</van-radio>-->
            <!--</van-col>-->
            <!--<van-col span="6">-->
            <!--<van-radio-->
            <!--v-for="(doctor,index) in doctorTable"-->
            <!--:key="doctor.doctorId"-->
            <!--style="text-align: left;align-content: center;margin-right: 10px;margin-top: 5px;margin-bottom: 5px"-->
            <!--@click="output(index)"-->
            <!--:name="index">{{doctor.doctorName}}-->
            <!--</van-radio>-->
            <!--</van-col>-->

          </div>
        </transition>
      </div>
      <!--<div class="sortDoctor">-->
      <!--<transition name="my-trans">-->
      <!--<div class="dropdown" v-show="showSort">-->
      <!--<van-cell-group>-->
      <!--<van-button size="large" @click="clickSort(1)">综合排序</van-button>-->
      <!--<van-button size="large" @click="clickSort(2)">星级评分</van-button>-->
      <!--&lt;!&ndash;<van-button size="large">响应时间</van-button>&ndash;&gt;-->
      <!--<van-button size="large" @click="clickSort(3)">价格从高到低</van-button>-->
      <!--<van-button size="large" @click="clickSort(4)">价格从低到高</van-button>-->
      <!--</van-cell-group>-->
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
        // illness: '',
        userName: '',
        password: '',
        departId: LOCWIN.Cache.get('departId'),
        departName: LOCWIN.Cache.get('departName'),
        doctorTable: [{
          doctorId: '123456',
          doctorName: '我服了',
        }, {
          doctorId: '1234567',
          doctorName: '我服了7',
        },{
          doctorId: '1234569',
          doctorName: '我服了45',
        }, {
          doctorId: '12345',
          doctorName: '我服了712',
        },{
          doctorId: '123',
          doctorName: '我服了32',
        }, {
          doctorId: '1234',
          doctorName: '我服了7545',
        },{
          doctorId: '12',
          doctorName: '我服了56',
        }, {
          doctorId: '1',
          doctorName: '我服了7gsd',
        },{
          doctorId: '1234568',
          doctorName: '我服了',
        }, {
          doctorId: '12345678',
          doctorName: '我服了7',
        },],
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
        if (value.length > 4) {
          return value.slice(0, 4) + '...'
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
      clickSort(val) {
        if (val == 1) {
          this.sort = "综合排序"
        } else if (val == 2) {
          this.sort = "星级评分"
        } else if (val == 3) {
          this.sort = "价格从高到低"
        } else if (val == 4) {
          this.sort = "价格从低到高"
        }
        this.handleClose()
      },
      clickIllness(val) {
        if (val == 1) {
          this.sort = "综合排序"
        } else if (val == 2) {
          this.sort = "星级评分"
        } else if (val == 3) {
          this.sort = "价格从高..."
        } else if (val == 4) {
          this.sort = "价格从低..."
        }
        this.handleClose()
      },
      output(val) {
        this.index_illness=val
        this.illness=this.doctorTable[val].doctorName
        console.log("index:" + val)
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
        this.$toast('返回');
        this.$router.go(-1)
      },
      onClickSearchBtn() {
        this.$router.push('/search');
      },
      onSelected(data) {
        this.$toast(data.province.value + ' | ' + data.city.value);
        this.city = data.city.value;
        console.log(data)
        this.showCity = false;
        this.activeName = ''
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
      // : {
      //   // 初始化指令
      //   bind(el, binding, vnode) {
      //     function documentHandler(e) {
      //       // 这里判断点击的元素是否是本身，是本身，则返回
      //       if (el.contains(e.target)) {
      //         return false;
      //       }
      //       // 判断指令中是否绑定了函数
      //       if (binding.expression) {
      //         // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
      //         binding.value(e);
      //       }
      //     }
      //
      //     // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      //     el.__vueClickOutside__ = documentHandler;
      //     document.addEventListener('click', documentHandler);
      //   },
      //   update() {
      //   },
      //   unbind(el, binding) {
      //     // 解除事件监听
      //     document.removeEventListener('click', el.__vueClickOutside__);
      //     delete el.__vueClickOutside__;
      //   },
      // }
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

  .menu {
    border: 1px solid #ccc;
  }
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
