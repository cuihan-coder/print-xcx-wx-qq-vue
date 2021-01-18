
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
	//活动列表
	activetyList_url_get: `${host[development]}/api/Activety/activetyList` ,
	//活动详情
	activetyInfo_url_get: `${host[development]}/api/Activety/activetyInfo` ,
	//建议反馈
	userAdvice_url_post: `${host[development]}/api/user/userAdvice` ,
	//获取banner
	getBanner_url_get: `${host[development]}/api/Pub/getBanner` ,
	//获取设备信息以及对应分组信息及价格
	getDeviceGroupInfo_url_get: `${host[development]}/api/noauth/getDeviceGroupInfo` ,
	//文件上传
	fileUpload_url_post: `${host[development]}/api/Pub/fileUpload` ,
	//获取文件任务列表
	getUserPrintFileTask_url_get: `${host[development]}/api/Pub/getUserPrintFileTask` ,
	//删除文件打印任务
	delFilePrintTask_url_post: `${host[development]}/api/Pub/delFilePrintTask` ,
	//编辑打印参数获取实时价格
	changeParamPrice_url_post: `${host[development]}/api/Pub/changeParamPrice` ,
	//打印订单提交
	addMainOrder_url_post: `${host[development]}/api/Order/addMainOrder` ,
	//上传图片 图片 转 图片
	uploadImg_url_post: `${host[development]}/api/Pub/uploadImg` ,
	//证件照图片美化、排版
	cardPicButifulAndTypography_url_get: `${host[development]}/api/Pub/cardPicButifulAndTypography` ,
	//订单支付相关信息
	payOrderInfo_url_get: `${host[development]}/api/Order/payOrderInfo` ,
	//微信支付以及余额支付
	paySign_url_post: `${host[development]}/api/Order/paySign` ,
	//图片打印任务提交接口
	createPicPrintTask_url_post: `${host[development]}/api/Pub/createPicPrintTask` ,
	//更新自定义图片打印 左 上 高数据
	updatePicPrintSelfdfinedParam_url_post: `${host[development]}/api/Pub/updatePicPrintSelfdfinedParam` ,
	//多图片任务 建立打印任务记录
	morePicPrintTaskCreate_url_post: `${host[development]}/api/Pub/morePicPrintTaskCreate` ,
}
