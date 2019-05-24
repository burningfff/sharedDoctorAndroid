import Vue from 'vue'
import Router from 'vue-router'


const login = resolve => require(['../pages/my/login.vue'], resolve)
const register = resolve => require(['../pages/my/register.vue'], resolve)
const patientInfo = resolve => require(['../pages/my/patientInfo.vue'], resolve)
const patientSetting = resolve => require(['../pages/my/patientSetting.vue'], resolve)
const patientOrder = resolve => require(['../pages/my/patientOrder.vue'], resolve)
const patientOrderDetail = resolve => require(['../pages/my/patientOrderDetail.vue'], resolve)
const updatePatientLocation = resolve => require(['../pages/my/updatePatientLocation.vue'], resolve)
const testdemo = resolve => require(['../pages/testdemo.vue'], resolve)
const HelloWorld = resolve => require(['../pages/HelloWorld.vue'], resolve)
const main = resolve => require(['../pages/main.vue'], resolve)
const my = resolve => require(['../pages/my.vue'], resolve)
const consult = resolve => require(['../pages/consult.vue'], resolve)
const homeDoctor = resolve => require(['../pages/consult/homeDoctor.vue'], resolve)
const graphicConsult = resolve => require(['../pages/consult/graphicConsult.vue'], resolve)
const onlineConsult = resolve => require(['../pages/consult/onlineConsult.vue'], resolve)
const payConsult = resolve => require(['../pages/consult/payConsult.vue'], resolve)
const payPhone = resolve => require(['../pages/consult/payPhone.vue'], resolve)
const payHome = resolve => require(['../pages/consult/payHome.vue'], resolve)
const reserveDoctor = resolve => require(['../pages/consult/reserveDoctor.vue'], resolve)
const illnessDetailPhone = resolve => require(['../pages/consult/illnessDetailPhone.vue'], resolve)
const illnessDetailHome = resolve => require(['../pages/consult/illnessDetailHome.vue'], resolve)
const findDoctor = resolve => require(['../pages/main/findDoctor.vue'], resolve)
const findDoctorByDepart = resolve => require(['../pages/main/findDoctorByDepart.vue'], resolve)
const findDoctorByKeyWord = resolve => require(['../pages/main/findDoctorByKeyWord.vue'], resolve)
const updateDoctorLocation = resolve => require(['../pages/doctor/updateDoctorLocation.vue'], resolve)
const doctorDetail = resolve => require(['../pages/main/doctorDetail.vue'], resolve)
const reportExplanation = resolve => require(['../pages/main/reportExplanation.vue'], resolve)
const doctorMainPage = resolve => require(['../pages/doctor/doctorMainPage.vue'], resolve)
const doctorInfo = resolve => require(['../pages/doctor/doctorInfo.vue'], resolve)
const doctorSetting = resolve => require(['../pages/doctor/doctorSetting.vue'], resolve)
const doctorServiceSetting = resolve => require(['../pages/doctor/doctorServiceSetting.vue'], resolve)
const doctorOrder = resolve => require(['../pages/doctor/doctorOrder.vue'], resolve)
const doctorOrderDetails = resolve => require(['../pages/doctor/doctorOrderDetails.vue'], resolve)

Vue.use(Router)

