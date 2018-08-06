<template>
  <div class="hello">
    <p>请求qq轮播图地址列表：res.data.slider.picUrl</p>
    <div class="slider">
       <ul class="sliderList">
           <li class="sliderItem" v-for="(item,index) in recomment">{{index}}.{{item.picUrl}}</li>
       </ul>
    </div>
    <p style="margin-top:12px;">请求qq音乐清单列表：res.data.list.dissname</p>
    <div class="listBox">
       <ul class="list">
           <li class="listItem" v-for="(item,index) in discList">{{index}}.{{item.dissname}}</li>
       </ul>
    </div>

    <p style="font-size:12px;margin-top:12px;">请求本地模拟数据：{{sellData}}</p>

  </div>
</template>

<script type="text/ecmascript-6">
import {getRecomment,getDiscList} from 'api/recomment'
import axios from 'axios'
export default {
   data(){
     return {
       recomment:[],
       discList:[],
       sellData:''
     }

   },
   created(){
      getRecomment().then((res)=>{
        this.recomment=res.data.slider
      })
      setTimeout(function(){
          getDiscList().then((res)=>{
            console.log(res)
            this.discList=res.data.list
          })
      }.bind(this),1622)
      
      this.getSellData().then((res)=>{
         this.sellData=res.data.data.aa
      })
   },
   methods:{
      getSellData(){
         return axios.get('/api/seller').then((res=>{
            return Promise.resolve(res)
         }))
      }
   }
}
</script>


<style scoped lang="scss" type="text/css">
   .slider{height:100px; border:1px solid #ddd; background:#e3e3e3;font-size:10px;overflow:hidden;}
   .listBox{height:120px; border:1px solid #ddd; background:#e3e3e3; font-size:10px; overflow:scroll;}
</style>
