
let host = {
	pro: 'http://qswy.com',
	local: 'http://qswy.com'
}
let development = 'pro'

module.exports = {
	login_url_post: `${host[development]}/api/user/login`,
	//获取优惠券列表
	getVoucherList_url_get: `${host[development]}/api/user/getVoucherList` ,
	//获取邀请页面基础数据
	shareInfo_url_get: `${host[development]}/api/sharefriend/shareInfo` ,
	
}
