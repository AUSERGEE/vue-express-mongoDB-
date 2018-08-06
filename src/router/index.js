import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import page10 from '@/components/page10/page10'
import page20 from '@/components/page20/page20'
import page30 from '@/components/page30/page30'
import page40 from '@/components/page40/page40'
import catalogDtl from '@/components/catalogDtl/catalogDtl'
import payPage from '@/components/payPage/payPage'
import goodslist from '@/components/goodslist/goodslist'
import login from '@/components/login/login'
import cart from '@/components/cart/cart'
import address from '@/components/address/address'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/goodslist'
    },
    {
      path: '/goodslist',
      name: 'goodslist',
      component: goodslist
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/page10',
      name: 'page10',
      component: page10
    },
    {
      path: '/page20',
      name: 'page20',
      component: page20,
      children:[
        {
          path:':id',
          name:'catalogDtl',
          component:catalogDtl	
        }
      ]
    },
    {
      path: '/page30',
      name: 'page30',
      component: page30
    },
    {
      path: '/page40',
      name: 'page40',
      component: page40,
      children:[
        {
          path:'payPage',
          component:payPage
        }
      ]
    }


  ]
})
