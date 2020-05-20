<template>
    <div>
        <app-header></app-header>
        <p>This is Home page</p>
    </div>
</template>
<script>
import Header from '../components/Header'
export default {
    data(){
        return {
            goods:[]
        }
    },
    components:{
        appHeader:Header
    },
    mounted(){
        this.axios.get('/data/goods.json')
          .then(res=>{
            this.goods = [...res.data];
          })
          .catch(()=>{
              console.log("error");
          })
    }
    
}
</script>