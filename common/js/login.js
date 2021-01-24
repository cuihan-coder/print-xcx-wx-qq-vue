import _api from './_base/_api.js';
import _helper from './helper.js';
const loginModel = {
	_check_login() {
		return new Promise((resolve, reject) => {
			uni.checkSession({
				success() {
					resolve(true)
				},
				fail() {
					resolve(false)
				}
			})
		})
	},
	async getCode() {
		let userInfo = await _helper._getCache('userInfo')
		return new Promise((resolve, reject) => {
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					let plateform = ~res.provider.indexOf('qq') ? 'qq' : 'weixin'
					uni.login({
						provider: plateform,
						success: function(loginRes) {
							if (loginRes.errMsg == 'login:ok') {
								resolve(loginRes.code)
							} else {
								resolve(false)
							}
						}
					});
				}
			});
		})
	},
	async login(data, header) {
		let tokenExpireTime = await _helper._getCache('tokenExpireTime')
		
		if (!tokenExpireTime || tokenExpireTime <= Math.ceil(new Date().getTime() / 1000)) {
			let ret = await _helper.httpPost(_api.login_url_post, data, header)
			if (ret == false) {
				uni.showToast({
					title: '系统请求错误',
					icon: 'none',
					duration:2000
				})
				return
			}
			_helper._setCache('tokenExpireTime', ret.data.expireTime)
			_helper._setCache('loginToken', ret.data.token)
			_helper._setCache('userInfo', ret.data.userInfo)
			_helper._setCache('voucherList', ret.data.voucherList)
			return ret
		}
	},

}

export default loginModel;
