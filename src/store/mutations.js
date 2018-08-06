

const mutations={
   changeNum(state,num){
   	  state.stateNum=num
   },
   changeStr(state,str){
   	  state.stateStr=str
   },
   m_modifyKey1(state,str){
   	  state.key1=str
   },
   m_modifyKey2(state,str){
   	  state.key2=str
   },
   addCart(state,data){
   	  let cart=state.cartList
   	  let goodsGroug=cart['goodsGroug']=(cart['goodsGroug']||{})
   	  let item=goodsGroug[data.goodsId]=(goodsGroug[data.goodsId]||{})
   	  if(item['data']){
   	  	item['data']['num']++
   	  }else{
   	  	item['data']={
   	  		"num":1,
            "goodsname":data.goodsname,
            "goodsId":data.goodsId,
            "price":data.price,
            "aa":22
   	  	}
   	  	console.log('sss3'+JSON.stringify(cart))
   	  }
   	  state.cartList={...cart}
   },
   redudeGoods(state,goodsId){
   	  let cart=state.cartList
   	  let goodsGroug=cart['goodsGroug']
   	  let item=goodsGroug[goodsId]
   	  console.log('num')
   	  if(item['data']['num']>1){
        item['data']['num']--
        console.log(item['data']['num'])
   	  }else{
         goodsGroug[goodsId]=null

   	  }
   },
   removeGoods(state,data){
      let cart=state.cartList
      let goodsGroug=cart['goodsGroug']
      
      goodsGroug[data.goodsId]=null

      // let item=goodsGroug[data.goodsId]
      //item=null
   }

}

export default mutations