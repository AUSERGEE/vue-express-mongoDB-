<template>
  <div>


   
   <p style="margin-top:30px;border-bottom:1px solid #ddd;">商品列表：</p>
   <div class="goodsList">
      <ul>
        <li v-for="item in goods">
            <img :src="getImgSrc(item)" />
            <div class="goodsContent">
                <p style="line-height:22px;font-size:16px;color:#333;">{{item.goodsname}}</p>
                <p style="line-height:22px;font-size:14px;color:#666;">单价：<span style="color:#0097e5;font-weight:bold;font-size:18px;">{{item.price}}</span> 元</p>
                <span class="addToCart" @click="addCartFun(item)">添加到购物车</span>
            </div>
        </li>
      </ul>
   </div>
    <p style="margin-top:30px;border-bottom:1px solid #ddd;">购物车：</p>
    <div class="box">
       <p>
          <span>{{cartList?'':''}}</span>
          <span v-if="!cartList.length" style="color:#0097E5;font-size:22px; line-height:46px; text-align:center;">购物车暂无内容,请到商品列表去添加</span>
          <span v-else style="display:block;">
				<ul class="cartList">
		             <li>
		                <span class='col-2'>名称</span>
		                <span class='col-1'>数量</span>  
		                <span class='col-1'>单价</span>
		                <span class='col-1'>合价</span>
		                <span class='col-4'>操作</span>
		             </li>
		             <li v-for="item in cartList">
		                <span class='col-2'>{{item.data.goodsname}}</span>
		                <span class='col-1'>{{item.data.num}}</span>  
		                <span class='col-1'>{{item.data.price}}</span>
		                <span class='col-1'>{{item.data.price*item.data.num}}</span>
		                <span class='col-4'>
		                    <i @click='reduce(item)' class="operaBtn">-</i>
		                    <i @click="addCartFun(item.data)" class="operaBtn">+</i>
		                    <i @click="removeGoodsFun(item.data)" class="operaBtn">×</i>
		                </span>
		             </li>
		          </ul>
                  <div class="vBtn" @click="turnToPayPage">去支付</div>
          </span>
          
       </p>
    </div>
     <router-view></router-view>
  </div>

</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
import util from 'common/js/util'
import axios from 'axios'
export default {
    data(){
       return {
         goods:[],
         cartList:[]
       }
    },
    computed:{
      ...mapGetters([
         'getStr'
      ])
    },
    created(){
      this.getGoodsDat()
      this.initCart()
    },
    methods:{
       setStateStrFun(){
          this.setStateStr(this.inputStr)
       },
       ...mapMutations({
          setStateStr:'changeStr',
          addCart:'addCart',
          redudeGoods:'redudeGoods',
          removeGoods:'removeGoods'
       }),
       acFun(){
         this.$store.dispatch('a_modifyTwoKey',{key1:'1111'})
       },
       loginFun(){
         if(this.username){
            util.setStore('username',this.username)
         }
       },
       getUsername(){
         return util.getStore('username') 
       },
       logoutFun(){
          util.removeStore('username')
          location.reload()
       },
       getGoodsDat(){
          axios.get('/api/goodsDatasssss').then((res)=>{
             this.goods=res.data.data.data
             console.log(JSON.stringify(res.data.data.data))
          }).catch((err) => {
            console.log(err.response);
            console.log('本地虚拟的商品数据请求失败，将使用假的数据...')
            this.goods=[{"goodsname":"番茄","goodsId":"001","price":10},{"goodsname":"西红柿","goodsId":"002","price":3},{"goodsname":"苹果","goodsId":"003","price":6}];
          })
       },
       addCartFun(item){

         this.addCart({goodsname:item.goodsname,goodsId:item.goodsId,price:item.price})
         
         //this.cartList[storeCartList.]
         this.initCart()
       },
       initCart(){
         this.cartList=[]
         let storeCartList=this.$store.state.cartList
         //for(item in storeCartList){
        //    if(item) return
         //   this.cartList.push(storeCartList[item])
        // }
        Object.keys(storeCartList).forEach(itemGroup=>{
           Object.keys(storeCartList[itemGroup]).forEach(item=>{
              if(storeCartList[itemGroup][item]){
                 var goodsObj=storeCartList[itemGroup][item]
                 goodsObj.key=item
                 this.cartList.push(goodsObj)
              }
             //"{"goodsGroug":{"003":{"data":{"num":3,"goodsname":"苹果","goodsId":"003","price":6,"aa":22},"key":"003"},"002":null}}"
           })
        })
         console.log(JSON.stringify(this.$store.state.cartList))
         console.log('ee'+JSON.stringify(this.cartList))
       },
       removeGoodsFun(item){
          this.removeGoods(item)
          this.initCart()
       },
       reduce(item){
          console.log('减一个：'+item.key)
          this.redudeGoods(item.key)
          this.initCart()
       },
       turnToPayPage(){
         this.$router.push({
            path:'/page40/payPage'
         })
       },
       getImgSrc(item){
         return require(`src/common/images/${item.goodsId}.png`)      
       }
    },
    watch:{
       inputNum(newNum){
          //alert(newNum)
          this.$store.commit('changeNum',newNum)
       }
    }
}
</script>


<style scoped>
  .row{height:26px;line-height:26px;}
  .vuexDemoBox:nth-of-type(1){border-top:1px solid #ddd;}
  .vuexDemoBox,.box{border-bottom:1px solid #ddd; padding:24px 12px 12px 16px; position:relative;}
  .confirmbtn{display:inline-block;width:60px;height:26px;line-height:26px;text-align:center;font-size:14px; background:#0097e5; border-radius:4px; margin-left:4px; color:#FFF;}
  .stateInput{width:60px;}
  .boxTit{font-size:12px; color:#0097e5;position:absolute; top:6px; left:2px;}
  .goodsItem{display:inline-block;padding:0 4px; margin:0 3px; height:26px; text-align:center;line-height:26px; border:1px solid orange; border-radius:4px; color:orange;}
  .cartList{background:#f3f3f3; width:100%; margin-top:12px;}
  .cartList li:not(:last-child){border-bottom:1px solid #ddd; }
  .cartList li{line-height:32px;padding:0 6px;}
  .cartList li>span{display:inline-block; font-size:14px;}
  .col-2{width:22%;}
  .col-1{width:16%;}
  .col-4{width:22%;}
  .operaBtn{display:inline-block; width:20px;height:20px;background:#0097e5; color:#fff; line-height:20px; text-align:center;    font-size: 16px; font-style: normal;}


  .goodsList img{width:60px;height:60px;display:inline-block; float:left;}
  .goodsList li{border-bottom:1px solid #ccc;padding:3px; overflow:hidden;zoom:1;position:relative;}
  .goodsContent{padding-left:80px; }
  .addToCart{position:absolute;bottom:12px; right:12px; display:inline-block; background:#0097e5;color:#FFF; font-size:14px; line-height:28px; padding:0 10px; border-radius:3px;}
  .vBtn{height:36px; width:120px; line-height:36px; border-radius:6px; text-align:center;background:#0097e5; color:#FFF;font-size:14px; margin:10px auto; }
</style>
