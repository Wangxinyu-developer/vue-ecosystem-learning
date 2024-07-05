// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { dynamicRoutes, pathMatch, staticRoutes } from './route';
import { Session } from '@/utils/storage';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const router = createRouter({
	history: createWebHistory(),
	routes: [...staticRoutes, ...dynamicRoutes, ...pathMatch],
});

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	const token = Session.get('token');
	if (to.path === '/login' && !token) {
		next();
		NProgress.done();
	} else {
		if (!token) {
			next(`/login?redirect=${to.path}`);
			Session.clear();
			NProgress.done();
		} else if (token && to.path === '/login') {
			next('/');
			NProgress.done();
		} else {
			next();
			NProgress.done();
		}
	}
});

export default router;
