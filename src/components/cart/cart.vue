<template>
  <div class="hello">
    <mt-header  title="购物车"></mt-header>
    <div class="listBox">
       <ul class="proList">
          <li v-for="(item,index) in cartList" class="proItem">
            <p><span>{{item.productName}}</span></p>
            <p><i class="minu" @click="editCart('minu',item)">-</i><span>{{item.productNum}}</span><i class="add" @click="editCart('add',item)">+</i></p>
            <p><span>salePrice:{{item.salePrice}}</span></p>
            <span class="delBtn" @click="delPro(item.productId)">X</span>
          </li>
       </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
   data(){
     return {
        cartList:[]
     }
   },
   created(){
      this.init() 
   },
   methods:{
      init(){  // 初始化数据
        axios.get(process.env.API_HOST + '/users/cartList').then((response)=>{
           let res = response.data;
           this.cartList = res.result;
           console.log(this.cartList)
        })
      },
      delPro(proId){
          this.$messagebox.confirm('确定删除?').then(action => {
               axios.post(process.env.API_HOST + '/users/cartDel',{
                  productId:proId
                }).then((response) => {
                  let res = response.data;
                  if(res.status = '0'){
                    this.init();  // 重新初始化列表数据
                    this.$Toast({
                        message: '删除成功',
                        position: 'bottom',
                        duration: 1000
                    });
                  }
                })
          });
      },
      editCart(flag,item){
        if(flag == 'add'){    // 添加数量
          item.productNum++;
        }else if(flag = 'minu'){   // 减少数量
          if(item.productNum <= 1){
            return;
          }
          item.productNum--;
        }
        axios.post(process.env.API_HOST + '/users/cartEdit',{
          productId:item.productId,
          productNum:item.productNum,
          checked:item.checked
        }).then((response)=>{
          let res = response.data;
        })
      }
   }
}
</script>


<style scoped lang="scss" type="text/css">
  .proList{
      margin:12px;
      .proItem{
          padding:4px;
          border:1px solid #ddd;
          margin:4px;
          position:relative;
          .delBtn {
             position:absolute;
             bottom:8px;
             right:8px;
             display:inline-block; 
             width:20px;
             height:20px; 
             line-height:20px; 
             text-align:center; 
             background:#0097e5; 
             color:#FFF;
          }
      }
  }

  .minu,.add{display:inline-block; width:20px;height:20px; margin-right:4px; line-height:20px;text-align:center; background:#0097e5;color:#fff; border-radius:3px;}
  
  
</style>
