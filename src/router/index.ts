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
	try {
		const token = Session.get('token');

		// 重构逻辑以减少冗余调用
		if (to.path === '/login') {
			// 未登录且尝试访问登录页，直接继续
			if (!token) {
				NProgress.done(); // 登录页不需要进度条
				return next();
			}
			// 已登录且尝试访问登录页，重定向到主页
			next('/');
		} else {
			// 对于其他路径，检查Token
			if (!token) {
				// 未登录，重定向到登录页并带上跳转路径
				next(`/login?redirect=${to.path}`);
				Session.clear();
			} else {
				// 已登录，继续前进
				next();
			}
		}
	} catch (error) {
		console.error("Session.get('token') failed:", error);
		// 根据实际情况处理异常，例如记录日志、通知用户等
		// 这里为了简化，只是打印错误信息
	} finally {
		// 确保在守卫结束时调用，避免重复调用
		NProgress.done();
	}
});

export default router;