const routes = [
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/register',
    component: register,
    name: 'register'
  },
  {
    path: '/patientInfo',
    component: patientInfo,
    name: 'patientInfo'
  },
  {
    path: '/patientSetting',
    component: patientSetting,
    name: 'patientSetting'
  },
  {
    path: '/patientOrder',
    component: patientOrder,
    name: 'patientOrder'
  },
  {
    path: '/patientOrderDetail',
    component: patientOrderDetail,
    name: 'patientOrderDetail'
  },
  {
    path: '/updatePatientLocation',
    component: updatePatientLocation,
    name: 'updatePatientLocation'
  },
  {
    path: '/updateDoctorLocation',
    component: updateDoctorLocation,
    name: 'updateDoctorLocation'
  },
  {
    path: '/testdemo',
    component: testdemo,
    name: 'testdemo'
  },
  {
    path: '/HelloWorld',
    component: HelloWorld,
    name: 'HelloWorld'
  },
  {
    path: '/main',
    component: main,
    name: 'main'
  },
  {
    path: '/',
    component: main,
    name: 'home'
  },
  {
    path: '/my',
    component: my,
    name: 'my'
  },
  {
    path: '/consult',
    component: consult,
    name: 'consult'
  },
  {
    path: '/graphicConsult',
    component: graphicConsult,
    name: 'graphicConsult'
  },
  {
    path: '/onlineConsult',
    component: onlineConsult,
    name: 'onlineConsult'
  },
  {
    path: '/homeDoctor',
    component: homeDoctor,
    name: 'homeDoctor'
  },
  {
    path: '/payConsult',
    component: payConsult,
    name: 'payConsult'
  },
  {
    path: '/payPhone',
    component: payPhone,
    name: 'payPhone'
  },
  {
    path: '/payHome',
    component: payHome,
    name: 'payHome'
  },
  {
    path: '/reserveDoctor',
    component: reserveDoctor,
    name: 'reserveDoctor'
  },
  {
    path: '/findDoctor',
    component: findDoctor,
    name: 'findDoctor'
  },
  {
    path: '/findDoctorByDepart',
    component: findDoctorByDepart,
    name: 'findDoctorByDepart'
  },
  {
    path: '/findDoctorByKeyWord',
    component: findDoctorByKeyWord,
    name: 'findDoctorByKeyWord'
  },
  {
    path: '/doctorDetail',
    component: doctorDetail,
    name: 'doctorDetail'
  },
  {
    path: '/reportExplanation',
    component: reportExplanation,
    name: 'reportExplanation'
  },
  {
    path: '/doctorMainPage',
    component: doctorMainPage,
    name: 'doctorMainPage'
  },
  {
    path: '/doctorInfo',
    component: doctorInfo,
    name: 'doctorInfo'
  },
  {
    path: '/doctorSetting',
    component: doctorSetting,
    name: 'doctorSetting'
  },
  {
    path: '/doctorServiceSetting',
    component: doctorServiceSetting,
    name: 'doctorServiceSetting'
  },
  {
    path: '/doctorOrder',
    component: doctorOrder,
    name: 'doctorOrder'
  },
  {
    path: '/doctorOrderDetails',
    component: doctorOrderDetails,
    name: 'doctorOrderDetails'
  },
  {
    path: '/illnessDetailPhone',
    component: illnessDetailPhone,
    name: 'illnessDetailPhone'
  },
  {
    path: '/illnessDetailHome',
    component: illnessDetailHome,
    name: 'illnessDetailHome'
  },

  // {
  //   path: '/homepage',
  //   component: Homepage,
  //   name: 'homepage',
  //   meta: {
  //     title:'共享医生'
  //   }
  // },
  // {
  //   path: '/register',
  //   component: Register,
  //   name: 'register'
  // },
  // {
  //   path: '/login',
  //   component: Login,
  //   name: 'login'
  // },
  // {
  //   path: '/student/index',
  //   component: studentIndex,
  //   name: 'studentIndex'
  // },
  // {
  //   path: '/student/infopage',
  //   component: studentInfo,
  //   name: 'studentInfo'
  // },
  // {
  //   path: '/teacher/index',
  //   component: teacherIndex,
  //   name: 'teacherIndex'
  // },
  // {
  //   path: '/teacher/addOrder',
  //   component: addOrder,
  //   name: 'addOrder'
  // },
  // {
  //   path: '/student/info',
  //   component: changeSInfo,
  //   name: 'SInfo'
  // },
  // {
  //   path: '/teacher/info',
  //   component: changeTInfo,
  //   name: 'TInfo'
  // },
  // {
  //   path: '/SuperUser/index',
  //   component: SuperUser,
  //   name: 'SuperUser'
  // }

]

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

const router = new Router({
  routes
})

export default router
