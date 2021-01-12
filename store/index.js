import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './user.js'
import home from './home.js'
const store = new Vuex.Store({
    state: {
		platform:'weixin'
	},
    mutations: {
		SET_PLATFORM(state, val){
			state.platform = val 
		}
	},
    actions: {},
	modules: {
	    user: user,
	    home: home
	}
})
export default store