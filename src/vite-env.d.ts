/// <reference types="vite/client" />

/**
 * 在Vite项目中，vite-env.d.ts文件是一个可选的配置文件，用于定义环境变量的类型声明。
 * 这对于使用Vite的环境变量插件（如vite-plugin-env-compatible或直接通过Vite自身处理环境变量）时特别有用，
 * 它可以帮助TypeScript识别.env文件中定义的环境变量，从而避免TypeScript编译时的类型错误。
 * */

/**
 * 1. @usage 配置Vite以使用vite-env.d.ts;
 * 	1.1 vite.config.js/vite.config.ts：
 * 在Vite的配置文件中，确保你正确地引入了环境变量。
 * 如果使用了特定的环境变量插件，遵循该插件的配置指南。
 * 对于基本的环境变量处理，Vite本身就提供了很好的支持。
 * 	1.2 TypeScript配置：
 * 确保你的tsconfig.json文件正确地包含了vite-env.d.ts。
 * 通常情况下，Vite会自动处理这一点，但如果需要手动配置，可以添加或确认包含以下设置：
 * @config
 * 2. 名为vite-env.d.ts的文件。
 * 这个文件应该位于你的源代码目录中，与src同级或在src内部，具体取决于你的项目结构。
 * 编写类型声明：在这个文件中，你需要根据你的.env文件中的环境变量来定义相应的类型声明。
 * 例如，如果你的.env文件中有这样的定义  VITE_API_KEY=your-api-key
 * 那么在vite-env.d.ts中，你应该声明如下：
 * */

/** @config */
// {
// 	"include": ["vite-env.d.ts", "src/**/*.ts", "src/**/*.tsx"],
// 	// ...其他配置
// }

declare let VITE_API_KEY: string; // 这告诉TypeScript编译器VITE_API_KEY是一个全局变量，并且它的类型是string
