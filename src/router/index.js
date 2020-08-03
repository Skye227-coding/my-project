import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import CommodityDetails from '../components/CommodityDetails.vue'
import Cart from '../components/Cart.vue'
import Profile from '../components/Profile.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/User/Register.vue'
import UserProfile from '../components/User/UserProfile.vue'
import UserOrder from '../components/Order.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/DetailsPage',
    component: CommodityDetails
  },
  {
    path:'/Cart',
    component:Cart
  },
  {
    path:'/Profile',
    component:Profile
  },
  {
    path:'/Login',
    component:Login
  },
  {
    path:'/Register',
    component:Register
  },
  {
   path:'/UserProfile',
   component:UserProfile
  },
  // 在订单路由内设置专属的守卫，避免未登录进入订单
  {
    path:'/:id/Order',
    component:UserOrder,
    beforeEnter: (to, from, next) => {
      console.log('token:',localStorage.token)
      if(!localStorage.token)
        next('/Login')
      else 
        next()
    }

  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
