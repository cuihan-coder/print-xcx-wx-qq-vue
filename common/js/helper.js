const helper = {
	async _setCache(_key,_data){
		return uni.setStorageSync(_key, _data);
	},
	async _getCache(_key){
		return uni.getStorageSync(_key);
	},
	async httpGet(url,header = {}){
		let global;
		let token = await helper._getCache('loginToken')
		if(token){
			global = {Authorization:'Bearer '+ token}
			header = Object.assign(header,global)
		}
		header = Object.assign(header,global)
		return new Promise((resolve,reject) =>{
			uni.request({
				url:url,
				header:header,
				method:'GET',
				success: async (res) => {
					resolve(res.data)
				},
				fail: (res) => {
					uni.showToast({
						title: '系统请求错误',
						icon: 'none',
						duration:3000
					})
				}
			})
		}) 
	},
	async httpPost(url,data = {},header = {}){
		let global;
		let token = await helper._getCache('loginToken')
		if(token){
			global = {Authorization:'Bearer '+ token}
			header = Object.assign(header,global)
		}
		
		return new Promise((resolve,reject) =>{
			uni.request({
				url:url,
				data:data,
				header:header,
				method:'POST',
				success: async (res) => {
					resolve(res.data)
				},
				fail: (res) => {
					uni.showToast({
						title: '系统请求错误',
						icon: 'none'
					})
				}
			})
		}) 
	},
	objToQuery(obj){
		let query = ''
		for (let key in obj) {
			query += `&${key}=${obj[key]}`
		}
		query = query.replace(/(^&*)/g,"")
		return '?' + query
	},
	getPlatform(service = 'oauth'){
		return new Promise((resolve,reject) =>{
			uni.getProvider({
				service: service,
				success: function(res) {
					let platform = ~res.provider.indexOf('qq') ? 'qq' : 'weixin'
					resolve(platform)
				}
			});
		})
		
	}
	
}

export default helper;