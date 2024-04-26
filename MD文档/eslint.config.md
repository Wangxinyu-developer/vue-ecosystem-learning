```bash
// 配置 ESLint 以用于 TypeScript 项目的规则和设置
import importX from 'eslint-plugin-import-x'
import tseslint from 'typescript-eslint'
import vitest from 'eslint-plugin-vitest'
import { builtinModules } from 'node:module'

// 定义常用全局变量
const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

// 定义禁用 const 枚举的规则
const banConstEnum = {
  selector: 'TSEnumDeclaration[const=true]',
  message:
    'Please use non-const enums. This project automatically inlines enums.',
}

// 主要 ESLint 配置对象
export default tseslint.config(
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'], // 指定 ESLint 检查的文件扩展名
    extends: [tseslint.configs.base], // 扩展 TypeScript 的基础 ESLint 配置
    plugins: {
      'import-x': importX, // 引入自定义的 import 规则插件
    },
    rules: {
      // 禁止使用 debugger
      'no-debugger': 'error',
      // 限制 console 的使用，只允许 warn, error, info
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      // 限制使用特定的全局变量
      'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
      // 限制使用特定的语法结构
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
      // 要求导入排序
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      // 限制导入 Node.js 模块的方式
      'import-x/no-nodejs-modules': [
        'error',
        { allow: builtinModules.map(mod => `node:${mod}`) },
      ],
      // TypeScript 特定规则：偏好使用 '@ts-expect-error' 注释
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      // TypeScript 特定规则：一致的类型导入方式
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      // TypeScript 特定规则：禁止类型导入的副作用
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },

  // 测试文件的特定配置，无限制（在 Node/Vitest 环境中运行，使用 jsdom）
  {
    files: ['**/__tests__/**', 'packages/dts-test/**'],
    plugins: { vitest },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      // 在测试文件中关闭特定规则
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      // 强制测试规则
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
    },
  },

  // 共享代码配置，可在任何环境中使用
  {
    files: ['packages/shared/**', 'eslint.config.js'],
    rules: {
      'no-restricted-globals': 'off',
    },
  },

  // 针对 DOM 的包配置
  {
    files: ['packages/{vue,vue-compat,runtime-dom}/**'],
    rules: {
      'no-restricted-globals': ['error', ...NodeGlobals],
    },
  },

  // 针对 Node 的包配置
  {
    files: ['packages/{compiler-sfc,compiler-ssr,server-renderer}/**'],
    rules: {
      'no-restricted-globals': ['error', ...DOMGlobals],
      'no-restricted-syntax': ['error', banConstEnum],
    },
  },

  // 仅在浏览器环境中使用的私有包配置，无语法限制
  {
    files: ['packages/template-explorer/**', 'packages/sfc-playground/**'],
    rules: {
      'no-restricted-globals': ['error', ...NodeGlobals],
      'no-restricted-syntax': ['error', banConstEnum],
      'no-console': 'off',
    },
  },

  // JavaScript 文件特定规则
  {
    files: ['*.js'],
    rules: {
      // 仅对 JavaScript 文件执行 'no-unused-vars' 检查
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    },
  },

  // Node 脚本的特定配置
  {
    files: [
      'eslint.config.js',
      'rollup.config.js',
      'scripts/**',
      './*.{js,ts}',
      'packages/*/*.js',
      'packages/vue/*/*.js',
    ],
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-syntax': ['error', banConstEnum],
      'no-console': 'off',
    },
  },

  // 在 compiler-sfc 中允许导入 Node.js 模块
  {
    files: ['packages/compiler-sfc/src/**'],
    rules: {
      'import-x/no-nodejs-modules': ['error', { allow: builtinModules }],
    },
  },

  // 忽略特定文件夹
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
)
```
