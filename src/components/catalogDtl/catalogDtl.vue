<template>
   <div class="catalogDtl">
        <p>this is catalogDtl page:</p>
        <div class="textContent">
            <p>$route.params.id : {{$route.params.id}}</p>
            <p>$route.query.keyworth : {{$route.query.keyworth}}</p>
        </div>
        <span class="backBtn" @click="goBack">返回</span>
   </div>
</template>

<script type="text/ecmascript-6">
   export default{
     methods:{
        goBack(){
           this.$router.go(-1)
        }
     }
   }
</script>
<style lang="scss" scoped>
  .catalogDtl{position:fixed;top:0;left:0px;right:0;bottom:0; background:rgba(0,0,0,.6); color:#FFF;}
  .catalogDtl p{color:#fff;}
  .backBtn{position:absolute; bottom:20px;left:20px; display:inline-block; height:26px;line-height:26px; width:80px;text-align:center; font-size:14px; color:#ddd; border:1px solid #ddd; border-radius:6px;}
</style>

