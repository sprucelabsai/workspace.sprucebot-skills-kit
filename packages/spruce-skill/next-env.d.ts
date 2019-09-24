/// <reference types="next" />
/// <reference types="next/interfaces/global" />

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
