// 申明 数组
declare type EmptyArrayType<T = any> = T[];

// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

declare module 'nprogress' {
	// 这里可以根据实际 API 来声明类型，例如：
	export function start(): void;
	export function done(): void;
	// ... 其他API声明
}
