import Vue from 'vue'
import router from "./router"
import store from "./store"
import axios from 'axios'
import VueAxios from "vue-axios"
import VueLazyLoader from "vue-lazyload"
import VueCookie from "vue-cookie"
import App from './App.vue'
import { Message } from 'element-ui'
// import 'element-ui/lib/ -chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'


//根据前端的跨域方案做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;

// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  //location.hash 返回url的瞄点部分 
  let path = location.hash;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    if (path != '#/index') {
      window.location.href = "/#/login";
    }
    return Promise.reject(res);
  } else {
    Message.warning(res.msg);
    return Promise.reject(res);
  }

}, (error) => {
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoader, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
// 加入到vue的原型链中，注入Message，当做插件使用。
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
