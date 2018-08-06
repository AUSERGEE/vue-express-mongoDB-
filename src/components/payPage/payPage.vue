<template>
   <transition name="slide">
	   <div class="paypage">
	       <div class="payIcon">
              <img src="../../common/images/payIcon.png" />
	       </div>
	       <p style="font-size:22px;color:#999; text-align:center;">合计：<span style="color:#0097e5;font-weight:bold">{{account}}</span> 元</p>
           <span class="vBtn" @click="cancel">取消支付</span>
	   </div>
   </transition>

</template>

<script type="text/ecmasript-6">
  
  export default {
     data() {
       return {
         account:0
       }
     },
     created(){
       let cartlistData=this.$store.state.cartList.goodsGroug
       let accountPrice=0
       Object.keys(cartlistData).forEach(item=>{
         accountPrice+=cartlistData[item].data.price*cartlistData[item].data.num
       })
       this.account=accountPrice
     },
     methods:{
       cancel(){
         this.$router.go(-1)
       }
     }
  }
</script>

<style scoped>
  .slide-enter-active,.slide-leave-active{
     transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
     transform:translate3d(0,100%,0)
  }
  .paypage{position:fixed; top:0; left:0; right:0; bottom:0; background:#FFF}
  .payIcon{ width:88px; margin:120px auto 40px;}
  .payIcon>img{ width:100%;}
  .vBtn{display:block; width:78%;height:44px; border-radius:5px; line-height:44px; text-align:center; background:#0097e5; color:#FFF; margin:66px auto 0px;}
</style>