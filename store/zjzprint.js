const zjzprint = {
	namespaced: true,
	state: () => ({
		color:'blue',
		printTypeIndex:0,
		imgUrl:''
	}),
	mutations: {
		SET_COLOR(state,val){
			state.color = val
		},
		SET_PRINTTYPEINDEX(state,val){
			state.printTypeIndex = val
		},
		SET_IMGURL(state,val){
			state.imgUrl = val
		},
	}
}

export default zjzprint;
