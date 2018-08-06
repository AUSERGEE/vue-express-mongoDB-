<template>
  <div id="app">
    
    <tabLink/>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
//import KHeader from './components/k-header/k-header'
//import Tabbar from './components/tabbar/tabbar'
import tabLink from './components/tabLink/tabLink'
export default {
  data() {
    return {
      selected:"ShoppingList"
    }
  },
  components:{
    tabLink
  },
  methods:{
     turnStatusFun(){
        this.ifHeaderTit=!this.ifHeaderTit
     },
     routerTo(link){
        alert(link)
     }
  },
  watch: {
      selected: function (val) {
          router.push(val)
      }
  }
}
</script>

<style>
   @import './common/scss/base.scss'

</style>
