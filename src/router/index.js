import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import index from '@/components/index'
import video from '@/components/video'
import upload from '@/components/upload'
import delvideo from '@/components/delvideo'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: 'login'},
    {
      name:"login",
      path: '/login',
      component: login
    },
    {
      name:"register",
      path: '/register',
      component: register
    },
    {
      name:"index",
      path: '/index',
      component: index
    },
    {
      name:"video",
      path: '/video',
      component: video
    },
    {
      name:"upload",
      path: '/upload',
      component: upload
    },
    {
      name:"delvideo",
      path: '/delvideo',
      component: delvideo
    },
  ]
})
