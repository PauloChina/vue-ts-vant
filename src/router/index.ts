import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // { path: '/', name: 'Home', meta: { title: '首页' }, component: Home },
  {
    path: '/',
    name: 'Hupu',
    meta: { title: '虎扑足球', keepAlive: true },
    component: () => import('../views/Hupu.vue'),
  },
  {
    path: '/hupu/detail',
    name: 'HupuDetail',
    meta: { title: '资讯详情' },
    component: () => import('../views/HupuDetail.vue'),
  },
  {
    path: '/hupu/voiceDetail',
    name: 'HupuVoiceDetail',
    meta: { title: '资讯详情' },
    component: () => import('../views/HupuVoiceDetail.vue'),
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
})

export default router
