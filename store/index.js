import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import zjzprint from './zjzprint.js'
import home from './home.js'
import selfprint from './selfprint.js'

const store = new Vuex.Store({
    state: {
		platform:'weixin',
		//首页banner数据包
		mainBanner:[],
		//打印设备编码
		deviceCode:'',
		//打印设备信息
		deviceInfo:{},
		//分组信息
		groupInfo:{},
		//普通会员价格
		ptPrice:{},
		//充值会员价格
		czPrice:{}
	},
    mutations: {
		SET_PLATFORM(state, val){
			state.platform = val 
		},
		SET_MAINBANNER(state, val){
			state.mainBanner = val 
		},
		SET_DEVICECODE(state, val){
			state.deviceCode = val 
		},
		SET_DEVICEINFO(state, val){
			state.deviceInfo = val 
		},
		SET_GROUPINFO(state, val){
			state.groupInfo = val 
		},
		SET_PTPRICE(state, val){
			state.ptPrice = val 
		},
		SET_CZPRICE(state, val){
			state.czPrice = val 
		}
	},
    actions: {},
	modules: {
	    zjzprint: zjzprint,
	    home: home,
		selfprint:selfprint
	}
})
export default store