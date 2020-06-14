import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'element-ui/lib/theme-chalk/base.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type']='application/json'
// request拦截器为每一个request的headers的Authorization属性加上token
axios.interceptors.request.use(config=>{
  if(store.state.token){
    config.headers.Authorization=`token ${store.state.token}`
  }
  return config
},
err=>{
  return Promise.reject(err)
})
// response拦截器用来拦截错误码
axios.interceptors.response.use(res=>{
  return Promise.resolve(res)
  
},err=>{

  return Promise.reject(err)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
