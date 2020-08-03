<template>
  <div id="app">
    <div id="main">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <div id="footer">
      <app-bottom-nav></app-bottom-nav>
    </div>
    
  </div>
</template>
<script>
import BottomNav from './components/BottomNav.vue'
export default {
  name:'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  components:{
    'app-bottom-nav':BottomNav
  },
  methods:{
    // 这里的provide和reload用来重载页面：refer:https://blog.csdn.net/qq_16772725/article/details/80467492
    reload(){
      // router-view的显示在false和true之间切换实现重载
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* 处于顶层的整个main需要在下层，footer在上层 */
#main{
  z-index:2;
}
#footer{
  position:fixed;
  z-index:3;

}
</style>
