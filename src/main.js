import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-TW'
axios.defaults.timeout = 5000
//for production
axios.defaults.baseURL = 'https://www.06478.tw'
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  console.log('next', next);
  if(to.meta.requiresAuth){
    // 要到的頁面 (to)，它的 meta 如果有 requiresAuth 的話，就"不會"直接放行
    console.log('這裡需要驗證');
  }else{
    // 反之，若沒有 requiresAuth 的話，就會直接放行
    next();
  }
})

// Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI, {locale})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
