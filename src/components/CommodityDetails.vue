<template>
    <div>
        <el-page-header @back="goBack" content="详情页面">
        </el-page-header>
        <div class='details'>
            <el-card :body-style="{ padding: '0px' }">
            <img :src="goods.img">
            <div style="padding: 14px;">
                <span>{{goods.name}}</span>
                <div class="bottom clearfix">
                    <span>¥ {{goods.price}}</span>
                    <div>
                        <span>
                            这是{{goods.name}}的产品介绍
                        </span>
                        <p>{{goods.desc}}</p>
                    </div>
                </div>
            </div>
        </el-card>
        </div>

    </div>
</template>
<script>
export default {
    name:'app-commodity-details',
    methods:{
        goBack(){
            // 返回上一页；设置router link到'/'也有同样作用
            this.$router.go(-1)
        }
    },
    computed:{
        goods(){
            // 这里就是commodity组件通过query传过来的参数的调取方法
            return this.$route.query  
        }
    }
}
</script>