<template>
    <div>
        <el-page-header @back="goBack" content="注册">
        </el-page-header>
        <div class="login-form">
          <el-form :model="userForm"   label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名">
              <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="text" v-model="userForm.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input type="email" v-model="userForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register(userForm)">注册</el-button>
              <el-button type="primary" plain><router-link :to="{path:'/Login'}">登录</router-link></el-button>
            </el-form-item>
           </el-form>
        </div>
    </div>
</template>

<script>
import axios from '../../../axios-auth'
export default {
    data(){
      return{
          userForm:{
              username:'',
              password:'',
              address:'',
              email:''
          }
      }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        register(userForm){
            // const user=JSON.stringify(userForm)
            console.log(userForm)
            axios.post('/api/register',userForm)
            .then(res=>{
                console.log('res=>',res)
            })
            .catch(err=>{
                if(err.response.status===500){
                  this.$message({
                    message:'该用户名已被使用，请重新输入',
                    type:'error'
                  })
                }
                console.log('error:',err)
               
            })

        }
    }
}
</script>