const app = {
	state: {
		isClear: true,
		// 中英文
		language: localStorage.getItem('language') || 'en_US',
		//本地token
		adminManagerToken: localStorage.getItem('adminManagerToken') || '',
		user: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) || {
			name: "张三",
			logo: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2183650519,4258643236&fm=27&gp=0.jpg",
		},
		//员工管理选中的标签页
		curentTab: 0,
		docActiveName: localStorage.getItem('docActiveName') || '0',
		//判断是否是System登入
		isSystem: localStorage.getItem('isSystem') || false,
		//判断是否是USER登入
		isUser: localStorage.getItem('isUser') || false,

	},
	mutations: {
		//清空缓存
		CLEAR_COOKIES: (state, isClear) => {
			state.isClear = isClear
			localStorage.clear()
			//初始化state
			state.language = 'en_US'
			state.adminManagerToken = ''
			state.user = {
				name: "张三",
				logo: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2183650519,4258643236&fm=27&gp=0.jpg",
			}
		},
		// 中英文
		SET_docActiveName: (state, docActiveName) => {
			state.docActiveName = docActiveName
			localStorage.setItem('docActiveName', docActiveName)
		},
		// 中英文
		SET_LANGUAGE: (state, language) => {
			state.language = language
			localStorage.setItem('language', language)
		},
		// token
		SET_TOKEN: (state, token) => {
			state.adminManagerToken = token
			localStorage.setItem('adminManagerToken', token)
		},
		// user
		SET_USER: (state, user) => {
			state.user = user
			localStorage.setItem('user', JSON.stringify(user))
		},
		// curentTab
		SET_CURENTTAB: (state, curentTab) => {
			state.curentTab = curentTab
		},
		//isSystem
		SET_ISSYSTEM: (state, isSystem) => {
			state.isSystem = isSystem
			localStorage.setItem('isSystem', isSystem)
		},
		//isUser
		SET_ISUSER: (state, isUser) => {
			state.isUser = isUser
			localStorage.setItem('isUser', isUser)
		},

	},
	actions: {

		//清空缓存
		clearCookies({
			commit
		}, isClear) {
			commit('CLEAR_COOKIES', isClear)
		},

		// 中英文
		setLanguage({
			commit
		}, language) {
			commit('SET_LANGUAGE', language)
		},
		// token
		setToken({
			commit
		}, token) {
			commit('SET_TOKEN', token)
		},
		// USER
		setUser({
			commit
		}, user) {
			commit('SET_USER', user)
		},
		// curentTab
		setCurentTab({
			commit
		}, curentTab) {
			commit('SET_CURENTTAB', curentTab)
		},
		setDocActiveName({
			commit
		}, docActiveName) {
			commit('SET_docActiveName', docActiveName)
		},
        // isSystem
		setIsSystem({
			commit
		}, isSystem) {
			commit('SET_ISSYSTEM', isSystem)
		},
		// isUser
		setIsUser({
			commit
		}, isUser) {
			commit('SET_ISUSER', isUser)
		},
	}

}

export default app