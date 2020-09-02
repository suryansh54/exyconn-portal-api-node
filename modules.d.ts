declare namespace NodeJS {
  export interface ProcessEnv {
    PUBLIC_KEY: string;
    PRIVATE_KEY: string;
    CONNECTION_STRING: string;
    PORT: string
  }
}