<template>
    <div>
        <el-page-header @back="goBack" content="我的购物车">
        </el-page-header>
        <main>
            <el-alert title="结算前请登录" type="warning" v-show="!isLogin"></el-alert>
            <div class="item-display">
                <el-row v-for="goods in cartgoods" :key="goods.id">
                    <cart-item 
                        :itemId="goods.id"
                        :itemName="goods.name"
                        :imgSrc="goods.img"
                        :itemDesc="goods.content"
                        :itemPrice="goods.price"
                        :count="goods.count"></cart-item>
                </el-row>
            </div>
            <div class="price-summary">
                <div class="total-price">
                    <span class="float-left">商品总价：</span>
                    <span class="float-right">¥ {{amount}}</span>
                </div>
                <br>
                <div class="red-packet">
                    <span class="float-left">红包：</span>
                    <el-select  class="float-left" v-model="redPacket" :placeholder="redPacketPlaceholder">
                        <el-option
                            v-for="item in redPackets"
                            :key="item.id"
                            :label="item.label"
                            :value="item.money"
                            :disabled="isItemDisabled(item.limit)">
                        </el-option>
                    </el-select>
                    <span class="float-right" v-show="redPacket">¥ {{redPacket}}</span>
                </div>
                <br>
                <div class="pay">
                    <div class="minus-coupon">
                        <span class="float-left">商品实付:</span>
                        <span class="float-right">¥ {{amount-redPacket}}</span>
                    </div>
                    <br>
                    <div class="postage">
                        <span class="float-left">运费（满49元包邮）：</span>
                        <span class="float-right">
                            <span v-show="needPostage">¥ {{postage}}</span>
                            <span v-show="!needPostage">免邮</span>
                        </span>
                    </div>
                    <br>
                    <div class="summary">
                        <span class="float-left">合计：</span>
                        <span class="float-right">¥ {{pay}}</span>
                    </div>
                </div>
            </div>
        </main>
        <footer  class="bottom-pay" v-show="cartgoods.length>0">
            <div>
             <el-button type="primary" class="pay-button" @click="toPayOrder">去结算 <i class="el-icon-arrow-right"></i></el-button>
            </div>
        </footer>
        
    </div>
</template>
<script>
import CartItem from '../components/CartItem.vue'
import axios from '../../axios-auth'
export default {
    data(){
        return{
            redPackets:[
                {id:1,money:10,limit:66,label:"减10元红包（满66元可用）"},
                {id:2,money:15,limit:88,label:"减15元红包（满88元可用）"},
                {id:3,money:20,limit:100,label:"减20元红包（满100元可用）"}
            ],
            redPacket:'',
            redPacketPlaceholder:'无可用红包',
            postage:6,
            needPostage:true,
            userName:''
        }
    },
    methods:{
      goBack(){
            // 返回上一页；设置router link到'/'也有同样作用
        this.$router.go(-1)
      },
    //   用来判断此时哪个红包可用
      isItemDisabled(limit){
        //   当前红包不可用
          if(this.amount<limit){
            //   再次判断最小的是否可用
              if(this.amount<this.redPackets[0].limit){
                  this.redPacket="";
                  this.redPacketPlaceholder="无可用红包"
              }
            //   禁用该项
              return true;
          }else{
            //   当前红包是可用的红包之一，用concat来产生一个副本，再从最大限额的红包开始筛选
              this.redPackets.concat().reverse().some(coupon=>{
                  if(coupon.limit<=this.amount){
                    //   自动选了能用的最大红包
                      this.redPacket=coupon.money;
                      return true;
                  }
              })
              return false;
          }

      },
      toPayOrder(){
          if(this.$store.state.isLogin){
              axios.get('/api/userprofile')
              .then(res=>{
                  this.userName=res.data.username
                  this.$store.commit('setAddress',res.data.address)
                  console.log('name',this.userName)
                  this.$router.push({
                  path:`/${this.userName}/Order`,
                  query:{
                      pay:this.pay
                  }
                  })
              })
              .catch(err=>{
                  console.log("err",err)
              })
              
          }
        //   在进入order之前设置检查登录状态

      }
    },
    components:{
        "cart-item":CartItem

    },
    computed:{
        cartgoods(){
            return this.$store.state.cartGoods;
        },
        amount(){
          let cartGoods=this.$store.state.cartGoods;
          let result=0;
          cartGoods.forEach(goods=>{
              result+=goods.price*goods.count;
          })
          return result;
        },
        // 计算加上邮费的价格
        pay(){
            let initialAmount=this.amount-this.redPacket;
            if(initialAmount<49) this.needPostage=true;
            else this.needPostage=false;
            if(this.needPostage) return initialAmount+this.postage;
            else return initialAmount;
        },
        isLogin(){
           return this.$store.state.isLogin;
       }
    }
    
}
</script>
<style scoped>
.float-left{
    float:left;
}
.float-right{
    float:right;
}
.price-summary{
    border-bottom: 1px solid #eee
}
.red-packet{
    height:20px;
    
}
.total-price{
    height:20px;
}
.minus-coupon{
    height:20px;
}
.summary{
    height:60px;

}
.postage{
    height:20px;
}
.el-select{
    width:auto;
}
.bottom-pay{
    background-color: white;
    width:100%;
    height:40px;
    bottom:50px;
    z-index:3;
   
    position: fixed;
}
.pay-button{
    height:40px;
    bottom:50px;
    position: fixed;
    right:10px;
}
.el-icon-arrow-right{
    padding-right: 0;
}


    
</style>