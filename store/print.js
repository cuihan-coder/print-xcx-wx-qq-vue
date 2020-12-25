const print = {
	namespaced: true,
	state:()=>({
		//首页点击图片打印浮层显示控制
		printDialogShow:false
	}),
	mutations:{
		SET_PRINTDIALOGSHOW(state, val){
			state.printDialogShow = val
		}
	}
}
export default print