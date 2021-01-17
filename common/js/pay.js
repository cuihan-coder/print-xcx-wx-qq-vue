const payModel = {
	wxPay(info){
		new Promise((resolve,reject) => {
			uni.requestPayment({
			    provider: 'wxpay',
			    timeStamp: info.timeStamp,
			    nonceStr: info.nonceStr,
			    package: info.package,
			    signType: info.signType,
			    paySign: info.paySign,
			    success: function (res) {
					resolve(true)
			    },
			    fail: function (err) {
			      reject(false)
			    }
			});
		})
	},
	qqWxPay(info){
		
	}

}

export default payModel;
