<template>
    <div>
        <app-header></app-header>
        <div class="itemList">
            <!-- 这里面的动画是通过npm i vue2-animate库实现的 :这里的一层transition-group没法实现每次切换都有特效，所以需要两侧-->
            <transition name="fade">
            <transition-group name="list"
                              tag="ul" 
                              :key="currentKey"
                              mode='out-in'>
                <!-- 这里使用二维数组来完成三个换行一次 -->
                <el-row v-for="(row,index) in selectedGoods" :key="index">
                    <el-col :span="8" v-for="(item) of row" :key="item.id">
                        <app-commodity
                            :itemId="item.id"
                            :itemName="item.title"
                            :imgSrc="item.img"
                            :itemDesc="item.content"
                            :itemPrice="item.price"
                            :count="0">
                        </app-commodity>
                    </el-col>
                </el-row>
                
            </transition-group>
            </transition>
        </div>
    </div>
</template>
<script>
import Header from '../components/Header'
import Commodity from '../components/Commodity'
export default {
    data(){
        return {
            goods:[],
            update:true
        }
    },
    computed:{
      currentKey(){
              return this.$store.state.goodCategory
      },
      selectedGoods(){
        //   过滤后得到当前分类的产品
          var newGoods= this.goods.filter(good=>{
              if(this.$store.state.goodCategory==="all"||good.category===this.$store.state.goodCategory)
                return true;
          })
        //   一维数组变二维数组
          const rows=[]
          newGoods.forEach((item,index)=>{
              const row=Math.floor(index/3)
              if(!rows[row]){
                  rows[row]=[]
              }
              rows[row].push(item)
          })
          return rows

      }

    },
    methods:{
        // Current(itemCate){
        //     // 如果是全部商品则所有品类都显示
        //    let currentCate=this.$store.state.goodCategory
        //    console.log("current: "+currentCate)
        //    console.log("item: "+itemCate)
        //    if(currentCate==='all'){
        //        return true
        //    }else{
        //     //    如果是其他品类当选，则只显示该品类
        //        return itemCate===currentCate
        //    }
        // }
    },
    components:{
        appHeader:Header,
        appCommodity:Commodity
    },
    // 这个钩子里载入数据
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
<style scoped>
    .fadeRight{
       animation-duration: 0.25s; 
    }
    .itemList{
        height:100%;
        width:100%;
        margin: 0 auto;
        

    }
</style>