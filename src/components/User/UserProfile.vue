<template>
    <div>
        
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
            password:'',
            address:'',
            email:''
          }
      }
    },
    mounted(){
      this.axios.get('/api/userprofile')
        .then(res=>{
           console.log("get from backend",res)
             this.user=[...res.data]
        })
        .catch(err=>{

        })

    }
    
}
</script>