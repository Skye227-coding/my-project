import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodCategory:'all',
    cartGoods:[],
    totalNumber:0,
    operater:null,
    currentItem:null,
    dialogVisible:false,
    isLogin:false,
    token:null
  },
  mutations: {
    // 某物初次加入购物车
    addInitialGoods(state,item){
      // 准备工作：改状态,改变自身的数量
      item.isInCart=true;
      item.count++;
      state.currentItem=item.id;
       // 改变总的车内商品量
      state.totalNumber++;  
      // 加入总的购物车数组（改好的商品对象）
      state.cartGoods.push(item);
    },
    deleteGoods(state,itemId){
      state.totalNumber--; 
      // 查找->清零->移出数组
      state.cartGoods.some((val,index,goods)=>{
        if(val.id==itemId){
          val.isInCart=false;
          val.count=0;
          goods.splice(index,1);
          return true;
        }
      })

    },
    addGoods(state,itemId){
      state.totalNumber++;
      // 去购物车数组里搜索到该商品
      state.cartGoods.some(val=>{
        if(val.id===itemId){
          val.count++;
          return true;
        }
      })

    },
    reduceGoods(state,itemId){
      state.totalNumber--;
      state.cartGoods.some(val=>{
        if(val.id===itemId){
          val.count--;
          return true;
        }
      })

    },
    // 把后端生成的token存到localStorage和vuex里，此处参考https://juejin.im/post/5c788f8a6fb9a04a0379e9ae
    [types.LOGIN]:(state,data)=>{
      localStorage.token=data;
      state.token=data;
    }

    

  },
  actions: {
  },
  modules: {
  }
})
