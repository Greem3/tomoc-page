export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      freeImage: string
    }
  }
}