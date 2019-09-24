declare module '*.svg' {
	const content: any
	export default content
}

declare module '*.png' {
	const content: any
	export default content
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
