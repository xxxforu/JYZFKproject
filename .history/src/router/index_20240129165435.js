import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/theLogin.vue'
import main from '../views/theMain.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component:main,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children:[
      { path:'/main',component:() => import('../views/checkViolations.vue')},
      {
        path:'/main/smallMain',
        component:()=>import('../views/smallMain.vue')
      },
      {
        path:'/main/checkViolations',
        component:() => import('../views/checkViolations.vue')
      },{
        path:'/main/gasStation',
        component:() => import('../views/gasStation.vue')
      },{
        path:'/main/visualSL',
        component:() => import('../views/visualSL.vue')
      },{
        path:'/main/listSL',
        component:() => import('../views/listSL.vue')
      },{
        path:'/main/writeGSI',
        component:() => import('../views/writeGSI.vue')
      },{
        path:'/main/writeSL',
        component:() => import('../views/writeSL.vue')
      },{
        path:'/main/urgentAsk',
        component:() => import('../views/urgentAsk.vue')
      }
    ]
  }
]

const router =  createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes
})

export default router
