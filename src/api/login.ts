import request from '@/service/request';
export function login(params: any) {
	return request({
		url: '/api/login/user-login-for-web-internal',
		method: 'post',
		data: params,
	});
}
