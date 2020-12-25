const user = {
	namespaced: true,
	state: () => ({
		a: 1
	}),
	mutations: {
		setA(state) {
			state.a++
		}
	}
}

export default user;
