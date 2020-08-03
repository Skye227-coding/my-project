<template>
    <div>
        <el-page-header @back="goBack" content="登录">
        </el-page-header>
        <!-- <el-alert title="错误提示的文案" type="error">
        </el-alert> -->
        <div class="login-form">
          <el-form :model="userForm"   label-width="100px" class="demo-ruleForm">
            <el-form-item >
              <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login(userForm)">登录</el-button>
            </el-form-item>
           </el-form>
        </div>
    </div>
</template>

<script>
import axios from '../../../axios-auth'
import * as types from '../../store/types'
export default {
    name:'login',
    inject:['reload'],
    data(){
      return{
          userForm:{
            username:'',
            password:''
          },
          errorMessage:null
      }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        login(userForm){
          console.log(userForm)
            axios.post('/api/login',userForm)
            .then(res=>{
              // 注册成功会存入一个token（在vuex和localStorage里面）
                console.log('res=>',res)
                this.$store.commit(types.LOGIN,res.data.token)
                this.$message({
                  message:'登录成功',
                  type:'success'
                })
                console.log("想要的token:",res.data.token)
                // 会跳转到个人页：
                this.$router.push({
                  path:'/UserProfile'
                })
            })
            .catch(err=>{
              // console.log("error:",err)
              // 报错然后刷新页面
               console.log("err.response.status:",err.response.status)
               if(err.response.status){
                 switch(err.response.status){
                   case 432: 
                     this.$message({
                       message:'用户名错误',
                       type:'error'
                     })
                     break;
                  case 433:
                    this.$message({
                      message:'密码错误',
                      type:'error'
                    })
                    break;
                 }
                //  这种办法清空表单而不是刷新页面会更高效，不用再渲染一次
                 this.userForm.username=null;
                 this.userForm.password=null;
                //  上面利用inject注入了依赖，这里调用app.vue里面的方法进行重载页面
                //  this.reload()
              }      
          })

        }
    }
}
</script>