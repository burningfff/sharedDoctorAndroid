import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/testdemo'


const login = resolve => require(['../components/Login/login.vue'], resolve)
const testdemo = resolve => require(['../components/testdemo.vue'], resolve)

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: login,
    name: 'login'
  },
  {
    path: '/testdemo',
    component: testdemo,
    name: 'testdemo'
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
