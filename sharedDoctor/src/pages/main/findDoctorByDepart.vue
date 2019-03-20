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
    <div style="width: 100%" @click="show = !show">
      <van-row style="height: 10px;background-color: #f0f2f5"></van-row>
    </div>

    <div class="menu">
      <div class="main" v-clickoutside="handleClose">
        <van-collapse v-model="activeName" accordion>
          <van-row style="align-content: center">
            <van-col span="6" >
              <van-collapse-item title="有赞商城" name="1" />
              <!--<button @click="show = !show">点击</button>-->
            </van-col>
            <van-col span="6" @click="show = !show">
              <van-collapse-item title="有赞零售" name="2" />
              <!--<button @click="show = !show">显示</button>-->
            </van-col>
            <van-col span="6" @click="show = !show">
              <van-collapse-item title="有赞零售" name="3" />
              <!--<button @click="show = !show">下拉菜单</button>-->
            </van-col>
            <van-col span="6" @click="show = !show">
              <van-collapse-item title="有赞零售" name="4" />

              <!--<button @click="show = !show">点击菜单</button>-->
            </van-col>
          </van-row>

        </van-collapse>
        <transition name="van-slide-down">
          <div class="dropdown" v-show="show">
            <p>下拉框的内容,点击外面区域可以关闭</p>
          </div>
        </transition>
      </div>
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
        doctorTable: [{
          doctorId: '123456',
        }],
        doctorList: [],
        loading: false,
        finished: false,
        show: false,
        searchKey: '',
        areaList: AreaList,
      };
    },
    watch:{
      activeName(val) {
        console.log("this.activeName"+this.activeName)
        if (this.activeName==1||this.activeName==3){
          this.show=true;
        }else {
          this.show=false;
        }

      }
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
      handleClose() {
        this.show = false;
        this.activeName=''
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
    directives: {
      clickoutside: {
        bind: function (el, binding, vnode) {
          function documentHandler(e) {
            if (el.contains(e.target)) {
              return false;
            }
            if (binding.expression) {
              binding.value(e)
            }
          }

          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click', documentHandler);
        },
        unbind: function (el, binding) {
          document.removeEventListener('click', el._vueClickOutside_);
          delete el._vueClickOutside_;
        }
      }
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
