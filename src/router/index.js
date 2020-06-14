import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CommodityDetails from '../components/CommodityDetails.vue'
import Cart from '../components/Cart.vue'
import Profile from '../components/Profile.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/User/Register.vue'
import UserProfile from '../components/User/UserProfile.vue'
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
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
