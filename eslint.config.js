/**
 * 导入eslint-plugin-import-x模块
 *
 * 该行代码导入了一个特定的eslint插件，用于增强对import语句的检查和规范。
 * 它是通过ES6的模块导入语法来引入的，指定的模块名是'eslint-plugin-import-x'。
 *
 * @import importX
 * @from 'eslint-plugin-import-x'
 * @description 导入一个特定的eslint插件，用于增强对import语句的检查和规范。
 */
import importX from 'eslint-plugin-import-x';
/**
 * 导入typescript-eslint模块，用于后续的TypeScript代码静态分析和 linting。
 * 这里的注释主要解释为什么需要导入这个模块，即为了使用TypeScript的ESLint插件来提升代码质量和维护性。
 */
import tseslint from 'typescript-eslint';
/**
 * 导入vitest模块
 *
 * 该行代码导入了'eslint-plugin-vitest'模块，该模块是Vitest框架的ESLint插件。
 * 它的作用是为Vitest框架的测试代码提供ESLint规则支持，以确保测试代码的质量和风格一致性。
 */
import vitest from 'eslint-plugin-vitest';
/**
 * 导入内置模块列表
 *
 * 使用`node:module`协议导入内置模块列表，以便后续操作，如检查是否使用了内置模块。
 * 这种导入方式是Node.js 16.0.0及以上版本引入的特性，它提供了一种直接访问Node.js内置模块的方式，而无需手动导入。
 *
 * @see https://nodejs.org/api/modules.html#modules_accessing_the_core_modules_object
 */
import { builtinModules } from 'node:module';

const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

/**
 * 定义了一个规则，用于禁止在TypeScript中使用const枚举。
 *
 * 禁止使用const枚举的原因是为了鼓励使用非const枚举。由于本项目自动内联枚举，
 * 因此使用非const枚举可以达到相同的效果，同时避免了使用const枚举可能带来的问题，比如调试困难及命名冲突等潜在问题。
 *
 * @property {string} selector - 在ESLint规则中用于识别const枚举的选择器字符串。它指定了查找具有const属性为true的TypeScript枚举声明。
 * @property {string} message - 当该规则被违反时显示的错误信息。解释了为什么禁止使用const枚举以及推荐的替代方案。
 */
const banConstEnum = {
	selector: 'TSEnumDeclaration[const=true]',
	// 'Please use non-const enums. This project automatically inlines enums.'
	message: '请使用非const枚举。本项目会自动内联枚举。',
};

export default tseslint.config(
	{
		files: ['**/*.js', '**/*.ts', '**/*.tsx'], // '**/*.js' 匹配所有目录下的JavaScript文件
		extends: [tseslint.configs.base], // 继承TSESLint的基本配置规则
		plugins: {
			'import-x': importX,
		},
		rules: {
			'no-debugger': 'error', // 在ESLint配置中禁止使用debugger语句
			'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
			// most of the codebase are expected to be env agnostic
			'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],

			'no-restricted-syntax': [
				'error',
				banConstEnum,
				{
					selector: 'ObjectPattern > RestElement',
					message:
						'Our output target is ES2016, and object rest spread results in ' +
						'verbose helpers and should be avoided.',
				},
				{
					selector: 'ObjectExpression > SpreadElement',
					message:
						'esbuild transpiles object spread into very verbose inline helpers.\n' +
						'Please use the `extend` helper from @vue/shared instead.',
				},
				{
					selector: 'AwaitExpression',
					message:
						'Our output target is ES2016, so async/await syntax should be avoided.',
				},
			],
			'sort-imports': ['error', { ignoreDeclarationSort: true }],

			'import-x/no-nodejs-modules': [
				'error',
				{ allow: builtinModules.map(mod => `node:${mod}`) },
			],
			// This rule enforces the preference for using '@ts-expect-error' comments in TypeScript
			// code to indicate intentional type errors, improving code clarity and maintainability.
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			// Enforce the use of 'import type' for importing types
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					fixStyle: 'inline-type-imports',
					disallowTypeAnnotations: false,
				},
			],
			// Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
			'@typescript-eslint/no-import-type-side-effects': 'error',
		},
	},

	// tests, no restrictions (runs in Node / Vitest with jsdom)
	{
		files: ['**/__tests__/**', 'packages/dts-test/**'],
		plugins: { vitest },
		languageOptions: {
			globals: {
				...vitest.environments.env.globals,
			},
		},
		rules: {
			'no-console': 'off',
			'no-restricted-globals': 'off',
			'no-restricted-syntax': 'off',
			'vitest/no-disabled-tests': 'error',
			'vitest/no-focused-tests': 'error',
		},
	},

	// shared, may be used in any env
	{
		files: ['packages/shared/**', 'eslint.config.js'],
		rules: {
			'no-restricted-globals': 'off',
		},
	},

	// Packages targeting DOM
	{
		files: ['packages/{vue,vue-compat,runtime-dom}/**'],
		rules: {
			'no-restricted-globals': ['error', ...NodeGlobals],
		},
	},

	// Packages targeting Node
	{
		files: ['packages/{compiler-sfc,compiler-ssr,server-renderer}/**'],
		rules: {
			'no-restricted-globals': ['error', ...DOMGlobals],
			'no-restricted-syntax': ['error', banConstEnum],
		},
	},

	// Private package, browser only + no syntax restrictions
	{
		files: ['packages/template-explorer/**', 'packages/sfc-playground/**'],
		rules: {
			'no-restricted-globals': ['error', ...NodeGlobals],
			'no-restricted-syntax': ['error', banConstEnum],
			'no-console': 'off',
		},
	},

	// JavaScript files
	{
		files: ['*.js'],
		rules: {
			// We only do `no-unused-vars` checks for js files, TS files are checked by TypeScript itself.
			'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
		},
	},

	// node 脚本配置
	{
		// 文件数组：定义了需要进行 lint 检查的文件路径模式
		files: [
			'eslint.config.js', // ESLint 配置文件
			'rollup.config.js', // Rollup 打包配置文件
			'scripts/**', // scripts 目录下的所有文件
			'./*.{js,ts}', // 根目录下所有的 .js 和 .ts 文件
		],
		// 规则配置：自定义特定文件的 lint 规则
		rules: {
			'no-restricted-globals': 'off', // 关闭对某些全局变量使用的限制
			'no-restricted-syntax': ['error', banConstEnum], // 错误级别提示，禁止使用特定的语法结构，具体规则由 banConstEnum 函数定义
			'no-console': 'off', // 允许使用 console.log 等控制台输出
		},
	},

	// Import nodejs modules in compiler-sfc
	{
		files: ['packages/compiler-sfc/src/**'],
		rules: {
			'import-x/no-nodejs-modules': ['error', { allow: builtinModules }],
		},
	},

	{
		ignores: [
			'**/dist/',
			'**/temp/',
			'**/coverage/',
			'.idea/',
			'explorations/',
			'dts-build/packages',
		],
	},
);
