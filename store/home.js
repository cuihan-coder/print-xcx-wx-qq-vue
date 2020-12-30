const home = {
	namespaced: true,
	state:()=>({
		//首页点击图片打印浮层显示控制
		printDialogShow:false,
		//首页优惠券赠送弹窗
		voucherDialogShow:false,
	}),
	mutations:{
		SET_PRINTDIALOGSHOW(state, val){
			state.printDialogShow = val
		},
		SET_VOUCHERDIALOGSHOW(state, val){
			state.voucherDialogShow = val
		}
	}
}
export default home