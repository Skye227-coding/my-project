<template>
    <div>
        <div v-if="!isLogin">
            <el-alert
                title="您未登录，请先登录"
                type="error">
            </el-alert>
            <div class="login-reg">
                <el-button type="primary" round @click="Login">登录</el-button>
                <el-button type="primary" round @click="Register">注册</el-button>
            </div>

            
        </div>
        <div v-else>
        </div>
    </div>
</template>
<script>
export default {
   methods:{
       Login(){
           this.$router.push({
               path:"/Login",
           })
       },
       Register(){
           this.$router.push({
               path:"/Register"
           })
       }
           
   },
   computed:{
       isLogin(){
           return this.$store.state.isLogin;
       }
   }
}
</script>
<style scoped>
.login{
   margin-top :10px;
}
    
</style>