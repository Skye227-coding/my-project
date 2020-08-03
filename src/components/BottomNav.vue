<template>
    <div class="bottom">
        <el-row class="bottom-nav">
            <!-- 用v-for来循环渲染底部导航栏，用三元表达式判断当前路径和匹配的组件的路径，切换彩色图标-->
            <router-link 
                v-for="(i,index) in list"
                :key="index"
                @click="addClassName(i.path)"
                :to="i.path">
                <el-col :span="8" class="nav-item">
                   <div class="nav-img"><img :src="i.path===$route.path ? list[index].active: list[index].img"></div>
                   <div class="nav-title">{{i.name}}</div>
                </el-col>
            </router-link>
        </el-row>
    </div>
       
    
</template>
<script>
export default {
    data(){
        return{
            list:[
                // iconfont找的图标
                {
                    img:require("../../public/imgs/home.png"),
                    active:require("../../public/imgs/home_active.png"),
                    name:"首页",
                    path:"/"
                },
                {
                    img:require("../../public/imgs/cart.png"),
                    active:require("../../public/imgs/cart_active.png"),
                    name:"购物车",
                    path:"/Cart"
                },
                {
                    img:require("../../public/imgs/user-star-fill.png"),
                    active:require("../../public/imgs/user-star-fill_active.png"),
                    name:"用户",
                    path:"/Profile"
                }
            ]
        }
    },
    methods:{
        addClassName:function(path){
            this.$router.replace(path);
        }
    }
}
</script>
<style scoped>
    .bottom-nav{
        position:fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height:50px;
        font-size: 0;
        background-color: #fff;
    }
    .nav-item{
        height:100%;
        width:33.33%;
        display: inline-block;
        text-align: center;
    }
    .nav-img{
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 112px 37.5px;
        height: 80%;

    }
    .nav-img img{
        display:inline-block;
        margin-top:6.25px;
        width:auto;
        height:auto;
        max-width:80%;
        max-height:80%;
    }
    .nav-title{
        height:20%;
        width:auto;
    }
    
</style>