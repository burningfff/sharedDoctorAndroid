<template>
  <div>
    <van-nav-bar
      fixed
    >
      <span slot="left" style="font-size: 25px">
        <van-icon name="arrow-left" style="color:rgb(94,94,94);" @click="onClickLeft"></van-icon>
      </span>
      <span slot="left" style="margin-left: 2px; font-size: 20px;font-weight: bold">
        修改地址
      </span>
    </van-nav-bar>
    <div class="content" style="margin-left: 4%;width: 92%;margin-top: 46px;">
      <van-address-edit
        style="text-align: left;"
        :area-list="areaList"
        :address-info="addressInfo"
        @save="onSave"
      />
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
        areaList: AreaList,
        addressInfo: {
          id: '',
          name: LOCWIN.Cache.get('userInfo').doctorName,
          tel: LOCWIN.Cache.get('userInfo').phone,
          province: '',
          city: '',
          county: '',
          addressDetail: '',
          areaCode: ''
        },
        doctorId: LOCWIN.Cache.get('userInfo').doctorId,
        locationId: LOCWIN.Cache.get('userInfo').locationId,
      };
    },
    methods: {
      initpage() {
        this.getLocation()
      },
      getLocation() {
        var params = {
          locationId: this.locationId
        }
        allService.findLocationByLocationId(params, (isOk, data) => {
          if (isOk) {
            this.addressInfo.province = data.data.province
            this.addressInfo.city = data.data.city
            this.addressInfo.county = data.data.area
            this.addressInfo.addressDetail = data.data.locationDetail
            this.addressInfo.areaCode = data.data.areaCode
            console.log(data.data)
          }
        })
      },
      onSave(content) {
        var params = {
          locationId: this.locationId,
          province: content.province,
          city: content.city,
          area: content.county,
          areaCode: content.areaCode,
          locationDetail: content.addressDetail,
        }
        allService.updateLocationByLocationId(params, (isOk, data) => {
          if (isOk) {
            var phoneTemp = content.tel;
            if (!(/^1[34578]\d{9}$/.test(phoneTemp))) {
              this.$toast.fail("手机号码格式有误，请重填");
            } else {
              var params = {
                doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                phone: phoneTemp,
                email: LOCWIN.Cache.get('userInfo').email,
                locationId: LOCWIN.Cache.get('userInfo').locationId
              }
              allService.updateDoctorContact(params, (isOk, data) => {
                if (isOk) {
                  this.getLocation()
                  var params = {
                    doctorId: LOCWIN.Cache.get('userInfo').doctorId,
                  }
                  allService.findDoctorByDoctorId(params, (isOk, data) => {
                    if (isOk) {
                      LOCWIN.Cache.set('userInfo', data.data)
                    }
                  })
                }
              })
            }
          }
        })
        this.$toast('保存成功！');
        console.log(content)
      },
      onClickLeft() {
        this.$router.go(-1);
      },
    },
  };
</script>

<style>

</style>
