import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './user.js'
import home from './home.js'
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
	modules: {
	    user: user,
	    home: home
	}
})
export default store