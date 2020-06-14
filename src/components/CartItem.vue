<template>
    <div class="one-commodity">
        <el-card :body-style="{ padding: '0px' }">
            <div class="left">
                <img :src="imgSrc">
                <div style="padding: 14px;">
                    <span>{{itemName}}</span>
                    <div class="bottom clearfix">
                        <span>¥ {{itemPrice}}</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="cart-icon">
                    <!-- 这个button只在商品从没有一个被加入购物车 到加入购物车的状态的时候使用-->
                    <cart-counter :count="counter" v-show="counter > 0"></cart-counter>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import CartCounter from '../components/CartCounter.vue'
export default {
    name:'app-cartItem',
    data(){
        return{
        }
    },
    props:['itemId','itemName','imgSrc','itemDesc','itemPrice','count'],
    computed:{
        // 这个counter用来获取当前商品在购物车里的数量,也用来传值给计数器子组件
        counter(){
          let that = this;
          let cartGoods = this.$store.state.cartGoods;
          let result = 0;
          console.log("current id: "+that.itemId);
          cartGoods.some(good => {
            if (good.id === that.itemId) {
              result = good.count;
            }
          });
          console.log('current item num: '+result)
          return result;
        }
    },
    components:{
        "cart-counter":CartCounter
    }
}
</script>
<style scoped>
.left{
    width: 40%;
    height: 100%;
    text-align:center;
}
.right{
    position: relative;
    height: 100%;
    width: 10%;
    text-align: right;
    padding-left: 10px;
    float:right;

}
.cart-icon{
    position: absolute;
    bottom: 5px;
     
}
    
</style>