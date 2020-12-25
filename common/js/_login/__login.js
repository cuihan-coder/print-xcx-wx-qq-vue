import  _api from '../../js/_base/_api.js';
import  _base from '../../js/_base/_base.js';

class Login {
	constructor() {
	}
	
	 _wx_check_login(){
		 return new Promise((resolve,reject)=>{
			 uni.checkSession({
				 success() {
				 	resolve(true)
				 },fail() {
				 	resolve(false)
				 }
			 })
		 })
	 }
	
	//code提交到后台  _siteId 站点ID
	 async _wx_Login(_siteId,mustInit = false){
		 if(!_siteId) console.error('warling !!!没有传递站点ID!!!')
		let userInfo = await _base._getCache('userInfo')
		//授权登录
		console.log(await _base._getCache('token'))
		if(userInfo == undefined  || mustInit == true){
			//token登录
			let _data = {};
			let _header = {siteid:_siteId,token:await _base._getCache('token')}
			let _response  = await this._wx_token_Login(_data,_header)
			//缓存用户信息
			_base._setCache('userInfo',_response.data)
			return  _response.data
		}
	}
	
	
	//token登录
	async _wx_token_Login(_data,_header){
		return await _base._request_wxapi(
			_api.host_api+_api.tokenlogin_api_url,
			_data,
			_header
		)
	}
	
}

export default Login;

