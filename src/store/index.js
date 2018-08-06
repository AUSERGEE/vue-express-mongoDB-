import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state={
  stateNum:0,
  stateStr:'abcd',
  key1:'initStr',
  key2:'initStr',
  cartList:[]
}

export default new Vuex.Store({
	state,
	getters,

	mutations,
	actions,
})