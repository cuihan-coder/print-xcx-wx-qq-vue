import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './user.js'
import print from './print.js'
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
	modules: {
	    user: user,
	    print: print
	}
})
export default store