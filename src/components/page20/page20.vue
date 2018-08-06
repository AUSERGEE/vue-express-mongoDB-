<template>
  <div class="hello">
     <list-view :catalog="catalog" @clickItem="clickItem"></list-view>

     <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">
import {getCatalog} from 'api/recomment'
import listView from 'src/base/listview/listview'
export default {
   data(){
       return {
          catalog:[2,1]
       }
   },
   mounted(){
      this._getCatalog()
   },
   methods:{
     _getCatalog(){
       getCatalog().then((res)=>{
          this.catalog=res.data.list
          console.log(res)
       })
     },
     clickItem(item,index){
       alert('index:'+index+';item.Fsinger_id:'+item.Fsinger_id)

       //两种方法都可以：
       this.$router.push({name:'catalogDtl',params:{id:item.Fsinger_id},query:{keyworth:'123lxf'}})
       //this.$router.push({path:`/page20/${item.Fsinger_id}`})
     }
   },
   components:{
     listView
   }
}
</script>


<style scoped>

</style>
