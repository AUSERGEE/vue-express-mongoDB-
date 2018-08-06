<template>
  <div class="listview">
	   <div class="catalogListWarp">
	        <p>点击选项进入详情页</p>
	        <ul class="list">
	           <li v-for="(item,index) in catalog" @click="clickItem(item,index)">{{item.Fsinger_id}}</li>
	        </ul>
	    </div>

   </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['catalog'],
    methods:{
      clickItem(item,index){
        this.$emit('clickItem',item,index)

      }

    }
  }
</script>

<style lang="scss" scoped>
   
   .catalogListWarp{background:#e3e3e3; margin:12px;}
   .list>li:first-child{border-top:1px solid #ccc;}
   .list>li{height:26px; line-height:26px; font-size:14px;border-bottom:1px solid #ccc;}
</style>