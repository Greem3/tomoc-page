export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      freeImage: string;
      server: string;
      databaseName: string;
      serverUid: string;
      serverPwd: string;
    }
  }
}