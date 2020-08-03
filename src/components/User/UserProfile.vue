<template>
<div>
    <el-page-header @back="goBack" content="用户信息">
    </el-page-header>
     <div class="user-info">
        <p ><span>用户名:</span>{{user.username}}</p>
        <p ><span>地址:</span>{{user.address}}</p>
        <p ><span>邮箱:</span>{{user.email}}</p>  
    </div>
</div>
    
</template>
<script>
import axios from '../../../axios-auth'
export default {
    name:'UserProfile',
    data(){
      return{
          user:{
            username:'',
            address:'',
            email:''
          }
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    },
    mounted(){
        axios.get('/api/userprofile')
        .then(res=>{
           console.log("get from backend",res.data)
             this.user.username=res.data.username;
             this.user.address=res.data.address;
             this.user.email=res.data.email;
             
        })
        .catch(err=>{

        })

    }
    
}
</script>
<style scoped>
  .user-info{
      width:60%;
      text-align: left;
      margin:0 auto;
    
  }
  p{  
     border-bottom:solid #C0C0C0;
     
  }
  span{
    font-family: Avenir, Helvetica, Arial, sans-serif; 
    font-weight:bold;
  }
  
</style>>
    
