import axios from 'axios';
import { Session } from '@/utils/storage';
import router from '@/router';
// 配置新建一个 axios 实例

axios.defaults.withCredentials = true;
const service = axios.create({
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		return config;
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error);
	},
);

// 添加响应拦截器
service.interceptors.response.use(
	response => {
		const res = response.data;
		switch (res.statusCode) {
			case 200:
				return response.data;
			case 403:
				Session.clear();
				router.push('/login');
				break;
			default:
				return Promise.reject();
		}
	},
	error => {
		// 对响应错误做点什么
		return Promise.reject(error);
	},
);

// 导出 axios 实例
export default service;
