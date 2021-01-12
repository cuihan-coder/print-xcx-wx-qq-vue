import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

//把login注册成全局组件
import login from 'common/js/login.js'
Vue.prototype.$login = login

//把helper注册到全局组件
import helper from 'common/js/helper.js'
Vue.prototype.$helper = helper

//把api全局注册
import _api from 'common/js/_base/_api.js'
Vue.prototype.$api = _api


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
