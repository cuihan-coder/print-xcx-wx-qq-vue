const selfprint = {
	namespaced: true,
	state: () => ({
		imgH:0,
		top:0,
		left:0
	}),
	mutations: {
		SET_IMGH(state,val){
			state.imgH = val
		},
		SET_TOP(state,val){
			state.top = val
		},
		SET_LEFT(state,val){
			state.left = val
		},
	}
}

export default selfprint;
