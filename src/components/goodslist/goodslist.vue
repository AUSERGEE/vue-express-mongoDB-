<template>
  <div class="hello">
    <mt-header  title="VEM-首页">
        <router-link to="/login" slot="right">
            <mt-button>登录</mt-button>
        </router-link>
    </mt-header>
    <p>价格区间</p>
    <div class="section">
       <dl class="priceBlockChoose">
         <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
            <dd v-for="(price,index) in priceFilter" :class="{'cur':priceChecked==index}">
              <a href="javascript:void(0)"  @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
            </dd>
       </dl>
       <ul class="goodslist">
           <li class="goodsItem" v-for="(item,index) in goodslist" >
               <span>{{item.productImage}}</span>-
               <span>{{item.productName}}</span>-
               <span>{{item.salePrice}}</span>
               <span class="addToCart" @click="addCart(item.productId)">+</span>
           </li>
       </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecomment,getDiscList} from 'api/recomment'
import axios from 'axios'
export default {
   data(){
     return {
       goodslist:[],
       priceFilter:[   // 区间数组
                {
                    startPrice:'0.00',
                    endPrice:'100.00'
                },
                {
                    startPrice:'100.00',
                    endPrice:'500.00'
                },
                {
                    startPrice:'500.00',
                    endPrice:'1000.00'
                },
                {
                    startPrice:'1000.00',
                    endPrice:'5000.00'
                }
            ],
         priceChecked:'all',   // 选中的区间
     }
   },
   created(){
      this.getGoodsList().then((res)=>{
         console.log(res)
         this.goodslist=res.data.result.list
      })
   },
   methods:{
      getGoodsList(){
          var param = {
              priceLevel:this.priceChecked   // 点击的区间
          }
          return axios.get(process.env.API_HOST + "/goods/list",{
              params:param    // 传参
            }).then((res)=>{
              return Promise.resolve(res)
          })
      },
      setPriceFilter(index){   
            this.priceChecked = index;
            this.getGoodsList().then((res)=>{
                console.log(res)
                this.goodslist=res.data.result.list
            })
      },
      addCart(productId){  // 点击加入购物车
          axios.post(process.env.API_HOST + "/goods/addCart",{   // 接口设置在server/routes/goods.js
            productId:productId
          }).then((res)=>{
            var res = res.data;
            if(res.status==0){
              alert("加入成功")
              // 购物车数量加1
              //this.$store.commit('updateCartCount',1);
            }else{
               alert("msg:"+res.msg)
              //this.mdShow = true;   // 未登录模态框显示
            }
          })
        }
   }
}
</script>


<style scoped lang="scss" type="text/css">
   .goodslist{
       border-top:1px solid #ddd;
       .goodsItem{padding:4px 12px; border-bottom:1px solid #ddd;}
    }
   dl{margin-left:12px;}
   dd{display:inline-block;  padding:6px; border:1px solid #ddd;margin:4px 4px 0 0; }
   dd a{text-decoration: inherit; color:#666; cursor:pointer;}
   .cur{border:1px solid red;}
   .addToCart{display:inline-block; width:20px;height:20px; line-height:20px; text-align:center; background:#0097e5; color:#FFF;}
</style>
