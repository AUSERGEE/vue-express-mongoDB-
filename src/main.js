import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Header,Tabbar, TabItem,Field ,Button ,MessageBox,Toast} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Field.name, Field,Button.name, Button)
fastclick.attach(document.body)
Vue.use(MintUI)
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$Toast = Vue.prototype.$Toast = Toast;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
