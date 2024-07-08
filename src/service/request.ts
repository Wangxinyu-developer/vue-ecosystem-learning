import axios, {
	type AxiosError,
	type AxiosRequestConfig,
	type AxiosResponse,
} from 'axios';
import { Session } from '@/utils/storage';
import router from '@/router';

/**
 * 用于设置axios的默认配置，使其在发送请求时携带credentials（凭证）信息。
 * 这意味着，对于跨域请求，浏览器会将凭证（如cookies）包含在请求头中发送给服务器。
 * 这样，服务器就可以根据凭证进行身份验证或其他操作。
 * 简而言之，作用是启用axios的跨域请求凭证传递功能。
 */
axios.defaults.withCredentials = true;

/** 创建axios实例 */
const service = axios.create({
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
installRequestInterceptor(service);

// 添加响应拦截器
installResponseInterceptor(service);

// 导出 axios 实例
export default service;

// 请求拦截器实现
function installRequestInterceptor(service: any): void {
	service.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			// 在发送请求之前做些什么
			return config;
		},
		(error: AxiosError) => {
			// 对请求错误做些什么
			console.error('Request Error:', error); // 增加错误日志
			return Promise.reject(error);
		},
	);
}

// 响应拦截器实现
function installResponseInterceptor(service: any): void {
	service.interceptors.response.use(
		(response: AxiosResponse) => handleResponseSuccess(response),
		(error: AxiosError) => handleResponseError(error),
	);
}

// 处理响应成功的情况
function handleResponseSuccess(response: AxiosResponse): any {
	const res = response.data;
	switch (res.statusCode) {
		case 200:
			return response.data;
		case 403:
			Session.clear();
			router.push('/login');
			// 可以在这里添加用户友好的错误提示，例如使用通知组件显示“您已被登出”
			break;
		default:
			if (res.statusCode >= 500) {
				// 处理服务器错误
				console.error('Server Error:', res); // 增加错误日志
			}
			return Promise.reject();
	}
}

// 处理响应错误的情况
function handleResponseError(error: AxiosError): any {
	console.error('Response Error:', error); // 增加错误日志
	// 可以在这里添加更详细的错误处理逻辑，例如根据不同的error.response.status进行不同的处理
	return Promise.reject(error);
}
