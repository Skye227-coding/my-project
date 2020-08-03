<template>
    <div>
        <el-page-header @back="goBack" content="我的订单">
        </el-page-header>
        <main>
            <el-card>
                <span>订单</span>
                <div class="item" v-for="item in cartgoods" :key="item.id">
                    <div class="item-img">
                        <el-image 
                        :src="item.img"
                        fit="fit"
                        style="width: 100px; height: 100px">
                        </el-image>
                    </div>
                    <div class="item-name">
                        <span id="item-name">{{item.name}}</span>
                    </div>
                    <div class="item-price">
                        <span>{{item.price}}</span>
                    </div>
                </div>
            </el-card>
            <div class="amount">
                <div id="amount-title">合计：</div>
                <div id="amount-value">¥{{pay}}</div>
            </div>
            <div class="address">
                <div id="address-title">地址：</div>
                <div id="address-value">{{address}}</div>

            </div>
        </main>
        
        <footer class="topay">
            <div >
                <div id="pay-amount">付款：¥{{pay}}</div>
                <div id="pay-button">
                    <el-button @click="toPay" type="primary">去支付</el-button>
                </div>
            </div>
        </footer>
        
    </div>
</template>
<script>
export default {
    name:'Order',
    data(){
        return{
            

        }
    },
    methods:{
      goBack(){
          this.$router.go(-1);
      },
      toPay(){
        //   支付后清空store里购物车的商品
      }
    },
    computed:{
        cartgoods(){
            return this.$store.state.cartGoods;
        },
        pay(){
            console.log("pay:",this.$route.query.pay);
            return this.$route.query.pay;
        },
        address(){
            return this.$store.state.address;
        }
    }
}
</script>
<style scoped>

/* 网格布局 */
.item{
    display:grid;
    padding-top:20px;
    grid-template-columns: 100px 2fr 1fr;
    grid-template-rows: 100px;
    
}
.item-name,.item-price{
    margin:auto 0;
}
#item-name{
    text-align:center;
}
.amount,.address,.topay{
   display:grid;
   grid-template-columns: 50% 50%;
   grid-template-rows: 50px;
   margin-top:10px;

}
#amount-title,#address-title,#pay-amount{
    text-align:left;
    
}
#amount-value,#address-value,#pay-button{
    text-align:right;

}
.topay{
    background-color: white;
    width:100%;
    height:40px;
    bottom:50px;
    z-index:3;
   
    position: fixed;
}
#pay-button{
    height:40px;
    bottom:50px;
    position: fixed;
    right:10px;
}
    
</style>