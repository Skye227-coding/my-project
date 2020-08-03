<template>
    <div class="cart-counter">
        <i class="el-icon-remove" @click="minus"></i>
        <span class="inputText">{{number}}</span>
        <i class="el-icon-circle-plus" @click="plus"></i>
    </div>
</template>
<script>
// 这个组件控制某产品加入购物车中的数量，回传增/减属性给父组件
export default {
    props:['count','id'],
    methods:{
        minus(){
          this.$store.state.operater="minus";
          this.editNumber();
        },
        plus(){
          this.$store.state.operater="plus";
          this.editNumber();
        },
        // 使用存储在state内的操作符和产品ID来编辑增减 ps:能显示这个+-符号说明购物车里至少有一个商品，所以这个id肯定已经有值了
        editNumber(){
            let id=this.id;
            let op=this.$store.state.operater;
            if(op=="plus"){
                this.$store.commit("addGoods",id);   
            }else{
                let count=this.$store.state.cartGoods.filter(val=>{
                    return val.id===id
                })[0].count;
                let thatItem=this.$store.state.cartGoods.filter(val=>{
                    return val.id===id
                });
                console.log('item in cart counter:',thatItem[0]);
                console.log('item num in counter:',count);
                if(count===1){
                    
                    this.$store.commit("deleteGoods",id);
                }else{
                    this.$store.commit("reduceGoods",id);
                }
            }
            // 集中存储的操作符operater需要复原，以便下一个产品的操作
                this.$store.operater=null;
        }
    },
    computed:{
        number(){
            return this.count;
        }
    }
}
</script>