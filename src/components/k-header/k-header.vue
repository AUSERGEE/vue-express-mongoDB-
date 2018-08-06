<template>
  <div class="k-header">
    <h1 class="header-tit">是否显示标题:{{ifHeaderTit?'是':'否'}}</h1>
    <span @click='emitClick'>[切换]</span>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    props:['ifHeaderTit'],
    methods:{
      emitClick(){
        this.$emit('turnStatus');
      }
    }

  }
</script>

<style lang="scss" scoped=""  type="text/css">
  @import '../../common/scss/base';

  .k-header{
    height:44px;
    line-height:44px;
    background:#0097e5;
    text-align:center;
  }
  .header-tit{
    display:inline-block;
    font-size:14px;
  }
</style>