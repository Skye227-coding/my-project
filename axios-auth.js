import axios from 'axios'
import store from './src/store'
const instance=axios.create({
    baseURL:'/api'
})
// request拦截器为每一个request的headers的Authorization属性加上token
instance.interceptors.request.use(config=>{
    console.log("进入拦截器！！！")
    if(store.state.token){
      config.headers.Authorization=`token ${store.state.token}`
      
    }
    return config
  },
  err=>{
    return Promise.reject(err)
  })
  // response拦截器用来拦截错误码
  instance.interceptors.response.use(res=>{
    return Promise.resolve(res)
    
  },err=>{
  
    return Promise.reject(err)
  })

export default instance