import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
	base: '',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [
		vue(), // 或者使用 createVuePlugin()，取决于你使用的Vue插件版本
	],
	// 如果你的项目是Vue 3 + TypeScript，确保这里使用正确的Vue插件
	// 其他配置...
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import './src/styles/variables.scss';`, // 引入全局变量
			},
		},
	},
	// 确保TypeScript配置正确载入
	// vite 本身会自动检测tsconfig.json，通常不需要额外配置
});
