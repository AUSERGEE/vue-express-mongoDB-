<template>
  <div class="hello">
    <p>vuex-demo</p>
    <div class="vuexDemoBox">
        <span class='boxTit'>API方法：</span>
        <p class="row">修改stateNum为：<input type="text" v-model='inputNum' class="stateInput"/></p>
        <p>当前stateNum为：{{$store.state.stateNum}}</p>
    </div>
    <div class="vuexDemoBox">
        <span class='boxTit'>映射方法：</span>
        <p class="row">
              修改stateStr为：<input type="text" v-model='inputStr' class="stateInput"/>
              <span class="confirmbtn" @click="setStateStrFun">确定</span>
        </p>
        <p>当前stateStr为：{{getStr}}</p>
    </div>
    <div class="vuexDemoBox">
        <span class='boxTit'>action异步：</span>
        <p class="row">
              <span style="font-size:12px;">请求本地数据赋值给key2，然后再给key1传值</span>
              <span class="confirmbtn" @click="acFun">确定</span>
        </p>
        <p>key1为：{{$store.state.key1}} --- key2为：{{$store.state.key2}}</p>
    </div>

    <p style="margin-top:30px;border-bottom:1px solid #ddd;">localStorage-demo</p>
    <div class="box">
       <p class="row">
              用户名：<input type="text" v-model='username' class="stateInput"/>
              <span class="confirmbtn" @click="loginFun">登录</span>
              <span class="confirmbtn" @click="logoutFun">注销</span>
        </p>
        <p style="color:green;font-size:12px;">
            {{username?'当前用户名为：'+username:'用户未登录'}}
        </p>
    </div>
    <p style="margin-top:30px;border-bottom:1px solid #ddd;">vuex实现购物车-点击商品进行购买</p>
    <div class="box">
       <p class="row">
          <span class="goodsItem" v-for="item in goods" @click="addCartFun(item)">{{item.goodsname}}</span>
       </p>
       <p>
          <span>{{cartList?'ss':'33'}}</span>
          <span v-if="!cartList.length">购物车暂无内容</span>
          <ul v-else class="cartList">
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
       </p>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from 'vuex'
import util from 'common/js/util'
import axios from 'axios'
export default {
    data(){
       return {
         inputNum:0,
         inputStr:'',
         key1:'',
         username:'',
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
      this.username=this.getUsername()
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
  .cartList{background:#f3f3f3; width:90%; margin-top:12px;}
  .cartList li:not(:last-child){border-bottom:1px solid #ddd; }
  .cartList li{line-height:22px;padding:0 6px;}
  .cartList li>span{display:inline-block; font-size:10px;}
  .col-2{width:20%;}
  .col-1{width:10%;}
  .col-4{width:39%;}
  .operaBtn{display:inline-block; width:18px;height:18px;background:#0097e5; color:#fff; line-height:18px; text-align:center;    font-size: 14px; font-style: normal;}
</style>
