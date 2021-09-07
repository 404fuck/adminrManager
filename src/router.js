import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

export default new Router({
	//mode: 'history',
	base: "/",
	routes: [{
			path: '/login',
			component: () => import('@/views/login/Login'),
			name: 'login',
			meta: {
				title: 'login',
				requireAuth: false,
				selectEdit: false,
			}
		},
		{
			path: '/',
			name: 'layout',
			component: Layout,
			meta: {
				title: 'layout',
				requireAuth: true,
				selectEdit: false,
			},
			redirect: '/storeState',
			children: [{
					path: '/storeState',
					component: () => import('@/views/singleStore/storeState'),
					name: 'storeState',
					meta: {
						title: 'storeState',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/storeManage',
					component: () => import('@/views/storeManage/storeManage'),
					name: 'storeManage',
					meta: {
						title: 'storeManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/userManage',
					component: () => import('@/views/user/userManage'),
					name: 'userManage',
					meta: {
						title: 'userManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/addMessage',
					component: () => import('@/views/user/addMessage'),
					name: 'addMessage',
					meta: {
						title: 'addMessage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/feedbackManage',
					component: () => import('@/views/feedback/feedbackManage'),
					name: 'feedbackManage',
					meta: {
						title: 'feedbackManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/documentManage',
					component: () => import('@/views/document/documentManage'),
					name: 'documentManage',
					meta: {
						title: 'documentManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/addQuestion',
					component: () => import('@/views/document/addQuestion'),
					name: 'addQuestion',
					meta: {
						title: 'addQuestion',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/userinfoManage',
					component: () => import('@/views/wallet/userinfoManage'),
					name: 'userinfoManage',
					meta: {
						title: 'userinfoManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/settlementManage',
					component: () => import('@/views/wallet/settlementManage'),
					name: 'settlementManage',
					meta: {
						title: 'settlementManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/offlineManage',
					component: () => import('@/views/wallet/offlineManage'),
					name: 'offlineManage',
					meta: {
						title: 'offlineManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/setting',
					component: () => import('@/views/wallet/setting'),
					name: 'setting',
					meta: {
						title: 'setting',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/joinUsManage',
					component: () => import('@/views/joinUs/joinUsManage'),
					name: 'joinUsManage',
					meta: {
						title: 'joinUsManage',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/updateQuestion',
					component: () => import('@/views/document/updateQuestion'),
					name: 'updateQuestion',
					meta: {
						title: 'updateQuestion',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/systemUpdate',
					component: () => import('@/views/systemUpdate/systemUpdate'),
					name: 'systemUpdate',
					meta: {
						title: 'systemUpdate',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/addUpdate',
					component: () => import('@/views/systemUpdate/addUpdate'),
					name: 'addUpdate',
					meta: {
						title: 'addUpdate',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/editUpdate',
					component: () => import('@/views/systemUpdate/editUpdate'),
					name: 'editUpdate',
					meta: {
						title: 'editUpdate',
						requireAuth: true,
						selectEdit: false,
					}
				},
				{
					path: '/detailsUpdate',
					component: () => import('@/views/systemUpdate/detailsUpdate'),
					name: 'detailsUpdate',
					meta: {
						title: 'detailsUpdate',
						requireAuth: true,
						selectEdit: false,
					}
				},
			]
		},
	]
})