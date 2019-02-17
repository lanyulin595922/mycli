// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/comcss/reset.css"
//引ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// import Qs from 'qs'

//引入VideoPlayer
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)

//引入全局方法
import comjs from './comjs/commonjs'
Vue.use(comjs);
Vue.prototype.$axios = axios;
// Vue.prototype.qs = Qs;
axios.defaults.baseURL='http://120.77.44.112:8083/'
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted() {
    let that = this;
    that.getLocalStorage()
    that.istoken();
  },
})
