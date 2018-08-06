<template>
  <div class="hello">
    <mt-header  title="地址管理"></mt-header>
    <div class="addresslistBox">
       <li v-for="item in addressList" :class="{'active':item.isDefault}">
            <dl>
                <dt>{{item.userName}}</dt>
                <dd class="address">{{item.streetName}}</dd>
                <dd class="tel">{{item.tel}}</dd>
            </dl>
            <div class="addr-opration addr-del">
                <a href="javascript:;" class="addr-del-btn"  @click="delAddressConfirm(item.addressId)">删除
                </a>
            </div>
            <div class="addr-opration addr-set-default">
                <a href="javascript:;" class="addr-set-default-btn" v-if="!item.isDefault" @click="setDefault(item.addressId)"><i>设为默认</i></a>
            </div>
            <div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>
        </li>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
   data(){
     return {
        addressList:[]   // 地址列表
     }
   },
   created(){
       this.init();
   },
   methods:{
      init(){
        axios.get(process.env.API_HOST +'/users/addressList').then((response) => {
          let res = response.data;
          this.addressList = res.result;
        })
       },
       setDefault(addressId){  // 设置默认地址
        axios.post(process.env.API_HOST +'/users/setDefault',{
          addressId:addressId
        }).then((response)=>{
          let res = response.data;
          if(res.status=='0'){
            console.log("set default");
            this.init();  // 重新渲染地址列表
          }
        })
      },
      delAddressConfirm(addressId){   
        this.$messagebox.confirm('确定执行此操作?').then(()=>{
              axios.post(process.env.API_HOST +"/users/delAddress",{
                addressId:addressId  // 传参
                }).then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                    console.log("del suc");
                    this.init();  // 重新渲染地址
                    }
                })

        })
        
       
        
        
      }
   }
}
</script>


<style scoped lang="scss" type="text/css">
   .addresslistBox li{border:1px solid #999; margin:4px 12px 6px 6px;}
   .addresslistBox li.active{border:1px solid orange;}
   .addresslistBox li dl{ margin:0px;}
   .addresslistBox li dt{ font-size:18px; color:#0097e5; margin-left:12px;}
   .addresslistBox li dd{ font-size:14px; color:#666; margin-left:18px;}
   .addresslistBox li>div{margin-left:12px;}
   i{font-style:normal;}
</style>


User.findOne({userId:userId}, function(err,doc){
        .....
        var address = '',
            goodsList = [];
        // 获取当前用户的地址信息
        doc.addressList.forEach((item)=>{
            if(addressId == item.addressId){
                address = item;
            }
        })
        // 获取当前用户的购物车的购买商品
        doc.cartList.filter((item)=>{
            if(item.checked == '1'){
                goodsList.push(item);
            }
        })

        //创建订单Id
        var platform = '622'; // 平台系统架构码
        ........

        // 订单创建时间
        var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

        // 生成订单
        var order = {
            orderId:orderId,           // 订单id
            orderTotal:orderTotal,     // 订单总金额(直接拿前端传过来的参数)
            addressInfo:address,       // 地址信息
            goodsList:goodsList,       // 购买的商品信息
            orderStatus:'1',           // 订单状态，1成功
            createDate:createDate      // 订单创建时间
        }

        // 订单信息存储到数据库
        doc.orderList.push(order);

        doc.save(function (err1,doc1) {