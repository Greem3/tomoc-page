
export type AsyncFunction<Args extends any[] = any[], Return = any> = (...args: Args) => Promise<Return>;