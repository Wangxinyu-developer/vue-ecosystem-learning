import type { RouteRecordRaw } from 'vue-router';
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('@/views/home/index.vue'),
			},
		],
	},
];
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
];
export const pathMatch = [
	{
		path: '/:path(.*)*',
		component: () => import('@/views/error/404.vue'),
	},
];
