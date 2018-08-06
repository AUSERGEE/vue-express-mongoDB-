<template>
 <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="MainPage">
      <img slot="icon" >
      主页
    </mt-tab-item>
    <mt-tab-item id="ShoppingList">
      <img slot="icon" >
      积分商城
    </mt-tab-item>
    <mt-tab-item id="GroupList">
      <img slot="icon" >
      微社区
    </mt-tab-item>
    <mt-tab-item id="UserCenter">
      <img slot="icon" >
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  data(){
    return{
    //选中的tabbar值message为外面页面传入的值selected
      message:this.selected
    }
  },
  props:{
    selected: String
  },
  watch: {
    message: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定去向
      switch(val){
        case 'MainPage':
          this.$router.push('/mainpage');
        break;
        case 'ShoppingList':
          this.$router.push('/shoppinglist');
        break;
        case 'GroupList':
          this.$router.push('/grouplist');
        break;
        case 'UserCenter':
          this.$router.push('/usercenter');
        break;
      }
    }
  },
}
</script>