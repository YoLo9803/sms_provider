import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.baseURL = '/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

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
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
