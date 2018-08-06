<template>
  <div class="linkBox">
    <router-link to='/goodslist' tag="div" class="tabItem">
       <span>首页</span>
    </router-link>
    <router-link to="/cart" tag="div" class="tabItem">
       <span>购物车</span>
    </router-link>
    <router-link to='/address' tag="div" class="tabItem">
       <span>地址管理</span>
    </router-link>
    <router-link to='/page30' tag="div" class="tabItem">
       <span>调试</span>
    </router-link>
    
  </div>
</template>

<style>
  .linkBox{background:#FFF;border-top:1px solid #ddd; zoom:1;overflow:hidden; position:fixed; bottom:0;left:0;right:0;}
  .tabItem{float:left;width:25%; box-sizing:border-box;text-align:center; height:48px;line-height:48px;}
 
</style>