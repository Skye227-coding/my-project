<template>
    <div class="tab-menu">
        <!-- v-model绑定的是name value -->
        <el-tabs v-model="category" @tab-click="changeCategory">
          <el-tab-pane label="全部" name="all"></el-tab-pane>  
          <el-tab-pane label="蔬菜" name="vege"></el-tab-pane>
          <el-tab-pane label="水果" name="fruit"></el-tab-pane>
          <el-tab-pane label="肉禽蛋" name="meat"></el-tab-pane>
          <el-tab-pane label="海鲜" name="seafood"></el-tab-pane>
          <el-tab-pane label="调味品" name="spices"></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  export default {
    name:'Header',
    data() {
      return {
        category: 'all'
      };
    },
    methods: {
      changeCategory() {
        this.$store.state.goodCategory=this.category
        console.log(this.category)
      }
    }
  };
</script>